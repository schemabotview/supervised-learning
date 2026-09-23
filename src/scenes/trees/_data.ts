// The worked dataset for `trees`: departure delays on a small regional airline.
//
// Why flights, and why this shape. The binding constraint is §07. A decision tree and a regression
// tree are the SAME algorithm with a different impurity measure, and that claim only lands if the
// reader watches it happen on one table — so this dataset carries BOTH targets for every row:
// `minutes`, the actual delay, and `late`, which is `minutes > 15`. §01-06 and §08-10 classify
// `late`; §07 regresses `minutes` on the identical rows and the identical splits, and the only line
// that changes is the impurity function.
//
// The features are chosen to exercise what the course has to teach rather than to be predictive:
//   · two genuinely CONTINUOUS columns (depHour, precip), so §02's threshold scan is a real scan
//     over midpoints and not a binary choice dressed up as one
//   · one already-binary column (priorLegLate) — the aircraft's inbound leg arrived late
//   · one THREE-VALUED categorical (carrier), which is here for §06: a tree cannot split on it
//     directly, so it arrives one-hot encoded, and the three columns it turns into are visible in
//     §02's candidate table three sections before that gets a name.
//
// The rows are simulated from a fixed seed — the repo rule, so a scene renders identically on every
// capture. The generative process is a sum of effects plus noise, which is exactly the kind of
// structure a tree has to approximate with axis-parallel steps, and §07's step plot is honest about
// how that looks.
import { rng } from '../_curve'

export type Carrier = 'Northwind' | 'Cascade' | 'Meridian'
export const CARRIERS: Carrier[] = ['Northwind', 'Cascade', 'Meridian']

export interface Flight {
  /** Scheduled departure, as an hour with a fraction (5.0 - 22.0). */
  depHour: number
  /** Precipitation at the departure airport, mm. */
  precip: number
  /** Did this aircraft's inbound leg arrive late? */
  priorLegLate: 0 | 1
  carrier: Carrier
  /** Departure delay in minutes — negative means it pushed back early. */
  minutes: number
  /** The classification target: delayed by more than a quarter of an hour. */
  late: 0 | 1
}

/** Box-Muller over the repo LCG. Order-dependent, and the draw order below is fixed. */
function gaussian(r: () => number): () => number {
  let spare: number | null = null
  return () => {
    if (spare !== null) {
      const v = spare
      spare = null
      return v
    }
    let u = 0
    let v = 0
    while (u === 0) u = r()
    while (v === 0) v = r()
    const m = Math.sqrt(-2 * Math.log(u))
    spare = m * Math.sin(2 * Math.PI * v)
    return m * Math.cos(2 * Math.PI * v)
  }
}

// Effect sizes, chosen by search against what the course has to show rather than by taste. Two
// constraints drove them:
//
//   · The INTERACTION term. Without it the best depth-2 tree scores exactly what the best depth-1
//     tree scores — both children of the root split the same way and neither changes a majority
//     vote — so §01's four-leaf tree would be a picture of something pointless. An afternoon
//     departure costs more when the inbound aircraft is already late (the delay has nowhere to be
//     absorbed), and that interaction is precisely the kind of structure a tree gets for free and a
//     linear model does not. Depth 2 now beats depth 1 by nine and a half points.
//   · A CONTESTED ROOT. The two strong columns are tuned to be almost exactly as informative as
//     each other — 0.1302 bits against 0.1297 — so §02's scan has a real contest to show, and §08's
//     bootstrap trees genuinely disagree about where to start rather than all finding the same
//     obvious root.
//
// `carrier` is deliberately weak. It is here for §06, and three columns of pure noise would make
// one-hot encoding look like a waste of time rather than a necessity.
const CARRIER_EFFECT: Record<Carrier, number> = { Northwind: -2.5, Cascade: 5.5, Meridian: 0 }
/** The hour after which delay starts accumulating — the airport's day has knotted up by lunchtime. */
const KNEE = 11.5

function build(seed = 11): Flight[] {
  const r = rng(seed)
  const g = gaussian(r)
  const rows: Flight[] = []
  for (let i = 0; i < 1500; i++) {
    const depHour = Number((5 + r() * 17).toFixed(2))
    // Dry most of the time, with a right tail — real precipitation, not a uniform column.
    const wet = r() < 0.42
    const precip = Number((wet ? -Math.log(1 - r()) * 3.4 : 0).toFixed(2))
    const priorLegLate: 0 | 1 = r() < 0.3 ? 1 : 0
    const carrier = CARRIERS[Math.floor(r() * 3)]
    const afternoon = Math.max(0, depHour - KNEE)
    const minutes = Number(
      (
        -4 +
        12 * priorLegLate +
        1.6 * Math.min(precip, 12) +
        2.0 * afternoon +
        2.4 * priorLegLate * afternoon +
        CARRIER_EFFECT[carrier] +
        g() * 8
      ).toFixed(1),
    )
    rows.push({ depHour, precip, priorLegLate, carrier, minutes, late: minutes > 15 ? 1 : 0 })
  }
  return rows
}

export const FLIGHTS: Flight[] = build()

// A fixed train / validation split, STRATIFIED: every third row within each class is held out. It is
// deterministic by position rather than by a second seed, so it cannot drift when the generator is
// touched — and stratifying matters at this size, because an unstratified third put the two splits
// eight points apart on base rate, which showed up as a validation curve that started above the
// training curve for no reason anybody could see on the frame.
function stratifiedSplit(rows: Flight[]): [Flight[], Flight[]] {
  const seen = [0, 0]
  const train: Flight[] = []
  const val: Flight[] = []
  for (const f of rows) (seen[f.late]++ % 3 === 0 ? val : train).push(f)
  return [train, val]
}

export const [TRAIN, VAL] = stratifiedSplit(FLIGHTS)

/**
 * The feature MATRIX the tree actually sees — one row per flight, one number per column. `carrier`
 * has already become three 0/1 columns here, which is the one-hot encoding §06 explains. Doing it
 * up front rather than at §06 is deliberate: the reader meets the encoded columns in §02's candidate
 * table and gets told what they are three sections later, which is the order the question occurs in.
 */
export interface Column {
  key: string
  /** How the split reads on a tree node: `label` + the threshold, or just `label` when binary. */
  label: string
  binary: boolean
  /** How a split on this column is phrased in a scene. */
  question: (t: number) => string
  of: (f: Flight) => number
  /** Formatting for a threshold in a table. */
  fmt: (t: number) => string
}

export const COLUMNS: Column[] = [
  {
    key: 'depHour',
    label: 'scheduled hour',
    binary: false,
    question: (t) => `departs before ${hhmm(t)}?`,
    of: (f) => f.depHour,
    fmt: (t) => hhmm(t),
  },
  {
    key: 'precip',
    label: 'precipitation (mm)',
    binary: false,
    question: (t) => `rain ≤ ${t.toFixed(2)} mm?`,
    of: (f) => f.precip,
    fmt: (t) => `${t.toFixed(2)} mm`,
  },
  {
    key: 'priorLegLate',
    label: 'inbound leg late',
    binary: true,
    question: () => 'inbound leg on time?',
    of: (f) => f.priorLegLate,
    fmt: () => 'no / yes',
  },
  ...CARRIERS.map((c) => ({
    key: `carrier=${c}`,
    label: `carrier is ${c}`,
    binary: true,
    question: () => `carrier is ${c}?`,
    of: (f: Flight) => (f.carrier === c ? 1 : 0),
    fmt: () => 'no / yes',
  })),
]

/** An hour-with-fraction as a clock time — 14.75 reads as 14:45, which is what a timetable says. */
export function hhmm(t: number): string {
  const h = Math.floor(t)
  const m = Math.round((t - h) * 60)
  return m === 60 ? `${h + 1}:00` : `${h}:${String(m).padStart(2, '0')}`
}

/** The classification target. */
export const yLate = (f: Flight) => f.late
/** The regression target. §07. */
export const yMinutes = (f: Flight) => f.minutes

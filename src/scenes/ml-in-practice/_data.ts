// The worked dataset for `ml-in-practice`: a card-fraud detector, scored on its 20,000-transaction
// validation split.
//
// Why fraud, and why this shape. The course needs ONE dataset that supports all ten sections, and
// the binding constraint is §06-08: skew has to be REAL — 100 frauds in 20,000 rows, 0.5% — or the
// "99.5% accuracy is worthless" argument is an assertion rather than a frame. Everything else the
// course needs falls out of the same file: §03 reads the mistakes by hand because there are only 71
// of them, §04 does ceiling arithmetic on the miss tally, and §10 scores the same model per customer
// segment. Every number in every one of those sections is computed here, from these rows.
//
// The rows are SIMULATED, deterministically, from a fixed seed — the repo rule, so a scene renders
// identically on every capture. Three things are built into the generator on purpose, and each one
// is load-bearing for a section:
//
//   1. THREE MODEL VERSIONS (s1 → s3), each reading the same latent signal with progressively more
//      gain and less noise. That is what an iteration of §01's loop actually buys, and it lets the
//      iteration table carry measured numbers rather than a plausible-looking story.
//   2. FRAUD TYPES with different detectability. Card testing — a burst of tiny authorisations to
//      find which stolen numbers still work — is genuinely the hardest to see in a single row,
//      because every individual charge looks ordinary. It is 34% of the frauds and 17 of the 40
//      misses, which is what makes §03's tally point somewhere and §04's ceiling analysis worth
//      doing.
//   3. A SEGMENT EFFECT ON THE LEGITIMATE ROWS ONLY. Segment B — customers whose normal pattern is
//      frequent small overseas charges — looks, to this model, like card testing. So the model
//      declines them 4.9× as often as segment A while catching fraud at the same rate. That is the
//      §10 frame: an audit on accuracy passes, an audit on recall passes, and the harm is in the
//      one number nobody printed. It is on the legit rows alone because a shift on both would have
//      made segment B's recall the headline instead, which is not the failure being taught.
import type { PlotPoint } from '@graphlearning/flow'

/** The repo's fixed-seed PRNG (same LCG as `_curve.ts` — duplicated rather than imported so this
 *  file states its own determinism). */
function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Box-Muller over the LCG. Order-dependent by construction, which is fine: the draw order below
 *  is fixed, so the file is reproducible. */
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

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

export type FraudType =
  | 'card testing'
  | 'account takeover'
  | 'stolen card'
  | 'merchant collusion'
  | 'friendly fraud'

/** The five kinds of fraud in the file: how many of the 100, and how far the signal sits from the
 *  fraud average. Negative = harder to see in one row. */
export const FRAUD_TYPES: { type: FraudType; count: number; offset: number; gloss: string }[] = [
  { type: 'card testing', count: 34, offset: -0.7, gloss: 'micro-charges probing a stolen number' },
  { type: 'account takeover', count: 26, offset: 0.45, gloss: 'password reset, then a big order' },
  { type: 'stolen card', count: 18, offset: 0.3, gloss: 'physical card, used in region' },
  { type: 'merchant collusion', count: 12, offset: -0.85, gloss: 'the merchant is in on it' },
  { type: 'friendly fraud', count: 10, offset: -1.1, gloss: 'the cardholder disputes their own buy' },
]

export type Segment = 'A' | 'B'

export interface Txn {
  /** 1 = fraudulent. */
  y: 0 | 1
  /** A = home-region spender · B = frequent small overseas charges. */
  seg: Segment
  type: FraudType | null
  /** v1: amount + merchant category only. */
  s1: number
  /** v2: + velocity features. */
  s2: number
  /** v3: + a per-card historical baseline. The model the rest of the course talks about. */
  s3: number
}

export type ModelKey = 's1' | 's2' | 's3'

const TYPE_ORDER: FraudType[] = FRAUD_TYPES.flatMap((t) => Array<FraudType>(t.count).fill(t.type))
const OFFSET = new Map(FRAUD_TYPES.map((t) => [t.type, t.offset]))

// Gain and noise per model version, and the shared intercept. Chosen so the three versions tell a
// real improvement story at threshold 0.5 and the final one lands near precision 0.66 / recall 0.60
// — good enough to be worth deploying, bad enough to still be arguable, which is the only regime in
// which §08's threshold section has anything to trade.
const GAIN = [1.0, 1.5, 2.0]
const NOISE = [2.6, 1.9, 1.42]
const INTERCEPT = 3.51
const SEG_B_SHIFT = 0.55

function build(seed = 42): Txn[] {
  const r = rng(seed)
  const g = gaussian(r)
  const rows: Txn[] = []
  let f = 0
  for (let i = 0; i < 20000; i++) {
    const y: 0 | 1 = i % 200 === 7 ? 1 : 0
    const type = y ? TYPE_ORDER[f++] : null
    const seg: Segment = r() < 0.18 ? 'B' : 'A'
    let u = y ? 2.3 + (OFFSET.get(type as FraudType) as number) + g() : -2.0 + g()
    if (seg === 'B' && y === 0) u += SEG_B_SHIFT
    const [s1, s2, s3] = GAIN.map((gain, k) => sigmoid(gain * u + NOISE[k] * g() - INTERCEPT))
    rows.push({ y, seg, type, s1, s2, s3 })
  }
  return rows
}

/** The held-out split every number in this course is measured on. */
export const VAL: Txn[] = build()

export const FRAUD_COUNT = VAL.filter((t) => t.y === 1).length // 100
export const LEGIT_COUNT = VAL.length - FRAUD_COUNT // 19,900

export interface Confusion {
  tp: number
  fp: number
  fn: number
  tn: number
}

/** The four counts, for any model version, at any threshold, over any subset of rows. */
export function confusion(threshold: number, key: ModelKey = 's3', rows: Txn[] = VAL): Confusion {
  let tp = 0
  let fp = 0
  let fn = 0
  let tn = 0
  for (const t of rows) {
    const flagged = t[key] >= threshold
    if (t.y === 1) flagged ? tp++ : fn++
    else flagged ? fp++ : tn++
  }
  return { tp, fp, fn, tn }
}

export const precision = (c: Confusion) => (c.tp + c.fp === 0 ? NaN : c.tp / (c.tp + c.fp))
export const recall = (c: Confusion) => (c.tp + c.fn === 0 ? NaN : c.tp / (c.tp + c.fn))
export const accuracy = (c: Confusion) => (c.tp + c.tn) / (c.tp + c.fp + c.fn + c.tn)
export function f1(c: Confusion): number {
  const p = precision(c)
  const r = recall(c)
  return !p && !r ? 0 : p + r === 0 || Number.isNaN(p) ? 0 : (2 * p * r) / (p + r)
}

/** The 40 missed frauds, broken down the way a human reading them one at a time would break them
 *  down. Sorted by how many, because that ordering IS the section's argument. */
export function missesByType(threshold = 0.5, key: ModelKey = 's3') {
  return FRAUD_TYPES.map(({ type, count, gloss }) => {
    const rows = VAL.filter((t) => t.type === type)
    const missed = rows.filter((t) => t[key] < threshold).length
    return {
      type,
      gloss,
      count,
      missed,
      /** Recall on this fraud type alone. */
      typeRecall: (count - missed) / count,
      /** Overall recall if this category alone were solved outright — the ceiling on fixing it. */
      ceiling: (confusion(threshold, key).tp + missed) / FRAUD_COUNT,
    }
  }).sort((a, b) => b.missed - a.missed)
}

/** The same model, scored inside each customer segment. §10. */
export function bySegment(threshold = 0.5, key: ModelKey = 's3') {
  return (['A', 'B'] as Segment[]).map((seg) => {
    const rows = VAL.filter((t) => t.seg === seg)
    const c = confusion(threshold, key, rows)
    return {
      seg,
      n: rows.length,
      share: rows.length / VAL.length,
      c,
      recall: recall(c),
      precision: precision(c),
      /** What a legitimate customer in this segment experiences: the chance of being declined. */
      falseAlarmRate: c.fp / (c.fp + c.tn),
    }
  })
}

/** Overall false-alarm rate — the number §10 shows is fine in aggregate and unequal underneath. */
export const falseAlarmRate = (threshold = 0.5, key: ModelKey = 's3') => {
  const c = confusion(threshold, key)
  return c.fp / (c.fp + c.tn)
}

const SWEEP = Array.from({ length: 94 }, (_, i) => 0.02 + i * 0.01)

/** Precision against threshold, as plot points. §08 upper panel. */
export const precisionVsThreshold = (key: ModelKey = 's3'): PlotPoint[] =>
  SWEEP.map((t) => [t, precision(confusion(t, key))] as PlotPoint).filter(([, p]) => !Number.isNaN(p))

/** Recall against threshold. §08 upper panel. */
export const recallVsThreshold = (key: ModelKey = 's3'): PlotPoint[] =>
  SWEEP.map((t) => [t, recall(confusion(t, key))] as PlotPoint)

/** The precision-recall curve itself: one point per threshold, plotted (recall, precision). §08
 *  lower panel. Walked from the high threshold down, so the curve is traced left to right. */
export const prCurve = (key: ModelKey = 's3'): PlotPoint[] =>
  [...SWEEP]
    .reverse()
    .map((t) => {
      const c = confusion(t, key)
      return [recall(c), precision(c)] as PlotPoint
    })
    .filter(([, p]) => !Number.isNaN(p))

/** One operating point, as the (recall, precision) pair §08 marks on the curve. */
export function operatingPoint(threshold: number, key: ModelKey = 's3') {
  const c = confusion(threshold, key)
  return { threshold, c, p: precision(c), r: recall(c), at: [recall(c), precision(c)] as PlotPoint }
}

/** Percent, to one decimal — the form every table in this course prints a rate in. */
export const pct = (x: number, dp = 1) => `${(x * 100).toFixed(dp)}%`

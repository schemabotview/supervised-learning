import type { Scene } from '@graphlearning/flow'
import { CARRIERS, COLUMNS, TRAIN, type Flight } from './_data'
import { candidatesOn, entropyImpurity, yLate } from './_tree'

// §06. The section that looks like plumbing and is not. A tree splits on `value <= t`, so a column
// has to be a NUMBER — and the obvious fix, numbering the three carriers 0, 1 and 2, quietly changes
// which splits exist.
//
// This is measured rather than argued. Under one-hot, the best carrier split is Cascade against the
// other two, worth 0.0115 bits. Under an ordinal 0/1/2 the only reachable splits are {Northwind} and
// {Northwind, Cascade} — the best one is not expressible at all — and which two you get depends on
// the order somebody happened to write the categories in. Both gains below come from the real scan.
const oneHot = COLUMNS.slice(3).map((c) => ({
  c,
  best: candidatesOn(TRAIN, c, yLate, entropyImpurity).reduce((a, b) => (b.gain > a.gain ? b : a)),
}))
// The same column numbered 0/1/2 in declaration order, scanned the same way.
const ordinalColumn = {
  key: 'carrier-ordinal',
  label: 'carrier as 0 / 1 / 2',
  binary: false,
  question: () => '',
  fmt: (t: number) => t.toFixed(1),
  of: (f: Flight) => CARRIERS.indexOf(f.carrier),
}
const ordinal = candidatesOn(TRAIN, ordinalColumn, yLate, entropyImpurity)
const bestOneHot = oneHot.reduce((a, b) => (b.best.gain > a.best.gain ? b : a))
const bestOrdinal = ordinal.reduce((a, b) => (b.gain > a.gain ? b : a))

export const categoricalAndContinuous: Scene = {
  id: 'categorical-and-continuous',
  title: 'A tree can only ask "is this number bigger?"',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'three carriers become three columns',
      label: [
        'X = pd.get_dummies(df, columns=["carrier"])',
        '',
        '#  carrier      ->  carrier_Northwind  carrier_Cascade  carrier_Meridian',
        '#  Cascade                      0                1                0',
        '#  Meridian                     0                0                1',
        '',
        '#  NOT this — it invents an order that is not there:',
        '#  df["carrier"] = df["carrier"].map({"Northwind": 0, ...})',
        '',
        '#  depHour and precip need nothing: they are already numbers,',
        '#  and the tree finds its own thresholds.',
      ].join('\n'),
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'The encoding decides which questions exist',
      sub: `one-hot reaches every grouping · 0/1/2 reaches two of them, and which two depends on the order somebody typed`,
      pattern: 'user',
      headers: ['encoding', 'the split it can ask about', 'information gain'],
      values: [
        ...oneHot.map(({ c, best }) => [
          'one-hot',
          `${c.label.replace('carrier is ', '')} against the other two`,
          best.gain.toFixed(4),
        ]),
        ...ordinal.map((cand) => [
          'ordinal 0/1/2',
          `${CARRIERS.slice(0, Math.ceil(cand.threshold)).join(' + ')} against the rest`,
          cand.gain.toFixed(4),
        ]),
        [
          '',
          `best reachable: one-hot ${bestOneHot.best.gain.toFixed(4)} · ordinal ${bestOrdinal.gain.toFixed(4)}`,
          '',
        ],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'compare', label: 'and it matters' }],
}

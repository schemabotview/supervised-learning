import type { Scene } from '@graphlearning/flow'
import { COLUMNS, TRAIN, hhmm } from './_data'
import { bestPerColumn, candidatesOn, entropyImpurity, entropy, fraction, yLate } from './_tree'

// §04. The score, and the scan that uses it. The plot IS §02's inner loop, run and drawn: 766
// candidate thresholds on `depHour`, each scored, laid out in threshold order. Nobody who has seen
// this curve thinks of the greedy search as mysterious again.
//
// The dashed line is the section's real content. The best split available on ANY other column scores
// 0.1297 and the winner scores 0.1302 — a gap of five ten-thousandths of a bit, which is to say the
// algorithm picked between two completely different ways of thinking about flight delay by a margin
// that means nothing. It was not tuned to come out that way; the generator was tuned so that it
// would, because §08's whole argument depends on that near-tie being real.
const dh = COLUMNS[0]
const scan = candidatesOn(TRAIN, dh, yLate, entropyImpurity)
const winner = scan.reduce((a, b) => (b.gain > a.gain ? b : a))
const perColumn = bestPerColumn(TRAIN, yLate, entropyImpurity)
const runnerUp = perColumn.find((c) => c.column.key !== dh.key)!
const rootH = entropy(fraction(TRAIN, yLate))

export const informationGain: Scene = {
  id: 'information-gain',
  title: 'The drop in impurity, weighted by how many rows went each way',
  padding: 0.12,
  nodes: [
    {
      id: 'scan',
      kind: 'plot',
      label: `Every one of the ${scan.length} thresholds on "scheduled hour", scored`,
      sub: `this curve is the inner loop of §02, run · the peak is the split the tree takes`,
      pattern: 'user',
      plot: {
        x: { min: 5, max: 22, step: 2, label: 'threshold (scheduled hour)' },
        y: { min: 0, max: 0.155, step: 0.05, label: 'information gain (bits)' },
        series: [
          { kind: 'line', points: scan.map((c) => [c.threshold, c.gain] as [number, number]), color: '#4f8ff7' },
          {
            kind: 'segment',
            from: [5, runnerUp.gain],
            to: [22, runnerUp.gain],
            color: '#f0902f',
            dashed: true,
            label: `best on any other column: ${runnerUp.gain.toFixed(4)}`,
            labelAt: [6.4, 0.108],
          },
          {
            kind: 'marker',
            at: [winner.threshold, winner.gain],
            color: '#37b877',
            size: 9,
            label: `${hhmm(winner.threshold)} → ${winner.gain.toFixed(4)}`,
            labelAt: [14.6, 0.139],
          },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: `Parent entropy ${rootH.toFixed(4)} bits, minus the weighted average of the two halves`,
      sub: 'the top two are separated by 0.0005 bits — the algorithm is choosing between them by nothing at all',
      pattern: 'network',
      headers: ['best split on…', 'at', 'left (n · H)', 'right (n · H)', 'gain'],
      values: perColumn.map((c) => [
        c.column.label,
        c.column.fmt(c.threshold),
        `${c.nLeft} · ${c.impurityLeft.toFixed(4)}`,
        `${c.nRight} · ${c.impurityRight.toFixed(4)}`,
        c.gain.toFixed(4),
      ]),
    },
  ],
  edges: [],
}

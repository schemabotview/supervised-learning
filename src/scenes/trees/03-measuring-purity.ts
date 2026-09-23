import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TRAIN } from './_data'
import { SMALL_TREE, entropy, gini, fraction, leavesOf, yLate } from './_tree'

// §03. The "better?" box from §02, opened. Entropy is plotted rather than stated because the SHAPE
// is the content: flat near the top and steep near the edges, which is why a split that takes a
// node from 50/50 to 60/40 buys almost nothing and one that takes 10% down to 2% buys a lot.
//
// The second panel anchors the curve to something the reader has already seen — the four leaves of
// §01's tree, each with its own position on this curve. The 42% leaf scoring 0.98 bits is the
// useful shock: it looks like the tree learned something there, and by this measure it learned
// almost nothing.
const p0 = fraction(TRAIN, yLate)
const leaves = leavesOf(SMALL_TREE)

export const measuringPurity: Scene = {
  id: 'measuring-purity',
  title: 'One number for how mixed a node is',
  padding: 0.12,
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Entropy, and the other one people use',
      sub: 'both peak at 50/50 and both hit zero at either end · entropy is in bits, Gini is not, and they rank splits almost identically',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 1, step: 0.1, label: 'fraction of the node that is late' },
        y: { min: 0, max: 1.08, step: 0.25, label: 'impurity' },
        series: [
          { kind: 'line', points: sample(0.001, 0.999, 300, entropy), color: '#4f8ff7', label: 'entropy (bits)', labelAt: [0.1, 1.03] },
          { kind: 'line', points: sample(0, 1, 300, gini), color: '#c98bff', label: 'Gini', labelAt: [0.56, 0.36] },
          { kind: 'marker', at: [0.5, 1], color: '#f0656f', size: 8, label: 'worst possible: 1 bit', labelAt: [0.53, 1.03] },
          { kind: 'marker', at: [p0, entropy(p0)], color: '#f0902f', size: 8, label: `all 999 flights: ${entropy(p0).toFixed(3)}`, labelAt: [0.3, 0.78] },
          { kind: 'marker', at: [1, 0], color: '#37b877', size: 8, label: 'pure: 0', labelAt: [0.86, 0.07] },
          { kind: 'marker', at: [0, 0], color: '#37b877', size: 8 },
        ],
      },
    },
    {
      id: 'leaves',
      kind: 'table',
      label: 'The four leaves of the tree in §01, scored',
      sub: 'the two the tree is confident about are near zero · the two in the middle have barely moved off the worst possible score',
      pattern: 'network',
      headers: ['leaf', 'flights', 'fraction late', 'entropy (bits)', 'Gini'],
      values: leaves.map((lf, i) => [
        ['morning · inbound on time', 'morning · inbound late', 'afternoon · inbound on time', 'afternoon · inbound late'][i],
        String(lf.n),
        lf.value.toFixed(3),
        entropy(lf.value).toFixed(3),
        gini(lf.value).toFixed(3),
      ]),
    },
  ],
  edges: [],
}

import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TUMOURS, sigmoid, B } from './_data'

// §05. Why the cost had to change too, argued on the cost curve rather than asserted. Both curves
// are the REAL cost of the real tumours, swept over w with b pinned at the fitted value: squared
// error on a sigmoid is genuinely non-convex — it has a long dead flat shelf on the left where the
// gradient is ~2e-4 and the algorithm simply stops — while log loss is a clean bowl (checked
// numerically: no negative second difference anywhere in the window). Nothing here is drawn by hand.
const sqCost = (w: number) =>
  TUMOURS.reduce((a, [x, y]) => a + (sigmoid(w * x + B) - y) ** 2, 0) / (2 * TUMOURS.length)
const logCost = (w: number) =>
  TUMOURS.reduce((a, [x, y]) => {
    const p = Math.min(1 - 1e-12, Math.max(1e-12, sigmoid(w * x + B)))
    return a - (y * Math.log(p) + (1 - y) * Math.log(1 - p))
  }, 0) / TUMOURS.length

export const whyNotSquaredError: Scene = {
  id: 'why-not-squared-error',
  title: 'The same data, two costs, two different shapes',
  padding: 0.09,
  nodes: [
    {
      id: 'sq',
      kind: 'plot',
      label: 'Squared error on a sigmoid',
      sub: 'a long flat shelf on the left: the slope there is 0.0002 and descent simply stops',
      pattern: 'warn',
      plot: {
        x: { min: -1, max: 8, step: 2, label: 'w' },
        y: { min: 0, max: 0.3, step: 0.1, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-1, 8, 300, sqCost), color: '#f0656f' },
          { kind: 'marker', at: [-0.4, sqCost(-0.4)], color: '#f0902f', label: 'start here and it never moves', labelAt: [-0.55, 0.265] },
        ],
      },
    },
    {
      id: 'log',
      kind: 'plot',
      label: 'Log loss on the same sigmoid',
      sub: 'convex: one minimum, a usable slope everywhere, no shelf to get stuck on',
      pattern: 'storage',
      plot: {
        x: { min: -1, max: 8, step: 2, label: 'w' },
        y: { min: 0, max: 5.6, step: 1, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-1, 8, 300, logCost), color: '#37b877' },
          { kind: 'marker', at: [-0.4, logCost(-0.4)], color: '#f0902f', label: 'same start, slope 1.6 — it walks down', labelAt: [-0.2, 4.7] },
        ],
      },
    },
  ],
  edges: [],
}

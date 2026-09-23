import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { COST } from './_data'

// §04. Two parameters is one too many to see at once, so this section pins b and sweeps w. The
// result is a parabola, and the parabola is the first thing in the course a reader can point at and
// say "go there" — which is exactly what gradient descent will do two sections later.
//
// The curve is the REAL cost of the real dataset, evaluated at each w, not a drawn parabola. It
// comes out as one because squared error genuinely is quadratic in w, and the section says so.
const B = COST.bMin

export const costInOneParameter: Scene = {
  id: 'cost-in-one-parameter',
  title: 'Hold b still, and sweep w',
  padding: 0.14,
  nodes: [
    {
      id: 'parabola',
      kind: 'plot',
      label: 'J(w) with b fixed at 1.08',
      sub: 'every point on this curve is one line, scored against all twelve houses',
      pattern: 'storage',
      plot: {
        x: { min: -0.2, max: 1.2, step: 0.2, label: 'w' },
        y: { min: 0, max: 1.2, step: 0.2, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-0.2, 1.2, 200, (w) => COST.at(w, B)), color: '#37b877' },
          { kind: 'marker', at: [0.2, COST.at(0.2, B)], color: '#9aa4b2', label: 'too flat', labelAt: [0.02, 0.42] },
          { kind: 'marker', at: [0.9, COST.at(0.9, B)], color: '#9aa4b2', label: 'too steep', labelAt: [0.93, 0.38] },
          { kind: 'marker', at: [COST.wMin, COST.at(COST.wMin, B)], color: '#f0902f', label: 'the bottom', labelAt: [0.5, 0.17] },
        ],
      },
    },
  ],
  edges: [],
}

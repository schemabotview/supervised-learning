import type { Scene } from '@graphlearning/flow'
import { NOISE_FLOOR, jTrain, jVal } from './_data'

// §03. The two failure modes as NUMBERS rather than as pictures — the diagnostic the rest of the
// course runs on. Both curves are measured, degree by degree, on the real splits.
//
// The validation minimum lands at degree 3 (0.0153) with degree 2 a whisker behind (0.0154). The
// true process IS degree 2, and the frame does not quite say so — eight validation points cannot
// separate two models that close. That is left honest rather than tuned away, and §05 is where the
// reason gets a name.
const DEGREES = [1, 2, 3, 4, 5, 6, 8, 10, 12]
const pts = (f: (d: number) => number) => DEGREES.map((d) => [d, f(d)] as [number, number])

export const biasAndVariance: Scene = {
  id: 'bias-and-variance',
  title: 'Two numbers, read together',
  padding: 0.12,
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'J_train and J_val against model complexity',
      sub: 'left of the dip both are high and together — bias · right of it they separate — variance',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 13, step: 2, label: 'polynomial degree' },
        y: { min: 0, max: 0.115, step: 0.02, label: 'J' },
        series: [
          { kind: 'segment', from: [0, NOISE_FLOOR], to: [13, NOISE_FLOOR], color: '#5a6170', dashed: true, label: 'noise floor 0.019', labelAt: [3.5, 0.0275] },
          { kind: 'line', points: pts(jTrain), color: '#4f8ff7', label: 'J_train', labelAt: [10.2, 0.0035] },
          { kind: 'line', points: pts(jVal), color: '#f0656f', label: 'J_val', labelAt: [10.3, 0.083] },
          { kind: 'marker', at: [3, jVal(3)], color: '#37b877', size: 8, label: 'best: degree 3', labelAt: [3.4, 0.0055] },
          { kind: 'marker', at: [1, jVal(1)], color: '#f0902f', size: 7, label: 'high bias', labelAt: [0.45, 0.046] },
          { kind: 'marker', at: [12, jVal(12)], color: '#f0902f', size: 7, label: 'high variance', labelAt: [8.1, 0.1] },
        ],
      },
    },
  ],
  edges: [],
}

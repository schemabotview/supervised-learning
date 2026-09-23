import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { rng } from '../_curve'

// §08. A curve out of a linear model, which sounds like a contradiction until you see that "linear"
// describes the PARAMETERS, not the shape. The same x, squared, becomes a second column; the model
// is still a weighted sum, and the weighted sum now bends.
//
// The data genuinely curves (price per square foot tails off at the top end), so the straight fit
// is visibly wrong at both ends and in the middle — the classic underfit signature, which §01 of
// the `generalization` course picks straight back up.
const r = rng(41)
const XS = Array.from({ length: 16 }, (_, i) => 0.4 + i * 0.28)
const TRUE = (x: number) => 1.1 + 1.35 * x - 0.14 * x * x
const DATA = XS.map((x) => [x, Number((TRUE(x) + (r() - 0.5) * 0.36).toFixed(3))] as [number, number])

export const polynomialRegression: Scene = {
  id: 'polynomial-regression',
  title: 'A curve, from a model that is still linear',
  padding: 0.14,
  nodes: [
    {
      id: 'poly',
      kind: 'plot',
      label: 'f(x) = w₁x + w₂x² + b',
      sub: '"linear" describes the parameters, not the picture — x² is just another column',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 5, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: DATA, color: '#4f8ff7' },
          { kind: 'line', points: sample(0, 5, 2, (x) => 1.52 + 0.755 * x), color: '#9aa4b2', dashed: true, label: 'straight — misses at both ends', labelAt: [1.05, 4.4] },
          { kind: 'line', points: sample(0, 5, 140, TRUE), color: '#f0902f', label: 'with an x² column', labelAt: [2.6, 2.45] },
        ],
      },
    },
  ],
  edges: [],
}

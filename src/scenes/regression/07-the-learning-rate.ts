import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { COST } from './_data'

// §07. The one hyper-parameter this course has, and the two ways it goes wrong. Every trace is a
// REAL run of the update rule on the same curve; only α differs, and the divergent one genuinely
// diverges rather than being drawn to look like it does.
//
// The threshold is not a matter of taste. d²J/dw² here is mean(x²) = 7.69, so the iteration is
// stable only for α < 2/7.69 ≈ 0.26 — which is why the three values are 0.02, 0.10 and 0.30 rather
// than the 0.02 / 0.32 / 0.95 this scene first carried. 0.32 is already past the threshold, so the
// "about right" panel was showing a divergence and calling it convergence.
//
// TWO stacked plots, not three in a row. Three panels side by side make a ~2400px-wide scene that
// fitView shrinks to roughly a third, and at that size the dots were not visible at all — the
// figure silently showed nothing. The J-against-iteration panel is also the honest place to put the
// divergent run: it leaves the top of the frame, which is exactly what it does in real life.
const B = COST.bMin

function run(alpha: number, n: number, w0 = 0.02): [number, number][] {
  const out: [number, number][] = []
  let w = w0
  for (let i = 0; i < n; i++) {
    if (!Number.isFinite(w) || Math.abs(w) > 40) break
    out.push([w, i])
    const h = 1e-5
    w -= alpha * ((COST.at(w + h, B) - COST.at(w - h, B)) / (2 * h))
  }
  return out
}

const onCurve = (alpha: number, n: number) => run(alpha, n).map(([w]) => [w, COST.at(w, B)] as [number, number])
const overTime = (alpha: number, n: number) => run(alpha, n).map(([w], i) => [i, COST.at(w, B)] as [number, number])

export const theLearningRate: Scene = {
  id: 'the-learning-rate',
  title: 'Too small, about right, too large',
  padding: 0.10,
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Where the steps land',
      sub: 'α = 0.02 crawls · α = 0.10 arrives in five · α = 0.30 bounces outward and leaves the frame',
      pattern: 'storage',
      plot: {
        x: { min: -0.7, max: 1.7, step: 0.4, label: 'w' },
        y: { min: 0, max: 1.5, step: 0.3, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-0.7, 1.7, 220, (w) => COST.at(w, B)), color: '#37b877' },
          { kind: 'scatter', points: onCurve(0.02, 26), color: '#4f8ff7', size: 5, label: 'α = 0.02', labelAt: [-0.66, 1.34] },
          { kind: 'scatter', points: onCurve(0.10, 9), color: '#f0902f', size: 7, label: 'α = 0.10', labelAt: [-0.66, 1.16] },
          { kind: 'scatter', points: onCurve(0.30, 6), color: '#f0656f', size: 7, label: 'α = 0.30', labelAt: [-0.66, 0.98] },
        ],
      },
    },
    {
      id: 'diag',
      kind: 'plot',
      label: 'The diagnosis: J against iteration',
      sub: 'the only one of these three pictures you can still draw with a thousand parameters',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 25, step: 5, label: 'iteration' },
        y: { min: 0, max: 1.5, step: 0.3, label: 'J(w)' },
        series: [
          { kind: 'line', points: overTime(0.02, 26), color: '#4f8ff7', label: 'too small', labelAt: [13, 0.3] },
          { kind: 'line', points: overTime(0.10, 26), color: '#f0902f', label: 'about right', labelAt: [13, 0.12] },
          { kind: 'line', points: overTime(0.30, 26), color: '#f0656f', label: 'too large — off the top', labelAt: [3.2, 1.28] },
        ],
      },
    },
  ],
  edges: [],
}

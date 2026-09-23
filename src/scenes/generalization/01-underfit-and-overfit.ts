import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TRAIN, X_MIN, X_MAX, fitTrain, jTrain, jVal } from './_data'

// §01. The three regimes on ONE training set. Every curve is the real least-squares fit — nothing
// here is drawn — which matters most for the third panel: a hand-waved squiggle would let the
// author decide how bad overfitting looks, and the whole course rests on it being bad on its own.
//
// Read the degree-12 panel before rewriting its caption. With 24 evenly spaced points and 13
// parameters, least squares AVERAGES the noise in the interior: the curve tracks the good fit
// closely from 0.4 to about 4.2 and only then detonates, reaching 12.0 at the right edge. The
// textbook "wiggles through every point" caption would be false on this frame, so the caption says
// what is actually there — overfitting shows up where the data runs out.
const panel = (f: (x: number) => number, color: string) => ({
  x: { min: 0.2, max: 4.9, step: 1, label: 'size (1000 ft²)' },
  y: { min: 1, max: 5, step: 1, label: 'price ($100k)' },
  series: [
    { kind: 'scatter' as const, points: TRAIN, color: '#6b7686', size: 5 },
    { kind: 'line' as const, points: sample(X_MIN, X_MAX, 320, f), color },
  ],
})

const d1 = fitTrain(1)
const d3 = fitTrain(3)
const d12 = fitTrain(12)
const num = (v: number) => v.toFixed(3)

export const underfitAndOverfit: Scene = {
  id: 'underfit-and-overfit',
  title: 'One training set, three amounts of flexibility',
  padding: 0.12,
  nodes: [
    {
      id: 'under',
      kind: 'plot',
      label: 'Degree 1 — underfit',
      sub: `too rigid to bend with the data · J_train ${num(jTrain(1))} · J_val ${num(jVal(1))} — both bad, and equally bad`,
      pattern: 'service',
      plot: panel(d1.at, '#f0902f'),
    },
    {
      id: 'good',
      kind: 'plot',
      label: 'Degree 3 — about right',
      sub: `follows the bend and ignores the jitter · J_train ${num(jTrain(3))} · J_val ${num(jVal(3))} — close together, and low`,
      pattern: 'storage',
      plot: panel(d3.at, '#37b877'),
    },
    {
      id: 'over',
      kind: 'plot',
      label: 'Degree 12 — overfit',
      sub: `J_train ${num(jTrain(12))}, the best of the three · J_val ${num(jVal(12))}, seven times the worst — and it leaves the top of the chart where the houses run out`,
      pattern: 'warn',
      plot: panel(d12.at, '#f0656f'),
    },
  ],
  edges: [],
}

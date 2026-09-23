import type { Scene } from '@graphlearning/flow'
import { jTrain, jVal } from './_data'

// §08. The sweep that picks λ, drawn against log₁₀ λ because λ is chosen on a multiplicative grid —
// 0.001, 0.01, 0.1 — and a linear axis would pile nine of the eleven points against the left edge.
//
// The window stops at λ = 10. Beyond it J_val climbs to 0.35 and the interesting part of the curve
// — a minimum of 0.0173 sitting between two much worse ends — would be squashed into the bottom
// twentieth of the frame. The rise is already unmistakable by λ = 10.
const EXPS = [-4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1]
const pts = (f: (d: number, l: number) => number): [number, number][] =>
  EXPS.map((e) => [e, f(12, 10 ** e)])
const BEST = -1.5

export const choosingLambda: Scene = {
  id: 'choosing-lambda',
  title: 'Sweep λ, and let the validation set choose',
  padding: 0.12,
  nodes: [
    {
      id: 'sweep',
      kind: 'plot',
      label: 'Degree 12, λ from 0.0001 to 10',
      sub: 'J_train only ever rises with λ — it is the training fit being deliberately spoiled. J_val is the one with a bottom',
      pattern: 'user',
      plot: {
        x: { min: -4.4, max: 1.4, step: 1, label: 'log₁₀ λ' },
        y: { min: 0, max: 0.13, step: 0.02, label: 'J' },
        series: [
          { kind: 'segment', from: [-4.4, jVal(12, 0)], to: [1.4, jVal(12, 0)], color: '#5a6170', dashed: true, label: 'no penalty at all: 0.104', labelAt: [-4.2, 0.109] },
          { kind: 'line', points: pts(jTrain), color: '#4f8ff7', label: 'J_train', labelAt: [0.62, 0.0275] },
          { kind: 'line', points: pts(jVal), color: '#f0656f', label: 'J_val', labelAt: [-0.15, 0.083] },
          { kind: 'marker', at: [BEST, jVal(12, 10 ** BEST)], color: '#37b877', size: 8, label: 'λ ≈ 0.03 → J_val 0.017', labelAt: [-2.95, 0.0315] },
        ],
      },
    },
  ],
  edges: [],
}

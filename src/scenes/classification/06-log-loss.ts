import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'

// §06. The two branches, drawn against the prediction rather than against a parameter — this is the
// plot that explains WHY the loss behaves the way it does, and it is worth its own section because
// the asymptote is the whole mechanism. Confident and wrong costs unboundedly much; that single
// property is what makes the model calibrate its probabilities instead of just ranking them.
const eps = 1e-3
export const logLoss: Scene = {
  id: 'log-loss',
  title: 'Confident and wrong costs unboundedly much',
  padding: 0.09,
  nodes: [
    {
      id: 'y1',
      kind: 'plot',
      label: 'When y = 1 : loss = −log(f)',
      sub: 'predict 0.99 and pay almost nothing · predict 0.01 and the bill runs off the top',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 1, step: 0.25, label: 'f(x) — what the model said' },
        y: { min: 0, max: 5, step: 1, label: 'loss' },
        series: [
          { kind: 'line', points: sample(eps, 1, 400, (f) => -Math.log(f)), color: '#4f8ff7' },
          { kind: 'marker', at: [0.99, -Math.log(0.99)], color: '#37b877', label: 'right: ≈ 0.01', labelAt: [0.62, 0.42] },
          { kind: 'marker', at: [0.1, -Math.log(0.1)], color: '#f0656f', label: 'wrong: 2.3', labelAt: [0.14, 2.3] },
        ],
      },
    },
    {
      id: 'y0',
      kind: 'plot',
      label: 'When y = 0 : loss = −log(1 − f)',
      sub: 'the mirror image — the same rule, pointing the other way',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 1, step: 0.25, label: 'f(x) — what the model said' },
        y: { min: 0, max: 5, step: 1, label: 'loss' },
        series: [
          { kind: 'line', points: sample(0, 1 - eps, 400, (f) => -Math.log(1 - f)), color: '#c98bff' },
          { kind: 'marker', at: [0.01, -Math.log(1 - 0.01)], color: '#37b877', label: 'right: ≈ 0.01', labelAt: [0.05, 0.42] },
          { kind: 'marker', at: [0.9, -Math.log(1 - 0.9)], color: '#f0656f', label: 'wrong: 2.3', labelAt: [0.55, 2.3] },
        ],
      },
    },
  ],
  edges: [],
}

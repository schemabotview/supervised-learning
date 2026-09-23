import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TRAIN, X_MIN, X_MAX, fitTrain, jVal } from './_data'

// §06. The same degree-12 model, twice, with the ONLY difference being one term added to the cost.
// Both curves are fitted; the tamed one is not a lower-degree model drawn to look reasonable. The
// coefficient numbers in the caption are the real maxima the solver returned — 847.52 and 1.40 —
// and that 600-fold collapse is the whole mechanism in one figure.
const raw = fitTrain(12, 0)
const reg = fitTrain(12, 0.03)

export const regularization: Scene = {
  id: 'regularization',
  title: 'Keep every feature. Make the weights small',
  flow: 'TB',
  padding: 0.13,
  nodes: [
    {
      id: 'fits',
      kind: 'plot',
      label: 'Degree 12, with and without a penalty on the weights',
      sub: `λ = 0 → largest weight ${raw.maxWeight.toFixed(0)}, J_val ${jVal(12).toFixed(3)} · λ = 0.03 → largest weight ${reg.maxWeight.toFixed(2)}, J_val ${jVal(12, 0.03).toFixed(3)}`,
      pattern: 'user',
      plot: {
        x: { min: 0.2, max: 4.9, step: 1, label: 'size (1000 ft²)' },
        y: { min: 1, max: 5, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: TRAIN, color: '#6b7686', size: 5 },
          { kind: 'line', points: sample(X_MIN, X_MAX, 320, raw.at), color: '#f0656f', label: 'λ = 0', labelAt: [3.95, 4.55] },
          { kind: 'line', points: sample(X_MIN, X_MAX, 320, reg.at), color: '#37b877', label: 'λ = 0.03', labelAt: [3.15, 3.25] },
        ],
      },
    },
    {
      id: 'cost',
      kind: 'code',
      hug: true,
      filename: 'the cost, with one term added',
      label: [
        'J(w, b) =  1/2m · Σ (f(x) - y)²   +   λ/2m · Σ wⱼ²',
        '           \\_______________/         \\__________/',
        '             fit the data              stay small',
        '',
        '# The sum runs over the WEIGHTS only — never b.',
        '# Penalising the intercept just drags the whole',
        '# curve toward zero, which fixes nothing.',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'fits', target: 'cost', label: 'one term does that' }],
}

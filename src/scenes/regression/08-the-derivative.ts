import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { COST } from './_data'

// §08. Where ∂J/∂w comes from, done once so it is never mysterious again. The plot carries the
// GEOMETRY — the derivative is the slope of the tangent, and its SIGN is what tells the update rule
// which way to move — and the code card carries the arithmetic, so neither has to do both jobs.
const B = COST.bMin
const d = (w: number) => { const h = 1e-5; return (COST.at(w + h, B) - COST.at(w - h, B)) / (2 * h) }
// A tangent drawn at a fixed WIDTH in w overshoots badly where the curve is steep: at w = 0.06 the
// slope is about -2.4, so ±0.28 in w is ±0.67 in J and the line left the top of the frame, reading
// as part of the figure rather than as a short tangent touching it. Cap the VERTICAL extent instead
// and let the width follow from the slope, so all three tangents come out the same visual length.
const tangentAt = (w: number): [number, number][] => {
  const [j, g] = [COST.at(w, B), d(w)]
  const half = Math.min(0.2, 0.17 / Math.max(Math.abs(g), 0.85))
  return [[w - half, j - half * g], [w + half, j + half * g]]
}

export const theDerivative: Scene = {
  id: 'the-derivative',
  title: 'The slope is the whole instruction',
  flow: 'TB',
  padding: 0.11,
  nodes: [
    {
      id: 'tangents',
      kind: 'plot',
      label: '∂J/∂w at three places',
      sub: 'negative on the left → move right · positive on the right → move left · zero at the bottom',
      pattern: 'storage',
      plot: {
        x: { min: -0.2, max: 1.2, step: 0.2, label: 'w' },
        y: { min: 0, max: 1.2, step: 0.2, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-0.2, 1.2, 200, (w) => COST.at(w, B)), color: '#37b877' },
          { kind: 'line', points: tangentAt(0.06), color: '#f0656f', label: 'slope < 0', labelAt: [-0.16, 0.86] },
          { kind: 'line', points: tangentAt(0.95), color: '#f0656f', label: 'slope > 0', labelAt: [0.86, 0.72] },
          { kind: 'line', points: tangentAt(COST.wMin), color: '#f0902f', label: 'slope = 0', labelAt: [0.42, 0.2] },
          { kind: 'marker', at: [0.06, COST.at(0.06, B)], color: '#f0656f', size: 6 },
          { kind: 'marker', at: [0.95, COST.at(0.95, B)], color: '#f0656f', size: 6 },
          { kind: 'marker', at: [COST.wMin, COST.at(COST.wMin, B)], color: '#f0902f', size: 6 },
        ],
      },
    },
    {
      id: 'derive',
      kind: 'code',
      hug: true,
      filename: 'both partial derivatives, in full',
      label: [
        'J(w,b) = 1/(2m) * SUM( (w*x + b - y)**2 )',
        '',
        '# chain rule: d/dw of (...)**2 is 2*(...) * d/dw(...)',
        '#             and d/dw (w*x + b - y) is just x',
        '#             the 2 cancels the 1/2 — that is why it is there',
        '',
        'dJ_dw = 1/m * SUM( (w*x + b - y) * x )',
        'dJ_db = 1/m * SUM( (w*x + b - y)     )',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'tangents', target: 'derive', label: 'and in symbols' }],
}

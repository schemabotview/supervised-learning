import type { Scene } from '@graphlearning/flow'
import { precisionVsThreshold, recallVsThreshold, prCurve, operatingPoint, f1 } from './_data'

// §08. One knob, and it only slides. The upper panel is the knob itself — precision and recall
// against the threshold, crossing once — and the lower panel is the same sweep with the threshold
// eliminated, which is the curve people actually publish.
//
// Two panels STACK (the scene pane is very nearly square, so side-by-side plots are shrunk to fit
// their combined width) and a stacked scene needs its own padding to keep the first title out from
// under the eyebrow — 0.12 here, against 0.07-0.09 for a one-panel scene.
//
// The three marked points are real operating points on the real curve, and their labels are placed
// per point rather than by a shared offset: the curve's slope changes enormously from one end to
// the other, so an offset that clears it at (0.30, 0.97) sits on top of it at (0.84, 0.18).
//
// Note the curve is very slightly ragged at the high-precision end — precision backs up by at most
// 0.009 in places, because one more flagged row at 30-odd flags moves it by a whole percentage
// point. That is a true property of a PR curve on 100 positives and it is not smoothed away.
const P = '#4f8ff7'
const R = '#f0902f'
const CURVE = '#c98bff'
const MARK = '#37b877'

const strict = operatingPoint(0.9)
const half = operatingPoint(0.5)
const loose = operatingPoint(0.1)

export const theTradeoff: Scene = {
  id: 'the-tradeoff',
  title: 'One knob, and it only slides',
  padding: 0.12,
  nodes: [
    {
      id: 'knob',
      kind: 'plot',
      label: 'Both scores against the threshold',
      sub: 'raise it and you flag fewer things, more of which are real · there is no setting where both rise',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 1, step: 0.1, label: 'threshold' },
        y: { min: 0, max: 1.05, step: 0.25, label: 'score' },
        series: [
          { kind: 'line', points: precisionVsThreshold(), color: P, label: 'precision', labelAt: [0.62, 0.88] },
          { kind: 'line', points: recallVsThreshold(), color: R, label: 'recall', labelAt: [0.64, 0.33] },
          { kind: 'segment', from: [0.5, 0], to: [0.5, 1.05], color: '#5a6170', dashed: true, label: 'the default', labelAt: [0.24, 0.96] },
        ],
      },
    },
    {
      id: 'curve',
      kind: 'plot',
      label: 'The same sweep, with the threshold thrown away',
      sub: `every point is one threshold · best F1 is ${f1(operatingPoint(0.39).c).toFixed(2)} at 0.39, not at 0.5`,
      pattern: 'network',
      plot: {
        x: { min: 0, max: 1, step: 0.1, label: 'recall' },
        y: { min: 0, max: 1.05, step: 0.25, label: 'precision' },
        series: [
          { kind: 'line', points: prCurve(), color: CURVE },
          { kind: 'marker', at: strict.at, color: MARK, size: 9, label: `0.9 → ${strict.c.tp} caught, ${strict.c.fp} declined`, labelAt: [0.04, 0.86] },
          { kind: 'marker', at: half.at, color: MARK, size: 9, label: `0.5 → ${half.c.tp} caught, ${half.c.fp} declined`, labelAt: [0.63, 0.72] },
          { kind: 'marker', at: loose.at, color: MARK, size: 9, label: `0.1 → ${loose.c.tp} caught, ${loose.c.fp} declined`, labelAt: [0.42, 0.13] },
        ],
      },
    },
  ],
  edges: [],
}

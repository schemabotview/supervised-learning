import type { Scene } from '@graphlearning/flow'
import { TUMOURS, WITH_OUTLIER, benign, malignant, lsLine } from './_data'

// §01. Why linear regression is not simply reused. Both panels fit a least-squares LINE to the same
// 0/1 labels — the fits are computed, not drawn — and the second adds one very large malignant
// tumour, far to the right. It is a point the model already gets RIGHT, and it drags the line enough
// to lose a tumour that was correct before. That is the argument: the failure is not noise or a bad
// fit, it is the loss function pulling hard on a case it should already be happy about.
const A = lsLine(TUMOURS)
const C = lsLine(WITH_OUTLIER)
const seg = (f: { w: number; b: number }, to: number): [number, number][] => [[0, f.b], [to, f.w * to + f.b]]
// Where each line crosses 0.5 — the implied threshold. A = 2.61 cm, C = 2.94 cm.
const cross = (f: { w: number; b: number }) => (0.5 - f.b) / f.w
// The y window reaches 1.6 so the tilted line stays inside the frame all the way to the outlier,
// and so that the line is visibly ABOVE 1 and BELOW 0 — which is half the objection to it.
const ax = { x: { min: 0, max: 10, step: 2, label: 'tumour size (cm)' }, y: { min: -0.4, max: 1.6, step: 0.5, label: 'y' } }

export const whyNotALine: Scene = {
  id: 'why-not-a-line',
  title: 'One point it gets right, and the line moves anyway',
  padding: 0.09,
  nodes: [
    {
      id: 'ok',
      kind: 'plot',
      label: 'A line through 0/1 labels',
      sub: 'awkward — it predicts 1.4 and −0.35, which are not probabilities — but 0.5 lands between the groups',
      pattern: 'network',
      plot: {
        ...ax,
        series: [
          { kind: 'line', points: seg(A, 10), color: '#f0902f' },
          { kind: 'segment', from: [0, 0.5], to: [10, 0.5], color: '#6b7686', label: '0.5', labelAt: [9.2, 0.62] },
          { kind: 'scatter', points: benign(TUMOURS), color: '#4f8ff7', label: 'benign', labelAt: [0.3, 0.2] },
          { kind: 'scatter', points: malignant(TUMOURS), color: '#f0656f', label: 'malignant', labelAt: [3.2, 1.16] },
          { kind: 'marker', at: [cross(A), 0.5], color: '#37b877', size: 6, label: '2.61 cm', labelAt: [cross(A) + 0.3, 0.28] },
        ],
      },
    },
    {
      id: 'broken',
      kind: 'plot',
      label: 'Add one very large malignant tumour',
      sub: 'the fit tilts, 0.5 slides right to 2.94 cm, and the 2.8 cm tumour that was correct now reads benign',
      pattern: 'warn',
      plot: {
        ...ax,
        series: [
          { kind: 'line', points: seg(A, 10), color: '#5a6170', dashed: true, label: 'before', labelAt: [4.6, 1.5] },
          { kind: 'line', points: seg(C, 10), color: '#f0656f' },
          { kind: 'segment', from: [0, 0.5], to: [10, 0.5], color: '#6b7686' },
          { kind: 'scatter', points: benign(WITH_OUTLIER), color: '#4f8ff7' },
          { kind: 'scatter', points: malignant(WITH_OUTLIER), color: '#f0656f' },
          { kind: 'marker', at: [2.8, 1], color: '#f0902f', size: 9, label: 'lost this one', labelAt: [1.0, 1.22] },
          { kind: 'marker', at: [cross(C), 0.5], color: '#f0902f', label: '2.94 cm', labelAt: [cross(C) + 0.3, 0.28] },
        ],
      },
    },
  ],
  edges: [],
}

import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TUMOURS, benign, malignant, model, W, B } from './_data'

// §03. Where the boundary actually is, and the fact that it is a statement about z rather than
// about the curve. The fitted model is drawn over the real tumours; the vertical rule sits at
// z = 0, i.e. x = -b/w, and that is the only place the answer flips. The two overlapping tumours
// stay wrong on purpose — a boundary that separated this data perfectly would be a lie about it.
const BOUNDARY = -B / W

export const theDecisionBoundary: Scene = {
  id: 'the-decision-boundary',
  title: 'The boundary is where z = 0, not where the curve bends',
  padding: 0.14,
  nodes: [
    {
      id: 'fit',
      kind: 'plot',
      label: `f(x) = g(${W}x − ${-B})`,
      sub: `z = 0 at x = ${BOUNDARY.toFixed(2)} cm — left of it predict benign, right of it malignant. Two cases sit on the wrong side; no vertical line here catches both`,
      pattern: 'user',
      plot: {
        x: { min: 0, max: 6, step: 1, label: 'tumour size (cm)' },
        y: { min: -0.08, max: 1.12, step: 0.25, label: 'P(y = 1)' },
        series: [
          { kind: 'line', points: sample(0, 6, 260, model), color: '#c98bff' },
          { kind: 'segment', from: [0, 0.5], to: [6, 0.5], color: '#4a525f' },
          { kind: 'segment', from: [BOUNDARY, -0.08], to: [BOUNDARY, 1.12], color: '#f0902f' },
          { kind: 'scatter', points: benign(TUMOURS), color: '#4f8ff7', label: 'benign', labelAt: [0.25, 0.14] },
          { kind: 'scatter', points: malignant(TUMOURS), color: '#f0656f', label: 'malignant', labelAt: [3.4, 0.86] },
          { kind: 'marker', at: [BOUNDARY, 0.5], color: '#f0902f', label: `x = ${BOUNDARY.toFixed(2)}`, labelAt: [BOUNDARY + 0.12, 0.34] },
        ],
      },
    },
  ],
  edges: [],
}

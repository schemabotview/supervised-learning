import type { Scene } from '@graphlearning/flow'
import { line, scatterAroundLine } from '../_curve'

// §04. The one split that decides everything downstream — what KIND of thing y is. Two plots, side
// by side, because the difference is visible and nothing else shows it as fast: on the left y is a
// position on an axis, on the right y is which side of a boundary you fall. Both plots are drawn by
// the engine from data alone; the only reason `equal` is set on the second is that its boundary is a
// distance, and a squashed aspect would make the margin a lie.
//
// STACKED, not side by side. The scene pane is very nearly square (~1110x1080 of a 1920 frame), so
// two plots in a row make a 1600x600 scene that fitView has to shrink to 0.69 to fit the WIDTH —
// which shrinks every tick label with it. Stacked, the same two plots make a tall scene that fits
// the height at ~0.9. Any multi-plot scene in this repo stacks for the same reason.
export const twoShapes: Scene = {
  id: 'two-shapes',
  title: 'Is y a number, or is y a category?',
  padding: 0.10,
  nodes: [
    {
      id: 'reg',
      kind: 'plot',
      label: 'Regression — y is a number',
      sub: 'how much? the answer lives anywhere on the axis',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 4, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: scatterAroundLine(14, 0.42, 1.1, 0.6, 4.7, 0.26, 11) },
          { kind: 'line', points: line(0.42, 1.1, 0, 5), color: '#f0902f', label: 'f(x)', labelAt: [3.4, 3.1] },
          { kind: 'marker', at: [3.2, 0.42 * 3.2 + 1.1], color: '#37b877', label: '≈ $245k', labelAt: [3.32, 2.08] },
        ],
      },
    },
    {
      id: 'cls',
      kind: 'plot',
      label: 'Classification — y is a label',
      sub: 'which one? the answer is a side of the line',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 6, step: 1, label: 'tumour size' },
        y: { min: 0, max: 6, step: 1, label: 'patient age (scaled)' },
        equal: true,
        series: [
          {
            kind: 'scatter',
            points: [[0.9, 1.5], [1.6, 2.3], [2.2, 1.2], [1.3, 3.1], [2.5, 2.5], [0.8, 2.1], [1.9, 1.7]],
            color: '#4f8ff7',
            label: 'benign',
            labelAt: [0.5, 0.55],
          },
          {
            kind: 'scatter',
            points: [[4.3, 4.1], [3.9, 5.0], [4.9, 3.7], [5.2, 4.9], [3.7, 4.4], [4.6, 5.3], [5.0, 4.2]],
            color: '#f0902f',
            label: 'malignant',
            labelAt: [3.9, 2.7],
          },
          { kind: 'line', points: [[0, 6], [6, 0]], color: '#9aa4b2', dashed: true },
        ],
      },
    },
  ],
  edges: [],
}

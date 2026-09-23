import type { Scene } from '@graphlearning/flow'
import { line, scatterAroundLine } from '../_curve'

// §07. What "learning" means, concretely: the model is one FORM with free numbers in it, and every
// choice of those numbers is a different line through the same points. Three candidates are drawn
// against one dataset — none of them is the algorithm, all of them are the model — so "training"
// stops being mysterious and becomes "pick w and b".
const data = scatterAroundLine(14, 0.42, 1.1, 0.6, 4.7, 0.26, 11)

export const choosingParameters: Scene = {
  id: 'choosing-parameters',
  title: 'The model is a shape. Learning picks the numbers.',
  padding: 0.16,
  nodes: [
    {
      id: 'candidates',
      kind: 'plot',
      label: 'f(x) = wx + b',
      sub: 'same form, three different (w, b) — only one of them fits',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 4, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: data, color: '#4f8ff7' },
          { kind: 'line', points: line(0.05, 2.2, 0, 5), color: '#9aa4b2', dashed: true, label: 'w = 0.05', labelAt: [3.9, 2.55] },
          { kind: 'line', points: line(0.95, 0.1, 0, 5), color: '#9aa4b2', dashed: true, label: 'w = 0.95', labelAt: [3.5, 3.45] },
          { kind: 'line', points: line(0.42, 1.1, 0, 5), color: '#f0902f', label: 'w = 0.42  ← the fit', labelAt: [2.5, 1.85] },
        ],
      },
    },
  ],
  edges: [],
}

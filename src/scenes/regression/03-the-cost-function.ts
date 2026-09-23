import type { Scene } from '@graphlearning/flow'
import { line } from '../_curve'
import { COST, HOUSES } from './_data'

// §03. The idea the course turns on, and the one most people slide past: J is a function of the
// PARAMETERS, not of the data. Left is (x, y) space — where the houses live. Right is (w, b) space
// — where the LINES live, one point per line. The same three candidate lines appear in both, so
// the reader can watch one object become a point in the other picture.
export const theCostFunction: Scene = {
  id: 'the-cost-function',
  title: 'A point in this picture is a whole line in that one',
  padding: 0.10,
  nodes: [
    {
      id: 'lines',
      kind: 'plot',
      label: 'Data space — the houses',
      sub: 'three candidate lines through one dataset',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 4, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: HOUSES, color: '#4f8ff7' },
          { kind: 'line', points: line(0.2, 1.5, 0, 5), color: '#9aa4b2', dashed: true, label: 'too flat', labelAt: [3.5, 2.35] },
          { kind: 'line', points: line(0.9, 0.2, 0, 5), color: '#9aa4b2', dashed: true, label: 'too steep', labelAt: [3.2, 3.35] },
          { kind: 'line', points: line(COST.wMin, COST.bMin, 0, 5), color: '#f0902f', label: 'best', labelAt: [4.1, 2.6] },
        ],
      },
    },
    {
      id: 'params',
      kind: 'plot',
      label: 'Parameter space — the lines',
      sub: 'the SAME three lines, one dot each; J(w, b) is defined over this plane',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 1.2, step: 0.2, label: 'w' },
        y: { min: 0, max: 2, step: 0.5, label: 'b' },
        series: [
          { kind: 'marker', at: [0.2, 1.5], color: '#9aa4b2', label: 'too flat', labelAt: [0.23, 1.5] },
          { kind: 'marker', at: [0.9, 0.2], color: '#9aa4b2', label: 'too steep', labelAt: [0.93, 0.2] },
          { kind: 'marker', at: [COST.wMin, COST.bMin], color: '#f0902f', label: 'best', labelAt: [COST.wMin + 0.03, COST.bMin] },
        ],
      },
    },
  ],
  edges: [],
}

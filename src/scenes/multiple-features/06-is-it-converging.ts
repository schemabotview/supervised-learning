import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'

// §06. The learning curve as a DIAGNOSTIC, one panel per failure mode. This is the picture that
// replaces the contour map for the rest of the reader's life, so each shape is given a name and a
// prescription rather than being left as "looks wrong".
//
// Four plots, stacked in two rows of two: they are small, simple curves rather than dense figures,
// so a grid reads here where it would not for a detailed plot. The window is identical in all four
// — the comparison is the SHAPE, and four different y-ranges would flatten it.
const ax = {
  x: { min: 0, max: 100, step: 25, label: 'iteration' },
  y: { min: 0, max: 1, step: 0.25, label: 'J' },
} as const

export const isItConverging: Scene = {
  id: 'is-it-converging',
  title: 'Four shapes, four prescriptions',
  cols: 2,
  padding: 0.07,
  nodes: [
    {
      id: 'good',
      kind: 'plot',
      label: 'Converged',
      sub: 'down, then flat — stop here',
      pattern: 'storage',
      plot: { ...ax, series: [{ kind: 'line', points: sample(0, 100, 120, (i) => 0.06 + 0.84 * Math.exp(-i / 14)), color: '#37b877' }] },
    },
    {
      id: 'slow',
      kind: 'plot',
      label: 'Still falling',
      sub: 'not finished — run it longer, or raise α',
      pattern: 'network',
      plot: { ...ax, series: [{ kind: 'line', points: sample(0, 100, 120, (i) => 0.06 + 0.84 * Math.exp(-i / 220)), color: '#4f8ff7' }] },
    },
    {
      id: 'diverge',
      kind: 'plot',
      label: 'Rising',
      sub: 'α is too large — drop it by 10×',
      pattern: 'warn',
      plot: { ...ax, series: [{ kind: 'line', points: sample(0, 100, 120, (i) => 0.12 * Math.exp(i / 42)), color: '#f0656f' }] },
    },
    {
      id: 'osc',
      kind: 'plot',
      label: 'Sawing up and down',
      sub: 'α is near the edge — halve it, or check the scaling',
      pattern: 'warn',
      plot: {
        ...ax,
        series: [{ kind: 'line', points: sample(0, 100, 300, (i) => 0.1 + 0.55 * Math.exp(-i / 60) * (1 + 0.85 * Math.cos(i / 1.6))), color: '#f0902f' }],
      },
    },
  ],
  edges: [],
}

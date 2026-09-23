import type { Scene } from '@graphlearning/flow'
import { line } from '../_curve'
import { HOUSES } from './_data'

// §02. What "wrong" means, made visible before it is made arithmetic. Every vertical stick is one
// residual — the gap this line leaves on one house — and the section's claim is that the whole of
// the rest of the course is about one number summarising all twelve sticks.
//
// The sticks are drawn against a DELIBERATELY BAD line, not the fitted one. Against the best fit
// the residuals are short enough to be decorative; against a line that is visibly too flat they are
// the content, which is what the slide is actually about.
const W_BAD = 0.2
const B_BAD = 1.5

export const theResidual: Scene = {
  id: 'the-residual',
  title: 'The gap, one house at a time',
  padding: 0.14,
  nodes: [
    {
      id: 'resid',
      kind: 'plot',
      label: 'Residual = f(x⁽ⁱ⁾) − y⁽ⁱ⁾',
      sub: 'twelve gaps, one per house — the model has to answer for all of them at once',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 4, step: 1, label: 'price ($100k)' },
        series: [
          ...HOUSES.map((p) => ({
            kind: 'segment' as const,
            from: p,
            to: [p[0], W_BAD * p[0] + B_BAD] as [number, number],
            color: '#f0656f',
          })),
          { kind: 'line', points: line(W_BAD, B_BAD, 0, 5), color: '#9aa4b2', label: 'a bad line', labelAt: [3.6, 2.45] },
          { kind: 'scatter', points: HOUSES, color: '#4f8ff7', label: 'what actually sold', labelAt: [0.3, 3.6] },
        ],
      },
    },
  ],
  edges: [],
}

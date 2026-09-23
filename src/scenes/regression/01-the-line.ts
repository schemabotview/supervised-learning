import type { Scene } from '@graphlearning/flow'
import { line } from '../_curve'
import { HOUSES, W_FIT, B_FIT } from './_data'

// §01. The model, stated against the data it will be fitted to, before any of the machinery. The
// dashed guides are the whole point of the section: a prediction is READ OFF the line, and that
// reading is the only thing the next nine sections are trying to make good.
export const theLine: Scene = {
  id: 'the-line',
  title: 'One line, and a price you can read off it',
  padding: 0.14,
  nodes: [
    {
      id: 'fit',
      kind: 'plot',
      label: 'f(x) = wx + b',
      sub: 'w = 0.45 (slope) · b = 1.08 (intercept)',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'size (1000 ft²)' },
        y: { min: 0, max: 4, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: HOUSES, color: '#4f8ff7', label: 'sold', labelAt: [0.3, 3.6] },
          { kind: 'line', points: line(W_FIT, B_FIT, 0, 5), color: '#f0902f' },
          // Reading a prediction: across from the size, up to the line, over to the price.
          { kind: 'segment', from: [3.4, 0], to: [3.4, W_FIT * 3.4 + B_FIT], color: '#37b877' },
          { kind: 'segment', from: [0, W_FIT * 3.4 + B_FIT], to: [3.4, W_FIT * 3.4 + B_FIT], color: '#37b877' },
          { kind: 'marker', at: [3.4, W_FIT * 3.4 + B_FIT], color: '#37b877', label: '$261k', labelAt: [3.5, 2.35] },
        ],
      },
    },
  ],
  edges: [],
}

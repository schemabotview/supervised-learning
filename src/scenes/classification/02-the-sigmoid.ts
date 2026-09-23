import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { sigmoid } from './_data'

// §02. The function that makes the whole thing work, shown as the shape it is before it is applied
// to anything. The three marked points are the three facts worth memorising — g(0) = 0.5, and the
// two saturating tails — because everything in §05-07 follows from them.
export const theSigmoid: Scene = {
  id: 'the-sigmoid',
  title: 'Any real number in, a probability out',
  flow: 'TB',
  padding: 0.09,
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'g(z) = 1 / (1 + e⁻ᶻ)',
      sub: 'never reaches 0, never reaches 1, crosses 0.5 at exactly z = 0',
      pattern: 'user',
      plot: {
        x: { min: -8, max: 8, step: 2, label: 'z' },
        y: { min: 0, max: 1, step: 0.25, label: 'g(z)' },
        series: [
          { kind: 'line', points: sample(-8, 8, 240, sigmoid), color: '#c98bff' },
          { kind: 'segment', from: [-8, 0.5], to: [8, 0.5], color: '#4a525f' },
          { kind: 'marker', at: [0, 0.5], color: '#f0902f', label: 'g(0) = 0.5', labelAt: [0.3, 0.42] },
          { kind: 'marker', at: [-6, sigmoid(-6)], color: '#4f8ff7', label: 'z → −∞ : g → 0', labelAt: [-5.6, 0.11] },
          { kind: 'marker', at: [6, sigmoid(6)], color: '#f0656f', label: 'z → +∞ : g → 1', labelAt: [1.5, 0.92] },
        ],
      },
    },
    {
      id: 'wire',
      label: 'Where it goes',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'w-x', label: 'x', sub: 'the features', pattern: 'storage', icon: 'table' },
        { id: 'w-z', label: 'z = w·x + b', sub: 'any real number', pattern: 'network', icon: 'sigma' },
        { id: 'w-g', label: 'g(z)', sub: 'squashed into (0, 1)', pattern: 'user', icon: 'waves' },
        { id: 'w-p', label: 'P(y = 1)', sub: 'read as a probability', pattern: 'service', icon: 'gauge' },
      ],
      edges: [
        { source: 'w-x', target: 'w-z' },
        { source: 'w-z', target: 'w-g' },
        { source: 'w-g', target: 'w-p' },
      ],
    },
  ],
  edges: [{ source: 'curve', target: 'wire', label: 'the same linear model, wrapped' }],
}

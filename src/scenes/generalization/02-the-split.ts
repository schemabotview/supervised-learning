import type { Scene } from '@graphlearning/flow'
import { ALL, TRAIN, VAL, TEST } from './_data'

// §02. The split, drawn on the actual rows so the reader can see that all three cover the whole
// size range. That is the load-bearing detail: a contiguous split hands validation only the large
// houses, and every score afterwards measures extrapolation instead of generalization.
export const theSplit: Scene = {
  id: 'the-split',
  title: 'Three splits, three different jobs',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'rows',
      kind: 'plot',
      label: `${ALL.length} houses, cut three ways`,
      sub: `train ${TRAIN.length} · validation ${VAL.length} · test ${TEST.length} — each one spans the whole size range, which is the point`,
      pattern: 'user',
      plot: {
        x: { min: 0.2, max: 4.9, step: 1, label: 'size (1000 ft²)' },
        y: { min: 1, max: 5, step: 1, label: 'price ($100k)' },
        series: [
          { kind: 'scatter', points: TRAIN, color: '#4f8ff7', size: 6 },
          { kind: 'scatter', points: VAL, color: '#f0902f', size: 8 },
          { kind: 'scatter', points: TEST, color: '#c98bff', size: 8 },
          // Direct labels, each pinned to one real row of its own split rather than collected into a
          // legend. The three colours interleave along a single diagonal, so the labels sit in the
          // empty wedges either side of it and point at a specific house.
          { kind: 'marker', at: [0.951, 2.088], color: '#4f8ff7', size: 9, label: 'train', labelAt: [0.55, 2.5] },
          { kind: 'marker', at: [2.826, 4.084], color: '#f0902f', size: 10, label: 'validation', labelAt: [1.85, 4.32] },
          { kind: 'marker', at: [3.046, 3.733], color: '#c98bff', size: 10, label: 'test', labelAt: [3.25, 3.28] },
        ],
      },
    },
    {
      id: 'jobs',
      label: 'What each one is allowed to do',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'j-tr', label: 'Train', sub: 'fits w and b', pattern: 'network', icon: 'sliders' },
        { id: 'j-va', label: 'Validation', sub: 'picks degree and λ', pattern: 'user', icon: 'scale' },
        { id: 'j-te', label: 'Test', sub: 'read once, at the end', pattern: 'storage', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'rows', target: 'jobs', label: 'one job each' }],
}

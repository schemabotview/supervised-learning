import type { Scene } from '@graphlearning/flow'
import { costContour, descentPath } from '../_curve'
import { COST, HOUSES } from './_data'

// §09. Both parameters descending at once, on the contour map from §05. The path is a REAL run of
// the real update rule on the real data, so its shape is evidence rather than illustration.
//
// The numbers were chosen against the rendered frame, not guessed. Three things had to hold at once:
//   · the whole path stays inside the window (α = 0.02 from (0.25, 0.45) does; larger rates shoot
//     past the valley and leave the frame on the first step),
//   · the dash down to the valley floor gets enough iterations to read as a CURVE rather than as one
//     straight segment and an elbow — which is what α = 0.09 drew,
//   · the contour levels fit the window: level 0.06 runs out to b ≈ 1.9 and was clipped, so the
//     rings stop at 0.035.
// `equal` is kept even though it forces a tall, narrow plot: the stretch of these ellipses IS the
// point of the figure, and a squashed aspect would draw a rounder bowl than the data has.
const PATH = descentPath(HOUSES, 0.02, 200, 0.25, 0.45)
const LEVELS = [0.005, 0.01, 0.02, 0.035]

// The convergence panel shows the first FORTY of those two hundred iterations. Over the full run the
// curve is a vertical drop and then a flat line — J falls from 0.72 to 0.02 inside twenty steps and
// then creeps — so plotting all 200 hides the only part with any shape in it.
const HEAD = 40

export const runningIt: Scene = {
  id: 'running-it',
  title: 'The walk, and the curve you actually watch',
  padding: 0.11,
  nodes: [
    {
      id: 'walk',
      kind: 'plot',
      label: 'The path across the contours',
      sub: 'a dash to the valley floor, then a long crawl along it',
      pattern: 'storage',
      plot: {
        x: { min: 0.2, max: 0.8, step: 0.1, label: 'w' },
        y: { min: 0.35, max: 1.75, step: 0.2, label: 'b' },
        equal: true,
        series: [
          ...LEVELS.map((l, i) => ({ kind: 'line' as const, points: costContour(COST, l), color: '#2f6f4d', dashed: i % 2 === 1 })),
          { kind: 'line', points: PATH, color: '#f0902f' },
          { kind: 'marker', at: PATH[0], color: '#4f8ff7', label: 'start', labelAt: [0.27, 0.45] },
          { kind: 'marker', at: PATH[PATH.length - 1], color: '#c98bff', label: 'after 200', labelAt: [0.58, 0.8] },
          { kind: 'marker', at: [COST.wMin, COST.bMin], color: '#f0656f', label: 'the minimum', labelAt: [0.49, 1.06] },
        ],
      },
    },
    {
      id: 'conv',
      kind: 'plot',
      label: 'The same run, as J against iteration',
      sub: 'the first 40 steps — nearly all of the gain is in the first twenty',
      pattern: 'network',
      plot: {
        x: { min: 0, max: HEAD, step: 10, label: 'iteration' },
        y: { min: 0, max: 0.8, step: 0.2, label: 'J(w, b)' },
        series: [
          { kind: 'line', points: PATH.slice(0, HEAD + 1).map(([w, b], i) => [i, COST.at(w, b)] as [number, number]), color: '#4f8ff7' },
        ],
      },
    },
  ],
  edges: [],
}

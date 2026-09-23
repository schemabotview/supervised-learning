import type { Scene } from '@graphlearning/flow'
import { DEPTH_SWEEP } from './_models'
import { countLeaves } from './_tree'

// §05. A tree left alone will not stop until every leaf is pure, and on 999 rows with two continuous
// columns it can always get there — so the only thing standing between you and a lookup table of the
// training set is a stopping rule you chose.
//
// The curve is course 5's overfitting picture again, on purpose, and the reader should recognise it.
// What is new is that the knob is DISCRETE and structural rather than a continuous penalty: you are
// not shrinking parameters, you are refusing to ask another question.
//
// Two honest wrinkles left in rather than tuned away. At depth 2 validation accuracy sits ABOVE
// training accuracy, which is not a bug — with four leaves the tree is so coarse that which split of
// 1,500 rows lands higher is luck. And depth 3 dips below depth 2 before the curve resumes climbing,
// because the third question is spent on a distinction that does not generalise. Real validation
// curves are not smooth, and the SHAPE is the content: a rise, a peak, and a long decline while
// training accuracy walks off to 1.
const pts = (k: 'train' | 'val') => DEPTH_SWEEP.map((d) => [d.depth, d[k]] as [number, number])
const peak = DEPTH_SWEEP.reduce((a, b) => (b.val > a.val ? b : a))
const last = DEPTH_SWEEP[DEPTH_SWEEP.length - 1]

export const whenToStop: Scene = {
  id: 'when-to-stop',
  title: 'Nothing stops it except you',
  padding: 0.12,
  nodes: [
    {
      id: 'depth',
      kind: 'plot',
      label: 'Accuracy against how deep the tree is allowed to go',
      sub: `peak at depth ${peak.depth} (${countLeaves(peak.tree)} leaves) · by depth ${last.depth} it has ${countLeaves(last.tree)} leaves and has learned the training set instead of the airport`,
      pattern: 'user',
      plot: {
        x: { min: 0, max: 17, step: 2, label: 'max depth' },
        y: { min: 0.65, max: 1.0, step: 0.05, label: 'accuracy' },
        series: [
          { kind: 'line', points: pts('train'), color: '#4f8ff7', label: 'training', labelAt: [12.2, 0.925] },
          { kind: 'line', points: pts('val'), color: '#f0656f', label: 'held out', labelAt: [12.4, 0.762] },
          { kind: 'marker', at: [peak.depth, peak.val], color: '#37b877', size: 9, label: `stop here: ${peak.val.toFixed(3)}`, labelAt: [6.3, 0.772] },
        ],
      },
    },
    {
      id: 'knobs',
      kind: 'table',
      label: 'Four ways to say when',
      sub: 'the first two are guesses you tune on the validation set · the last one is the principled version, and it is what a library does by default',
      pattern: 'network',
      headers: ['knob', 'what it refuses', 'how it fails'],
      values: [
        ['max_depth', 'any question past level k', 'blunt — cuts a good branch to reach a bad one'],
        ['min_samples_leaf', 'a leaf holding too few rows', 'the usual first thing to reach for'],
        ['min_impurity_decrease', 'a split that buys too little', 'short-sighted: two poor splits can beat one'],
        ['ccp_alpha — prune after', 'grow fully, then cut back', 'the one that handles the case above'],
      ],
    },
  ],
  edges: [],
}

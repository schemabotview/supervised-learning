import type { Scene } from '@graphlearning/flow'
import { COLUMNS } from './_data'
import { MAX_FEATURES_SWEEP } from './_models'

// §09. Why bagging alone was disappointing, and the one-line fix. §08's bag of 80 recovered barely a
// point, and the reason is visible in §04: two columns dominate every split, so every bootstrap tree
// finds the same structure and averaging near-identical trees averages nothing.
//
// The sweep is the whole section. k = 6 is bagging — every column available at every split — and it
// is the WORST setting on this data. Forcing each split to choose from two columns at random makes
// the trees genuinely different, and the vote gets something to cancel. Note the training column
// alongside: the restriction makes each individual tree worse at the training set (0.985 → 0.888)
// and the ensemble better at the held-out set, which is the bias-variance trade in one line.
const pts = (k: 'train' | 'val') => MAX_FEATURES_SWEEP.map((s) => [s.k, s[k]] as [number, number])
// Marked at k = 2 — the classification default, √6 rounded down — rather than at the literal
// maximum, which lands at k = 4. The caption says 2 through 4 are tied within noise, and putting a
// "best" marker on one of three indistinguishable points would contradict it on the frame.
const marked = MAX_FEATURES_SWEEP.find((s) => s.k === 2)!
const bagging = MAX_FEATURES_SWEEP[MAX_FEATURES_SWEEP.length - 1]

export const randomForests: Scene = {
  id: 'random-forests',
  title: 'Make the trees worse on purpose, so they stop agreeing',
  padding: 0.12,
  nodes: [
    {
      id: 'sweep',
      kind: 'plot',
      label: 'How many of the 6 columns each split is allowed to look at',
      sub: `k = ${COLUMNS.length} is bagging, and it is the worst setting here · anything from 2 to 4 works, and the gap between those three is noise on 501 flights`,
      pattern: 'user',
      plot: {
        x: { min: 0.5, max: 6.5, step: 1, label: 'max_features (columns offered at each split)' },
        y: { min: 0.75, max: 1.0, step: 0.05, label: 'accuracy' },
        series: [
          { kind: 'line', points: pts('train'), color: '#4f8ff7', label: 'training', labelAt: [3.2, 0.972] },
          { kind: 'line', points: pts('val'), color: '#f0656f', label: 'held out', labelAt: [3.15, 0.806] },
          { kind: 'marker', at: [marked.k, marked.val], color: '#37b877', size: 9, label: `√6 → 2 · ${marked.val.toFixed(3)}`, labelAt: [2.15, marked.val + 0.016] },
          { kind: 'marker', at: [bagging.k, bagging.val], color: '#f0902f', size: 9, label: 'this is bagging', labelAt: [4.5, 0.802] },
        ],
      },
    },
    {
      id: 'why',
      label: 'Two sources of difference, not one',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-rows', label: 'Different rows', sub: 'bagging does this alone', pattern: 'service', icon: 'table' },
        { id: 'w-cols', label: 'Different columns', sub: 'a fresh draw per split', pattern: 'network', icon: 'boxes' },
        { id: 'w-corr', label: 'Less agreement', sub: 'so the vote has work to do', pattern: 'user', icon: 'sortarrows' },
        { id: 'w-cost', label: 'Each tree weaker', sub: 'and the ensemble stronger', pattern: 'user', icon: 'scale' },
      ],
    },
  ],
  edges: [],
}
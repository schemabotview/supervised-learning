import type { Scene } from '@graphlearning/flow'
import { TRAIN, VAL } from './_data'
import { BAGGED, BOOSTED, BOOST_RATE, BOOST_ROUNDS, DEEP_TREE, FOREST } from './_models'
import { accuracy, boostedAccuracy, forestAccuracy, yLate } from './_tree'

// §10. The other way to use many trees, and the opposite idea. A forest builds its trees in parallel
// and independently, then averages away their variance. Boosting builds them in sequence, each one
// fitted to the residual the ensemble so far still carries, and reduces BIAS — which is why its
// trees are stumps rather than fully-grown, and why it can overfit in a way a forest mostly does not.
//
// The curve is worth its space for two features that surprise people. It is FLAT for the first three
// rounds: with a learning rate of 0.3 and depth-2 trees the log-odds has barely moved off the base
// rate, so every flight is still predicted on-time and accuracy sits at exactly 1 − 0.367. And after
// the peak it declines, slowly, while training accuracy keeps climbing — boosting does overfit, it
// just takes its time about it, which is precisely why the number of rounds is the hyperparameter
// that matters and why every library implements early stopping.
const ROUNDS = [1, 2, 3, 4, 5, 6, 8, 10, 14, 20, 26, 34, 42, 50, 60, 72, 84, 96, 108, 120]
const pts = (rows: typeof TRAIN) =>
  ROUNDS.map((r) => [r, boostedAccuracy(BOOSTED, rows, r)] as [number, number])
const valPts = pts(VAL)
const peak = valPts.reduce((a, b) => (b[1] > a[1] ? b : a))

export const boosting: Scene = {
  id: 'boosting',
  title: 'Each tree fitted to what the last ones still get wrong',
  padding: 0.12,
  nodes: [
    {
      id: 'rounds',
      kind: 'plot',
      label: `Accuracy against the number of trees, added one at a time`,
      sub: `depth-2 stumps, learning rate ${BOOST_RATE} · flat for three rounds, because the ensemble has not yet moved a single flight past 0.5`,
      pattern: 'user',
      plot: {
        x: { min: 0, max: 124, step: 20, label: 'boosting rounds' },
        y: { min: 0.6, max: 0.92, step: 0.05, label: 'accuracy' },
        series: [
          { kind: 'line', points: pts(TRAIN), color: '#4f8ff7', label: 'training', labelAt: [86, 0.872] },
          { kind: 'line', points: valPts, color: '#f0656f', label: 'held out', labelAt: [88, 0.795] },
          { kind: 'segment', from: [0, 1 - 0.367], to: [124, 1 - 0.367], color: '#5a6170', dashed: true, label: 'predict "on time" for everything', labelAt: [30, 0.608] },
          { kind: 'marker', at: peak, color: '#37b877', size: 9, label: `peak at round ${peak[0]}`, labelAt: [44, 0.858] },
        ],
      },
    },
    {
      id: 'final',
      kind: 'table',
      label: 'Every model in this course, on the same 501 held-out flights',
      sub: 'one tree is interpretable and worst · the two ensembles are neither, and are what you would actually ship',
      pattern: 'network',
      headers: ['model', 'trees', 'built', 'held-out accuracy'],
      values: [
        ['one tree, depth 12', '1', 'once', accuracy(DEEP_TREE, VAL, yLate).toFixed(3)],
        ['bagging', '80', 'in parallel, independently', forestAccuracy(BAGGED, VAL, yLate).toFixed(3)],
        ['random forest', '80', 'in parallel, 2 columns per split', forestAccuracy(FOREST, VAL, yLate).toFixed(3)],
        [`boosting (${peak[0]} rounds)`, String(peak[0]), 'in sequence, on the residual', peak[1].toFixed(3)],
        [`boosting (all ${BOOST_ROUNDS})`, String(BOOST_ROUNDS), `${BOOST_ROUNDS - peak[0]} rounds past the peak`, boostedAccuracy(BOOSTED, VAL).toFixed(3)],
      ],
    },
  ],
  edges: [],
}

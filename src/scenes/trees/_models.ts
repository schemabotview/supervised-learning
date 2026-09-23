// The models the course actually talks about, fitted ONCE here and imported by the scenes that
// quote them.
//
// Two reasons this is a module rather than a line in each scene. The first is consistency: §08, §09
// and §10 all compare against "one tree", and if each of them grew its own, a later change to the
// depth would silently make three frames disagree with each other. The second is cost — a forest is
// eighty trees, and building it per scene made the dev server's hot reload take long enough to be
// annoying.
import { COLUMNS, TRAIN, VAL } from './_data'
import {
  accuracy, boost, buildForest, buildTree, bootstrap, classify, entropyImpurity, forestAccuracy,
  varianceImpurity, yLate, yMinutes, type TreeNode,
} from './_tree'
import { rng } from '../_curve'

/** The depth every ensemble section grows its trees to. Deep on purpose: bagging and forests exist
 *  to absorb the variance of a tree that has been allowed to go all the way, so a pre-pruned tree
 *  would understate what they buy. */
export const ENSEMBLE_DEPTH = 12
export const ENSEMBLE_MIN_SPLIT = 2

const clfOpts = { maxDepth: ENSEMBLE_DEPTH, minSamplesSplit: ENSEMBLE_MIN_SPLIT, y: yLate, impurity: entropyImpurity }

/** One fully-grown tree on all the training data — the baseline §08-10 measure against. */
export const DEEP_TREE: TreeNode = buildTree(TRAIN, clfOpts)

/** The depth sweep §05 plots: how train and validation accuracy move apart as the tree is let go. */
export const DEPTHS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16]
export const DEPTH_SWEEP = DEPTHS.map((d) => {
  const tree = buildTree(TRAIN, { ...clfOpts, maxDepth: d })
  return { depth: d, tree, train: accuracy(tree, TRAIN, yLate), val: accuracy(tree, VAL, yLate) }
})

/** Eight trees on eight bootstrap resamples — §08's instability, measured rather than asserted. */
export const BOOTSTRAP_TREES: TreeNode[] = (() => {
  const r = rng(9)
  return Array.from({ length: 8 }, () => buildTree(bootstrap(TRAIN, r), clfOpts))
})()

/** How often two of those trees give different answers on the same validation row. */
export const PAIRWISE_DISAGREEMENT = (() => {
  let total = 0
  let pairs = 0
  for (let i = 0; i < BOOTSTRAP_TREES.length; i++) {
    for (let j = i + 1; j < BOOTSTRAP_TREES.length; j++) {
      total += VAL.filter((f) => classify(BOOTSTRAP_TREES[i], f) !== classify(BOOTSTRAP_TREES[j], f)).length / VAL.length
      pairs++
    }
  }
  return total / pairs
})()

/** Bagging: every column available at every split. */
export const BAGGED = buildForest(TRAIN, 80, clfOpts)
/** A random forest: the same thing with each split restricted to two columns. */
export const FOREST = buildForest(TRAIN, 80, { ...clfOpts, maxFeatures: 2 })

/** §09's sweep — the one knob that separates bagging from a forest. */
export const MAX_FEATURES_SWEEP = [1, 2, 3, 4, 5, 6].map((k) => {
  const e = buildForest(TRAIN, 40, { ...clfOpts, maxFeatures: k })
  return { k, train: forestAccuracy(e, TRAIN, yLate), val: forestAccuracy(e, VAL, yLate) }
})

/** §10. Shallow trees, each fitted to what the ensemble so far still gets wrong. 120 rounds rather
 *  than the 60 it takes to reach the peak, because the twenty rounds after the peak are the section:
 *  boosting overfits too, slowly, and a curve cut off while it is still rising would hide that. */
export const BOOST_ROUNDS = 120
export const BOOST_RATE = 0.3
export const BOOSTED = boost(TRAIN, BOOST_ROUNDS, BOOST_RATE, 2)

/** §07. A regression tree on `depHour` ALONE, so its prediction can be drawn as a step function
 *  against the one axis the scatter is plotted on. */
export const STEP_TREE = buildTree(TRAIN, {
  maxDepth: 3,
  minSamplesSplit: 20,
  y: yMinutes,
  impurity: varianceImpurity,
  columns: [COLUMNS[0]],
})

/** §07's full regression tree, for the depth-against-RMSE comparison. */
export const REGRESSION_DEPTHS = [1, 2, 3, 4, 5, 6, 8, 10, 12]

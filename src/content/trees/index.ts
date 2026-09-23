import type { Course } from '../types'
import { theTreeModel } from './01-the-tree-model'
import { howASplitIsChosen } from './02-how-a-split-is-chosen'
import { measuringPurity } from './03-measuring-purity'
import { informationGain } from './04-information-gain'
import { whenToStop } from './05-when-to-stop'
import { categoricalAndContinuous } from './06-categorical-and-continuous'
import { regressionTrees } from './07-regression-trees'
import { whyManyTrees } from './08-why-many-trees'
import { randomForests } from './09-random-forests'
import { boosting } from './10-boosting'

// trees — course 07 of the seven-course supervised-learning spine, and the last of them. Ten
// sections, ten scenes, one worked dataset: 1,500 departures on a small regional airline, carrying
// BOTH targets — `late` for §01-06 and §08-10, `minutes` for §07.
//
// The course is built around one number. §04 finds that the root split beats its nearest rival by
// 0.0005 bits, which is to say the tree chose between two completely different explanations of
// flight delay by a margin indistinguishable from nothing. §08 draws eight bootstrap trees and shows
// four different roots; §09 shows that decorrelating them deliberately is worth more than
// resampling alone; §10 shows the other way to spend many trees. Everything after §04 is a
// consequence of that margin, and it was made real in the data rather than described.
//
// §01-02 are the model and the search — a tree is the only model in this repo a reader can execute
// on paper, so it is shown working before anything explains it. §03-04 open the `better()` box the
// search left undefined. §05 is course 5's overfitting curve with a structural knob instead of a
// penalty. §06-07 are the two boundaries of the method: what a split can ask about, and what changes
// when the target is a number.
export const trees: Course = {
  id: 'trees',
  title: 'Decision Trees and Ensembles',
  sections: [
    theTreeModel,
    howASplitIsChosen,
    measuringPurity,
    informationGain,
    whenToStop,
    categoricalAndContinuous,
    regressionTrees,
    whyManyTrees,
    randomForests,
    boosting,
  ],
}

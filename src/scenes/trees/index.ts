import type { Scene } from '@graphlearning/flow'
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

export const treesScenes: Scene[] = [
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
]

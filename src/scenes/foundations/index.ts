import type { Scene } from '@graphlearning/flow'
import { rulesVsFit } from './01-rules-vs-fit'
import { rulesThatKeepGrowing } from './02-rules-that-keep-growing'
import { labelledPairs } from './03-labelled-pairs'
import { twoShapes } from './04-two-shapes'
import { noLabels } from './05-no-labels'
import { trainingSetNotation } from './06-training-set-notation'
import { choosingParameters } from './07-choosing-parameters'
import { theLearningLoop } from './08-the-learning-loop'
import { theOnlyScore } from './09-the-only-score'
import { theArc } from './10-the-arc'

export const foundationsScenes: Scene[] = [
  rulesVsFit,
  rulesThatKeepGrowing,
  labelledPairs,
  twoShapes,
  noLabels,
  trainingSetNotation,
  choosingParameters,
  theLearningLoop,
  theOnlyScore,
  theArc,
]

import type { Scene } from '@graphlearning/flow'
import { underfitAndOverfit } from './01-underfit-and-overfit'
import { theSplit } from './02-the-split'
import { biasAndVariance } from './03-bias-and-variance'
import { learningCurves } from './04-learning-curves'
import { aBaseline } from './05-a-baseline'
import { regularization } from './06-regularization'
import { regularizedRegression } from './07-regularized-regression'
import { choosingLambda } from './08-choosing-lambda'
import { theDiagnosisTable } from './09-the-diagnosis-table'

export const generalizationScenes: Scene[] = [
  underfitAndOverfit,
  theSplit,
  biasAndVariance,
  learningCurves,
  aBaseline,
  regularization,
  regularizedRegression,
  choosingLambda,
  theDiagnosisTable,
]

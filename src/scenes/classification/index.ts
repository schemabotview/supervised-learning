import type { Scene } from '@graphlearning/flow'
import { whyNotALine } from './01-why-not-a-line'
import { theSigmoid } from './02-the-sigmoid'
import { theDecisionBoundary } from './03-the-decision-boundary'
import { nonLinearBoundaries } from './04-non-linear-boundaries'
import { whyNotSquaredError } from './05-why-not-squared-error'
import { logLoss } from './06-log-loss'
import { theSimplifiedCost } from './07-the-simplified-cost'
import { gradientDescentAgain } from './08-gradient-descent-again'
import { thresholds } from './09-thresholds'
import { withScikitLearn } from './10-with-scikit-learn'

export const classificationScenes: Scene[] = [
  whyNotALine,
  theSigmoid,
  theDecisionBoundary,
  nonLinearBoundaries,
  whyNotSquaredError,
  logLoss,
  theSimplifiedCost,
  gradientDescentAgain,
  thresholds,
  withScikitLearn,
]

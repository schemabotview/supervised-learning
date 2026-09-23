import type { Scene } from '@graphlearning/flow'
import { theLine } from './01-the-line'
import { theResidual } from './02-the-residual'
import { theCostFunction } from './03-the-cost-function'
import { costInOneParameter } from './04-cost-in-one-parameter'
import { theCostSurface } from './05-the-cost-surface'
import { gradientDescent } from './06-gradient-descent'
import { theLearningRate } from './07-the-learning-rate'
import { theDerivative } from './08-the-derivative'
import { runningIt } from './09-running-it'
import { normalEquation } from './10-normal-equation'

export const regressionScenes: Scene[] = [
  theLine,
  theResidual,
  theCostFunction,
  costInOneParameter,
  theCostSurface,
  gradientDescent,
  theLearningRate,
  theDerivative,
  runningIt,
  normalEquation,
]

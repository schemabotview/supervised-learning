import type { Scene } from '@graphlearning/flow'
import { moreColumns } from './01-more-columns'
import { vectorization } from './02-vectorization'
import { gradientDescentForMany } from './03-gradient-descent-for-many'
import { featureScaling } from './04-feature-scaling'
import { howToScale } from './05-how-to-scale'
import { isItConverging } from './06-is-it-converging'
import { featureEngineering } from './07-feature-engineering'
import { polynomialRegression } from './08-polynomial-regression'
import { withScikitLearn } from './09-with-scikit-learn'

export const multipleFeaturesScenes: Scene[] = [
  moreColumns,
  vectorization,
  gradientDescentForMany,
  featureScaling,
  howToScale,
  isItConverging,
  featureEngineering,
  polynomialRegression,
  withScikitLearn,
]

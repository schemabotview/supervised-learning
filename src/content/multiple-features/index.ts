import type { Course } from '../types'
import { moreColumns } from './01-more-columns'
import { vectorization } from './02-vectorization'
import { gradientDescentForMany } from './03-gradient-descent-for-many'
import { featureScaling } from './04-feature-scaling'
import { howToScale } from './05-how-to-scale'
import { isItConverging } from './06-is-it-converging'
import { featureEngineering } from './07-feature-engineering'
import { polynomialRegression } from './08-polynomial-regression'
import { withScikitLearn } from './09-with-scikit-learn'

// multiple-features — course 03 of the seven-course supervised-learning spine. Nine sections, nine
// scenes.
//
// The spine of the course is that widening the model costs almost nothing mathematically (§01-03: a
// subscript, and a dot product) and a great deal practically (§04-06: the geometry goes wrong, and
// here is how to see it). §07-08 are the payoff — once the model takes arbitrary columns, you get to
// CHOOSE them — and §08 ends by setting up overfitting rather than resolving it, because the answer
// is a whole course.
export const multipleFeatures: Course = {
  id: 'multiple-features',
  title: 'Many Features at Once',
  sections: [
    moreColumns,
    vectorization,
    gradientDescentForMany,
    featureScaling,
    howToScale,
    isItConverging,
    featureEngineering,
    polynomialRegression,
    withScikitLearn,
  ],
}

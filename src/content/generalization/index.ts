import type { Course } from '../types'
import { underfitAndOverfit } from './01-underfit-and-overfit'
import { theSplit } from './02-the-split'
import { biasAndVariance } from './03-bias-and-variance'
import { learningCurves } from './04-learning-curves'
import { aBaseline } from './05-a-baseline'
import { regularization } from './06-regularization'
import { regularizedRegression } from './07-regularized-regression'
import { choosingLambda } from './08-choosing-lambda'
import { theDiagnosisTable } from './09-the-diagnosis-table'

// generalization — course 05 of the seven-course supervised-learning spine. Nine sections, nine
// scenes.
//
// The course is a diagnostic procedure, taught in the order you would actually run it. §01-02 set
// up the problem and the instrument: flexibility has a wrong amount in both directions, and you
// cannot see it without splitting the data. §03-05 are the measurement — two numbers, then the
// curve of those numbers against training-set size, then the baseline that turns them into a
// verdict. §06-08 are the one fix that needed its own machinery. §09 is the lookup table the
// reader keeps.
//
// The spine of the whole thing is that the two failure modes take OPPOSITE fixes, so guessing is
// worse than useless. Every section is building toward that asymmetry.
export const generalization: Course = {
  id: 'generalization',
  title: 'Overfitting, Bias and Variance',
  sections: [
    underfitAndOverfit,
    theSplit,
    biasAndVariance,
    learningCurves,
    aBaseline,
    regularization,
    regularizedRegression,
    choosingLambda,
    theDiagnosisTable,
  ],
}

import type { Course } from '../types'
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

// classification — course 04 of the seven-course supervised-learning spine. Ten sections, ten
// scenes.
//
// The course is built as two changes and a punchline. §01-04 change the MODEL: a line through 0/1
// labels breaks for a reason worth seeing (§01), the sigmoid fixes it (§02), and the boundary that
// results is linear even though the output is not (§03-04). §05-07 change the COST, and §05 is the
// load-bearing one — squared error on a sigmoid is genuinely non-convex, shown on the real cost
// curve rather than asserted. §08 is the punchline: after changing both, the update rule comes out
// character-for-character identical to linear regression's.
//
// §09-10 are the practice. §09 is the section that is easiest to leave out and worst to leave out —
// the threshold is a decision the library makes for you silently, and it is not a technical one.
export const classification: Course = {
  id: 'classification',
  title: 'Classification',
  sections: [
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
  ],
}

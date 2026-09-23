import type { Course } from '../types'
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

// regression — course 02 of the seven-course supervised-learning spine. The cost function, and the
// algorithm that minimises it. Ten sections, ten scenes.
//
// The arc is deliberately slow through the middle. §01-02 set up the model and what "wrong" means;
// §03 is the hinge — J is a function of the PARAMETERS, not the data — and §04-05 spend two whole
// sections on the SHAPE of J before any algorithm appears, because gradient descent is trivial once
// you can see the bowl and incomprehensible if you cannot. §10 comes last on purpose: a reader who
// meets the closed form first concludes the iteration was busywork, and then has nothing when they
// reach a model that has no closed form.
export const regression: Course = {
  id: 'regression',
  title: 'Regression and Gradient Descent',
  sections: [
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
  ],
}

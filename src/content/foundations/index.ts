import type { Course } from '../types'
import { whatIsMl } from './01-what-is-ml'
import { rulesThatKeepGrowingSection } from './02-rules-that-keep-growing'
import { supervised } from './03-supervised'
import { regressionVsClassification } from './04-regression-vs-classification'
import { unsupervised } from './05-unsupervised'
import { theTrainingSet } from './06-the-training-set'
import { theModel } from './07-the-model'
import { theLoop } from './08-the-loop'
import { theOnlyScoreSection } from './09-the-only-score'
import { theToolkit } from './10-the-toolkit'

// foundations — course 01 of the seven-course supervised-learning spine. What the field is, what a
// training set is, what a model is, and the one loop every algorithm runs. Ten sections, ten scenes.
//
// §01-02 are the WHY (authorship turns around; the hand-written rule never closes), §03-05 fix the
// vocabulary, §06-08 build the machinery, and §09 is deliberately early: overfitting is normally
// taught after a learner exists, which means it is taught after the reader has already formed the
// habit of trusting a training score. It costs nothing to show it here and saves a course of
// unlearning. §10 is the map.
export const foundations: Course = {
  id: 'foundations',
  title: 'What Machine Learning Is',
  sections: [
    whatIsMl,
    rulesThatKeepGrowingSection,
    supervised,
    regressionVsClassification,
    unsupervised,
    theTrainingSet,
    theModel,
    theLoop,
    theOnlyScoreSection,
    theToolkit,
  ],
}

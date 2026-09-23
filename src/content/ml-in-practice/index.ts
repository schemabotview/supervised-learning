import type { Course } from '../types'
import { theIterativeLoop } from './01-the-iterative-loop'
import { decidingWhatToTry } from './02-deciding-what-to-try'
import { errorAnalysis } from './03-error-analysis'
import { addingData } from './04-adding-data'
import { transferLearning } from './05-transfer-learning'
import { skewedDatasets } from './06-skewed-datasets'
import { precisionAndRecall } from './07-precision-and-recall'
import { theTradeoff } from './08-the-tradeoff'
import { theFullCycle } from './09-the-full-cycle'
import { fairnessAndEthics } from './10-fairness-and-ethics'

// ml-in-practice — course 06 of the seven-course supervised-learning spine. Ten sections, ten
// scenes, one worked dataset: a card-fraud detector and its 20,000-transaction validation split.
//
// The previous course gave you a diagnosis. This one is everything that happens after it, in the
// order a project meets it. §01-02 are the loop and the menu of moves it can make — bias and
// variance narrowed the choice to three, and the remaining decision is still yours. §03-05 are the
// three ways to find out WHICH of the three: read the errors by hand, do the ceiling arithmetic
// before buying data, and check whether somebody has already trained the hard part for you.
//
// §06-08 are a hard turn, and they exist because the diagnostic instrument from course 5 quietly
// breaks on a rare event: at 0.5% prevalence, accuracy measures prevalence. So the course stops and
// rebuilds the scoring — confusion matrix, then precision and recall, then the curve that connects
// every threshold between them.
//
// §09-10 zoom out. The model is one box of six, and the last section takes every honest aggregate
// number the course produced and splits it by customer segment, where it turns out one group is
// declined 4.9x as often as another. That is the note the course ends on deliberately: the failure
// is not in any number here being wrong, it is in which numbers were computed.
export const mlInPractice: Course = {
  id: 'ml-in-practice',
  title: 'Making a Model Better',
  sections: [
    theIterativeLoop,
    decidingWhatToTry,
    errorAnalysis,
    addingData,
    transferLearning,
    skewedDatasets,
    precisionAndRecall,
    theTradeoff,
    theFullCycle,
    fairnessAndEthics,
  ],
}

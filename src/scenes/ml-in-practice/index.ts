import type { Scene } from '@graphlearning/flow'
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

export const mlInPracticeScenes: Scene[] = [
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
]

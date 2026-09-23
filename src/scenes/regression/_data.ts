// The worked dataset for the whole `regression` course: twelve houses, size against price. One
// dataset carried through all ten sections is deliberate — a new one per section costs the reader a
// re-orientation they did not ask for, and here the SAME twelve points have to be recognisable in a
// scatter, in a cost curve and in a contour map for the three pictures to connect.
import type { PlotPoint } from '@graphlearning/flow'
import { squaredErrorCost } from '../_curve'

export const HOUSES: PlotPoint[] = [
  [0.8, 1.35], [1.1, 1.62], [1.4, 1.55], [1.7, 1.94], [2.0, 2.05], [2.3, 2.16],
  [2.6, 2.41], [2.9, 2.35], [3.2, 2.72], [3.6, 2.78], [4.1, 2.99], [4.6, 3.12],
]

export const COST = squaredErrorCost(HOUSES)
// w ≈ 0.45, b ≈ 1.08 — rounded in prose to keep the slides readable.
export const W_FIT = COST.wMin
export const B_FIT = COST.bMin

// The worked dataset for `generalization`: the housing curve from `multiple-features` §08, now with
// enough rows to split three ways and to run a learning curve along. §08 there ends on the straight
// fit missing at both ends and in the middle — the classic underfit signature — and says so; this
// course opens by naming it.
//
// Every curve in this course is FITTED (`polyRidge`), never drawn. That is deliberate: the argument
// is that a degree-12 polynomial does something specific and terrible, and a hand-drawn squiggle
// would be the author asserting it rather than the data showing it.
import type { PlotPoint } from '@graphlearning/flow'
import { costOf, polyRidge, rng } from '../_curve'

export const X_MIN = 0.4
export const X_MAX = 4.7

/** The process the data actually comes from — known here, unknowable in real life. §05 needs it. */
export const TRUE = (x: number) => 1.1 + 1.35 * x - 0.14 * x * x

/** Uniform noise half-width. σ = SPREAD/√3 ≈ 0.196, so the irreducible J is σ²/2 ≈ 0.0193. */
const SPREAD = 0.34
export const NOISE_FLOOR = SPREAD ** 2 / 3 / 2

/** Forty houses: size in 1000 ft² against price in $100k, evenly spaced, fixed seed. */
const noise = rng(53)
export const ALL: PlotPoint[] = Array.from({ length: 40 }, (_, i) => {
  const x = X_MIN + ((X_MAX - X_MIN) * i) / 39
  const y = TRUE(x) + (noise() - 0.5) * 2 * SPREAD
  return [Number(x.toFixed(3)), Number(y.toFixed(3))] as PlotPoint
})

// The split is by position rather than at random, so each split SPANS the whole size range. A
// contiguous split would hand validation only the large houses, and every number in this course
// would then be measuring extrapolation instead of generalization.
//
// 24 / 8 / 8, and the training set is deliberately the small one: 24 rows is what leaves a
// degree-12 model room to misbehave, and at 36 rows least squares averages the noise away and the
// course has nothing left to show. Widening the split to 48 rows was tried and reverted — it is a
// different draw of the noise, and it flattened §08's λ curve into a monotone rise with no minimum
// to find, which is the one thing that section exists to show.
export const TRAIN = ALL.filter((_, i) => i % 5 !== 2 && i % 5 !== 4)
export const VAL = ALL.filter((_, i) => i % 5 === 2)
export const TEST = ALL.filter((_, i) => i % 5 === 4)

/** Fit degree `deg` to the training split, optionally with a ridge penalty. */
export const fitTrain = (deg: number, lambda = 0, data: PlotPoint[] = TRAIN) =>
  polyRidge(data, deg, lambda, X_MIN, X_MAX)

export const jTrain = (deg: number, lambda = 0) => costOf(fitTrain(deg, lambda).at, TRAIN)
export const jVal = (deg: number, lambda = 0) => costOf(fitTrain(deg, lambda).at, VAL)

/**
 * A deterministic order in which training rows are added, for §04's learning curves. Taking the
 * first m rows in file order instead would train only on the SMALL houses and then score against
 * validation points off the end of that range — the curve would be measuring extrapolation, and
 * an early version did exactly that and produced a J_cv of 32,601.
 */
const ORDER = (() => {
  const idx = [...TRAIN.keys()]
  const r = rng(1)
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
})()

/** The first `m` training rows, spread across the whole size range. */
export const firstM = (m: number): PlotPoint[] => ORDER.slice(0, m).map((i) => TRAIN[i])

/** One point of a learning curve: train on m rows, score on those rows and on validation. */
export function learningPoint(deg: number, m: number): { train: number; val: number } {
  const sub = firstM(m)
  const f = polyRidge(sub, deg, 0, X_MIN, X_MAX)
  return { train: costOf(f.at, sub), val: costOf(f.at, VAL) }
}

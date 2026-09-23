// Sampling helpers for PLOT scenes. These live in the repo, not the engine, on purpose: a scene file
// is TypeScript, so the maths belongs where it is stated and @graphlearning/flow never needs an
// expression parser. Everything here returns DATA points — the engine still owns every pixel.
import type { PlotPoint } from '@graphlearning/flow'

/** `n + 1` evenly spaced samples of `f` across [a, b]. */
export const sample = (a: number, b: number, n: number, f: (x: number) => number): PlotPoint[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n
    return [x, f(x)] as PlotPoint
  })

/** A straight line as two points — `w` is the slope, `b` the intercept. */
export const line = (w: number, b: number, from: number, to: number): PlotPoint[] => [
  [from, w * from + b],
  [to, w * to + b],
]

/**
 * A deterministic pseudo-random stream. Scenes must render IDENTICALLY on every capture — the whole
 * reason authors never write x/y — so scattered data is generated from a fixed seed rather than
 * Math.random, which would reshuffle the points between the screenshot and the 4K shoot.
 */
export function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** `n` points scattered around the line `wx + b` with uniform noise of half-width `spread`. */
export function scatterAroundLine(
  n: number,
  w: number,
  b: number,
  from: number,
  to: number,
  spread: number,
  seed = 7,
): PlotPoint[] {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = from + ((to - from) * (i + 0.5)) / n
    return [Number(x.toFixed(3)), Number((w * x + b + (r() - 0.5) * 2 * spread).toFixed(3))] as PlotPoint
  })
}

// ── squared-error cost, and its level sets ────────────────────────────────────────────────────
// J(w, b) = 1/(2m) · Σ (w·xᵢ + b − yᵢ)² is a QUADRATIC in (w, b), so its contours are exact
// ellipses and can be drawn as ordinary `line` series rather than needing a contour renderer in the
// engine. Everything below is closed-form off the data — no fitting, no solver, no randomness — so
// the same figure comes back on every capture.

export interface Quadratic {
  /** J(w, b) for any parameters. */
  at: (w: number, b: number) => number
  /** The least-squares minimum — the bottom of the bowl. */
  wMin: number
  bMin: number
  jMin: number
}

/** Build the cost function for a dataset, and solve it. */
export function squaredErrorCost(data: PlotPoint[]): Quadratic {
  const m = data.length
  const sx = data.reduce((a, [x]) => a + x, 0)
  const sy = data.reduce((a, [, y]) => a + y, 0)
  const sxx = data.reduce((a, [x]) => a + x * x, 0)
  const sxy = data.reduce((a, [x, y]) => a + x * y, 0)
  // The normal equations, which §10 of this course derives; used here only to place the minimum.
  const wMin = (m * sxy - sx * sy) / (m * sxx - sx * sx)
  const bMin = (sy - wMin * sx) / m
  const at = (w: number, b: number) =>
    data.reduce((acc, [x, y]) => acc + (w * x + b - y) ** 2, 0) / (2 * m)
  return { at, wMin, bMin, jMin: at(wMin, bMin) }
}

/**
 * One contour of the cost bowl, as a closed polyline in (w, b) space: every point where
 * J = jMin + level. Because J is quadratic, J(wMin+Δw, bMin+Δb) − jMin is a pure quadratic form, so
 * along any direction θ the contour sits at radius √(level / Q(θ)) — exact, and cheap.
 */
export function costContour(q: Quadratic, level: number, n = 160): PlotPoint[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n
    const [dw, db] = [Math.cos(t), Math.sin(t)]
    const shape = q.at(q.wMin + dw, q.bMin + db) - q.jMin // Q(θ) at unit radius
    const r = Math.sqrt(level / shape)
    return [q.wMin + r * dw, q.bMin + r * db] as PlotPoint
  })
}

/**
 * The path gradient descent actually walks, in (w, b) space. Returned as data points so a scene can
 * draw the real trajectory rather than an artist's impression of one — if the learning rate
 * diverges, the drawn path diverges, which is the whole point of §07.
 */
export function descentPath(
  data: PlotPoint[],
  alpha: number,
  steps: number,
  w0 = 0,
  b0 = 0,
): PlotPoint[] {
  const m = data.length
  let [w, b] = [w0, b0]
  const out: PlotPoint[] = [[w, b]]
  for (let i = 0; i < steps; i++) {
    const dw = data.reduce((a, [x, y]) => a + (w * x + b - y) * x, 0) / m
    const db = data.reduce((a, [x, y]) => a + (w * x + b - y), 0) / m
    w -= alpha * dw
    b -= alpha * db
    if (!Number.isFinite(w) || !Number.isFinite(b)) break
    out.push([w, b])
  }
  return out
}

// ── least-squares polynomials, with a ridge penalty ───────────────────────────────────────────
// The `generalization` course needs FITTED curves, not drawn ones: its whole argument is that a
// degree-12 polynomial does something specific and terrible, and a hand-drawn squiggle would be the
// author asserting that rather than the data showing it. Everything below is closed-form off the
// data — normal equations, solved directly — so the same figure comes back on every capture.

/** Gaussian elimination with partial pivoting. `A` is square and is not mutated. */
function solveLinear(A: number[][], b: number[]): number[] {
  const n = b.length
  const M = A.map((row, i) => [...row, b[i]])
  for (let c = 0; c < n; c++) {
    let p = c
    for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i
    ;[M[c], M[p]] = [M[p], M[c]]
    const d = M[c][c]
    for (let i = c + 1; i < n; i++) {
      const f = M[i][c] / d
      for (let j = c; j <= n; j++) M[i][j] -= f * M[c][j]
    }
  }
  const out = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n]
    for (let j = i + 1; j < n; j++) s -= M[i][j] * out[j]
    out[i] = s / M[i][i]
  }
  return out
}

/**
 * A polynomial fit, expressed in a basis of `x` mapped onto [-1, 1] across [`from`, `to`].
 *
 * The remap is not cosmetic. A raw Vandermonde in x over [0.4, 4.7] is catastrophically
 * ill-conditioned by degree 12 — the returned coefficients are then noise, and the "overfitted"
 * curve in §01 would be a numerical artefact rather than the real least-squares answer it claims to
 * be. On [-1, 1] the same system solves cleanly in double precision.
 */
export interface PolyFit {
  /** Evaluate the fitted polynomial at a raw (un-remapped) x. */
  at: (x: number) => number
  /** Coefficients in the remapped basis, constant term first. */
  coeffs: number[]
  /** The largest |coefficient| excluding the intercept — what a ridge penalty actually shrinks. */
  maxWeight: number
}

/**
 * Least-squares fit of a degree-`deg` polynomial, with an optional ridge penalty `lambda` on the
 * weights. The intercept is never penalised — shrinking it would drag the whole curve toward zero,
 * which is not what regularization is for and would make §07's "it only shrinks the wiggle" false.
 */
export function polyRidge(
  data: PlotPoint[],
  deg: number,
  lambda = 0,
  from = 0,
  to = 1,
): PolyFit {
  const u = (x: number) => (2 * (x - from)) / (to - from) - 1
  const k = deg + 1
  const A = Array.from({ length: k }, () => new Array(k).fill(0))
  const b = new Array(k).fill(0)
  for (const [x, y] of data) {
    const t = u(x)
    const p = Array.from({ length: k }, (_, j) => t ** j)
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) A[i][j] += p[i] * p[j]
      b[i] += p[i] * y
    }
  }
  for (let i = 1; i < k; i++) A[i][i] += lambda
  const coeffs = solveLinear(A, b)
  return {
    at: (x: number) => coeffs.reduce((acc, c, j) => acc + c * u(x) ** j, 0),
    coeffs,
    maxWeight: Math.max(...coeffs.slice(1).map(Math.abs)),
  }
}

/** Squared-error cost of any prediction function on any split: J = 1/(2m) · Σ (f(x) − y)². */
export const costOf = (f: (x: number) => number, data: PlotPoint[]): number =>
  data.reduce((a, [x, y]) => a + (f(x) - y) ** 2, 0) / (2 * data.length)

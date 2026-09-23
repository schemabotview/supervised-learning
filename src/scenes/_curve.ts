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

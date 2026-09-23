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

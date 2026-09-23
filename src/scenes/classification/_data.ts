// The worked dataset for `classification`: tumour size against a binary diagnosis. One feature and
// a 0/1 label is the smallest thing that shows every idea in the course, and keeping it to one
// feature is what lets §01-02 draw the label ON the y axis — which is the whole reason the straight
// line looks absurd there.
import type { PlotPoint } from '@graphlearning/flow'

/**
 * [size, label] — 0 benign, 1 malignant. Mostly separable, with ONE overlapping pair: a small
 * malignant tumour at 2.2 and a large benign one at 3.0. That overlap is load-bearing, not
 * decoration — on perfectly separable data every threshold from 0.2 to 0.8 scores the same, so §09
 * would have no trade to show and would argue for a choice the frame proves costless.
 */
export const TUMOURS: PlotPoint[] = [
  [0.6, 0], [0.9, 0], [1.2, 0], [1.5, 0], [1.8, 0], [2.1, 0], [2.4, 0], [3.0, 0],
  [2.2, 1], [2.8, 1], [3.1, 1], [3.4, 1], [3.8, 1], [4.2, 1], [4.6, 1],
]

/** The same set plus one very large malignant tumour, far to the right. */
export const WITH_OUTLIER: PlotPoint[] = [...TUMOURS, [9.5, 1]]

export const benign = (d: PlotPoint[]) => d.filter(([, y]) => y === 0)
export const malignant = (d: PlotPoint[]) => d.filter(([, y]) => y === 1)

export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

/**
 * The logistic model for these tumours — the ACTUAL unregularized maximum-likelihood fit, found by
 * running batch gradient descent on the log-loss cost to convergence (w = 2.9225, b = -7.6155) and
 * rounded to two figures. Hand-picked parameters were the earlier version and they were wrong: they
 * put the boundary where the data has no ambiguity, which flattered every downstream section.
 */
export const W = 2.9
export const B = -7.6
export const model = (x: number) => sigmoid(W * x + B)

/** Where the model crosses a given probability — the boundary that threshold implies. §03, §09. */
export const boundaryAt = (p: number) => (Math.log(p / (1 - p)) - B) / W

/** Least-squares line through the same 0/1 labels, for §01. Computed, not drawn. */
export function lsLine(d: PlotPoint[]): { w: number; b: number } {
  const m = d.length
  const sx = d.reduce((a, [x]) => a + x, 0)
  const sy = d.reduce((a, [, y]) => a + y, 0)
  const sxx = d.reduce((a, [x]) => a + x * x, 0)
  const sxy = d.reduce((a, [x, y]) => a + x * y, 0)
  const w = (m * sxy - sx * sy) / (m * sxx - sx * sx)
  return { w, b: (sy - w * sx) / m }
}

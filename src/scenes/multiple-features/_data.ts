// The worked dataset for `multiple-features`: the same twelve houses as `regression`, now with the
// extra columns that make this course necessary. Size is in square feet (hundreds to thousands),
// bedrooms in single digits, age in years — three features on three wildly different scales, which
// IS the subject of §04-05.
import type { PlotPoint } from '@graphlearning/flow'

export interface House { size: number; beds: number; age: number; price: number }

export const HOUSES: House[] = [
  { size: 800, beds: 2, age: 34, price: 135 },
  { size: 1100, beds: 3, age: 21, price: 162 },
  { size: 1400, beds: 3, age: 28, price: 155 },
  { size: 1700, beds: 3, age: 15, price: 194 },
  { size: 2000, beds: 4, age: 12, price: 205 },
  { size: 2300, beds: 4, age: 18, price: 216 },
  { size: 2600, beds: 4, age: 9, price: 241 },
  { size: 2900, beds: 5, age: 22, price: 235 },
  { size: 3200, beds: 5, age: 6, price: 272 },
  { size: 3600, beds: 5, age: 11, price: 278 },
  { size: 4100, beds: 6, age: 4, price: 299 },
  { size: 4600, beds: 6, age: 7, price: 312 },
]

/** One feature's raw values, paired with price — for the scatter plots. */
export const against = (key: 'size' | 'beds' | 'age'): PlotPoint[] =>
  HOUSES.map((h) => [h[key], h.price] as PlotPoint)

export const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length
export const std = (v: number[]) => {
  const m = mean(v)
  return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length)
}

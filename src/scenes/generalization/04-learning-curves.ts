import type { Scene } from '@graphlearning/flow'
import { NOISE_FLOOR, learningPoint } from './_data'

// §04. Error against TRAINING-SET SIZE, which answers the only question a budget holder ever asks:
// will more data help? Two panels on IDENTICAL axes, because the comparison is the content and two
// different y scales would make the two signatures look alike.
//
// Two things about the windows, both deliberate:
//
//   · the degree-7 curve starts at m = 14. It has 8 parameters, so it is fittable from m = 9, but
//     at m = 10 and 12 J_val is 0.179 and 0.176 — off the top of a shared axis. The caption says so
//     rather than quietly cropping, because "unusable on a small sample" is part of the diagnosis.
//   · the degree-1 curves CROSS at m = 16 and J_train ends a hair above J_val. That is not an
//     error and it is not tuned away: with a high-bias model the two are measuring almost the same
//     thing, and which lands on top is a property of an 8-row validation sample. What the section
//     claims is the LEVEL they meet at, which is 0.035 against a floor of 0.019.
const curve = (deg: number, from: number, pick: 'train' | 'val'): [number, number][] => {
  const out: [number, number][] = []
  for (let m = from; m <= 24; m += 2) out.push([m, learningPoint(deg, m)[pick]])
  return out
}

const axes = {
  x: { min: 2, max: 26, step: 4, label: 'training examples (m)' },
  y: { min: 0, max: 0.105, step: 0.02, label: 'J' },
}
const floor = {
  kind: 'segment' as const,
  from: [2, NOISE_FLOOR] as [number, number],
  to: [26, NOISE_FLOOR] as [number, number],
  color: '#5a6170',
  dashed: true,
}

export const learningCurves: Scene = {
  id: 'learning-curves',
  title: 'Does more data help? The curve answers',
  padding: 0.12,
  nodes: [
    {
      id: 'bias',
      kind: 'plot',
      label: 'Degree 1 — high bias',
      sub: 'the two curves meet by m ≈ 16 and then flatten at 0.035 — nearly twice the floor. The next 24 houses buy nothing',
      pattern: 'warn',
      plot: {
        ...axes,
        series: [
          { ...floor, label: 'best possible 0.019', labelAt: [3.2, 0.0065] },
          { kind: 'line', points: curve(1, 4, 'train'), color: '#4f8ff7', label: 'J_train', labelAt: [20.6, 0.0455] },
          { kind: 'line', points: curve(1, 4, 'val'), color: '#f0656f', label: 'J_val', labelAt: [12.4, 0.0585] },
        ],
      },
    },
    {
      id: 'variance',
      kind: 'plot',
      label: 'Degree 7 — high variance',
      sub: 'a gap of 0.078 that closes to 0.008 by m = 24 · off the top of this chart below m = 14 (0.18 at m = 10) — more data is exactly the fix',
      pattern: 'storage',
      plot: {
        ...axes,
        series: [
          { ...floor, label: 'best possible 0.019', labelAt: [3.2, 0.0065] },
          { kind: 'line', points: curve(7, 14, 'train'), color: '#4f8ff7', label: 'J_train', labelAt: [20.6, 0.0035] },
          { kind: 'line', points: curve(7, 14, 'val'), color: '#f0656f', label: 'J_val', labelAt: [15.4, 0.0925] },
        ],
      },
    },
  ],
  edges: [],
}

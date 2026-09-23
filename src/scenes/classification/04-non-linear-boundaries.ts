import type { Scene } from '@graphlearning/flow'
import { rng } from '../_curve'

// §04. The same trick as polynomial regression, now drawn as a boundary rather than a fit. A circle
// is z = x1² + x2² − r², so adding the squared columns lets a LINEAR decision rule cut a curved
// shape out of the plane. Both panels are `equal` on the same window — a circle that renders as an
// ellipse would undo the section.
const r = rng(19)
const ring = (n: number, rMin: number, rMax: number): [number, number][] =>
  Array.from({ length: n }, () => {
    const t = r() * 2 * Math.PI
    const rad = rMin + r() * (rMax - rMin)
    return [Number((rad * Math.cos(t)).toFixed(2)), Number((rad * Math.sin(t)).toFixed(2))] as [number, number]
  })
const circle = (rad: number): [number, number][] =>
  Array.from({ length: 161 }, (_, i) => {
    const t = (2 * Math.PI * i) / 160
    return [rad * Math.cos(t), rad * Math.sin(t)] as [number, number]
  })

const INNER = ring(18, 0, 1.25)
const OUTER = ring(22, 1.95, 2.9)
const ax = { min: -3.2, max: 3.2, step: 1 }

export const nonLinearBoundaries: Scene = {
  id: 'non-linear-boundaries',
  title: 'A straight rule, on columns you bent',
  padding: 0.08,
  nodes: [
    {
      id: 'lin',
      kind: 'plot',
      label: 'z = w₁x₁ + w₂x₂ + b',
      sub: 'a straight boundary — no line separates a ring from its centre',
      pattern: 'warn',
      plot: {
        x: { ...ax, label: 'x₁' },
        y: { ...ax, label: 'x₂' },
        equal: true,
        series: [
          { kind: 'scatter', points: INNER, color: '#4f8ff7', size: 6 },
          { kind: 'scatter', points: OUTER, color: '#f0902f', size: 6 },
          { kind: 'line', points: [[-3.2, 1.6], [3.2, -1.6]], color: '#f0656f', dashed: true, label: 'best it can do', labelAt: [-3.05, 2.85] },
        ],
      },
    },
    {
      id: 'poly',
      kind: 'plot',
      label: 'z = w₁x₁² + w₂x₂² + b',
      sub: 'square both columns and the SAME linear rule cuts a circle',
      pattern: 'storage',
      plot: {
        x: { ...ax, label: 'x₁' },
        y: { ...ax, label: 'x₂' },
        equal: true,
        series: [
          { kind: 'scatter', points: INNER, color: '#4f8ff7', size: 6 },
          { kind: 'scatter', points: OUTER, color: '#f0902f', size: 6 },
          { kind: 'line', points: circle(1.6), color: '#37b877', label: 'z = 0', labelAt: [-3.05, 2.85] },
        ],
      },
    },
  ],
  edges: [],
}

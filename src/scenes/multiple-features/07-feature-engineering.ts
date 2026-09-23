import type { Scene } from '@graphlearning/flow'
import { line } from '../_curve'

// §07. A new column built out of what you already know. The two plots are the argument: frontage
// and depth each scatter loosely against price on their own, but their PRODUCT — the area — lines
// up. The model could never have found that, because no linear combination of frontage and depth
// is their product. That is the whole case for feature engineering in one picture.
// Price is generated FROM the area, plus noise. The noise is not decoration: the first cut computed
// price as an exact function of frontage x depth, so the lower plot put every point precisely on
// the line — a perfect fit no real dataset produces, which overstates the very claim the section is
// making. A fixed seed keeps it identical on every capture.
const FRONT = [22, 26, 24, 31, 28, 35, 33, 40, 38, 45, 42, 50]
const DEPTH = [36, 42, 58, 55, 71, 66, 79, 73, 88, 80, 98, 92]
const NOISE = [6, -9, 4, -5, 11, -7, 3, 9, -11, 5, -4, 8]
const PRICE = FRONT.map((f, i) => Math.round(f * DEPTH[i] * 0.083 + 62 + NOISE[i]))

export const featureEngineering: Scene = {
  id: 'feature-engineering',
  title: 'The column the model could not have found',
  padding: 0.11,
  nodes: [
    {
      id: 'raw',
      kind: 'plot',
      label: 'Frontage alone — a loose relationship',
      sub: 'depth alone looks much the same: real, but noisy',
      pattern: 'network',
      plot: {
        x: { min: 15, max: 55, step: 10, label: 'frontage (ft)' },
        y: { min: 100, max: 500, step: 100, label: 'price ($k)' },
        series: [{ kind: 'scatter', points: FRONT.map((f, i) => [f, PRICE[i]] as [number, number]), color: '#4f8ff7' }],
      },
    },
    {
      id: 'area',
      kind: 'plot',
      label: 'frontage × depth — the area',
      sub: 'one multiplication, and the scatter becomes a line',
      pattern: 'storage',
      plot: {
        x: { min: 500, max: 5200, step: 1000, label: 'area (ft²)' },
        y: { min: 100, max: 500, step: 100, label: 'price ($k)' },
        series: [
          { kind: 'scatter', points: FRONT.map((f, i) => [f * DEPTH[i], PRICE[i]] as [number, number]), color: '#37b877' },
          { kind: 'line', points: line(0.083, 62, 500, 5200), color: '#f0902f', label: 'x₃ = x₁ · x₂', labelAt: [2600, 210] },
        ],
      },
    },
  ],
  edges: [],
}

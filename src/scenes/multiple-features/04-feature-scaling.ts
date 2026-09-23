import type { Scene } from '@graphlearning/flow'
import { HOUSES } from './_data'

// §04. Why unscaled features break the geometry, argued on the contours rather than asserted. The
// two cost surfaces are drawn analytically from the SHAPE of the quadratic form rather than from a
// solved dataset, because the point is the ratio of the axes, not any particular minimum: when one
// feature ranges over thousands and another over single digits, the bowl's cross-section is
// stretched by roughly that ratio, and steepest descent spends its time crossing the canyon.
//
// `equal: true` on both, and the SAME window — the whole comparison is that one is round and the
// other is not, which a per-plot aspect would quietly erase.
const ellipse = (rx: number, ry: number, n = 200): [number, number][] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n
    return [rx * Math.cos(t), ry * Math.sin(t)] as [number, number]
  })

// The canyon runs along w2 (beds) and is narrow across w1 (size), because a feature with a large
// range makes the cost very sensitive to its weight. So steepest descent bounces ACROSS w1 while
// creeping down w2 — and the bounce has to land near the wall at each height to be worth drawing.
//
// The first cut hand-wrote a squiggle starting at w1 = -2.6, which is far outside an ellipse only
// +/-0.84 wide: the path sat beside the contours instead of inside them, and the figure showed a
// zig-zag that was not bouncing off anything. Tracking the actual canyon width fixes that.
const RX = 0.28
const RY = 1.05
const OUTER = 3 // the widest ring drawn
const zig: [number, number][] = (() => {
  const out: [number, number][] = []
  let b = 2.8
  let side = 1
  while (b > 0.06) {
    // how wide the outer ring is at this height — the wall the step runs into
    const halfWidth = RX * OUTER * Math.sqrt(Math.max(0, 1 - (b / (RY * OUTER)) ** 2))
    out.push([Number((side * halfWidth * 0.92).toFixed(3)), Number(b.toFixed(3))])
    side *= -1
    b *= 0.78
  }
  out.push([0, 0])
  return out
})()
const straight: [number, number][] = [[2.4, 2.4], [1.05, 1.05], [0.42, 0.42], [0.15, 0.15], [0, 0]]

export const featureScaling: Scene = {
  id: 'feature-scaling',
  title: 'The canyon, and the bowl it should have been',
  padding: 0.09,
  nodes: [
    {
      id: 'raw',
      kind: 'plot',
      label: 'Raw features — size in thousands, beds in units',
      sub: `size spans ${HOUSES[0].size}-${HOUSES[11].size}, beds spans 2-6: the contours stretch by roughly that ratio`,
      pattern: 'warn',
      plot: {
        x: { min: -3.2, max: 3.2, step: 1, label: 'w₁ (size)' },
        y: { min: -3.2, max: 3.2, step: 1, label: 'w₂ (beds)' },
        equal: true,
        series: [
          ...[0.5, 1, 1.6, 2.3, 3].map((k) => ({ kind: 'line' as const, points: ellipse(k * 0.28, k * 1.05), color: '#5a2f33' })),
          { kind: 'line', points: zig, color: '#f0656f', label: 'it zig-zags across', labelAt: [-3.05, 2.85] },
          { kind: 'marker', at: [0, 0], color: '#f0902f', size: 6 },
        ],
      },
    },
    {
      id: 'scaled',
      kind: 'plot',
      label: 'Scaled features — both roughly −1 to 1',
      sub: 'the contours are near-circular, so the steepest direction points at the answer',
      pattern: 'storage',
      plot: {
        x: { min: -3.2, max: 3.2, step: 1, label: 'w₁ (size, scaled)' },
        y: { min: -3.2, max: 3.2, step: 1, label: 'w₂ (beds, scaled)' },
        equal: true,
        series: [
          ...[0.5, 1, 1.6, 2.3, 3].map((k) => ({ kind: 'line' as const, points: ellipse(k * 0.95, k * 1.0), color: '#1f4f38' })),
          { kind: 'line', points: straight, color: '#37b877', label: 'it goes straight there', labelAt: [-3.05, 2.85] },
          { kind: 'marker', at: [0, 0], color: '#f0902f', size: 6 },
        ],
      },
    },
  ],
  edges: [],
}

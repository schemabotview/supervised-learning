import type { Scene } from '@graphlearning/flow'
import { costContour } from '../_curve'
import { COST } from './_data'

// §05. Both parameters at once. A 3-D bowl cannot be read off a flat frame with any precision, so
// this is the map-maker's answer: level sets, exactly as a contour map draws a hill. Each ring is
// every (w, b) whose cost is the same — and the rings are EXACT, computed closed-form from the
// quadratic (see costContour), not sketched.
//
// The rings are ellipses rather than circles, and lean. That is not decoration: it is the fact that
// makes feature scaling matter three sections into the next course, so the scene is drawn `equal`
// — squash the aspect and the lean becomes a lie about the geometry.
// Levels chosen so every ring CLOSES inside the window. The first cut ran out to 0.125, whose
// contour reaches b ~ 2.24 — far outside the frame — so the outer rings were sliced off top and
// bottom and the figure showed open arcs rather than the nested closed loops the slide describes.
const LEVELS = [0.004, 0.010, 0.018, 0.030]

export const theCostSurface: Scene = {
  id: 'the-cost-surface',
  title: 'The bowl, seen from directly above',
  padding: 0.14,
  nodes: [
    {
      id: 'contours',
      kind: 'plot',
      label: 'J(w, b) — level sets',
      sub: 'each ring is one cost; the rings tighten towards the single point that minimises it',
      pattern: 'storage',
      plot: {
        x: { min: 0.22, max: 0.75, step: 0.1, label: 'w' },
        y: { min: 0.42, max: 1.68, step: 0.2, label: 'b' },
        equal: true,
        series: [
          ...LEVELS.map((l, i) => ({
            kind: 'line' as const,
            points: costContour(COST, l),
            color: '#37b877',
            dashed: i % 2 === 1,
          })),
          { kind: 'marker', at: [COST.wMin, COST.bMin], color: '#f0902f', label: 'the minimum', labelAt: [COST.wMin + 0.035, COST.bMin] },
        ],
      },
    },
  ],
  edges: [],
}

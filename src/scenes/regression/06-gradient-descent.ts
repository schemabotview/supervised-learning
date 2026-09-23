import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'
import { COST } from './_data'

// §06. The algorithm, on the picture from §04 so nothing new has to be absorbed at the same time as
// the rule. The dots are a REAL run, which is what makes the shrinking spacing honest: the steps get
// shorter because the slope gets shallower, not because they were drawn that way.
//
// α = 0.10, and the value is not free. This cost has curvature d²J/dw² = mean(x²) = 7.69, so the
// update DIVERGES for any α above 2/7.69 ≈ 0.26. The first cut of this scene used 0.32 and narrated
// it as converging in eight steps; it does not converge at all, it oscillates outward to |w| > 40.
// It rendered as a plausible-looking cluster of dots near the bottom because the diverging points
// left the window and were clipped. Any α quoted in this course is checked against that threshold.
const B = COST.bMin

// w ← w − α·dJ/dw from w₀ = 0.02, α = 0.10, eight steps. Computed here rather than eyeballed.
const steps = (() => {
  const out: [number, number][] = []
  let w = 0.02
  for (let i = 0; i < 8; i++) {
    out.push([w, COST.at(w, B)])
    const h = 1e-5
    w -= 0.10 * ((COST.at(w + h, B) - COST.at(w - h, B)) / (2 * h))
  }
  return out
})()

export const gradientDescent: Scene = {
  id: 'gradient-descent',
  title: 'Walk downhill, in steps the slope decides',
  flow: 'TB',
  padding: 0.11,
  nodes: [
    {
      id: 'walk',
      kind: 'plot',
      label: 'w ← w − α · ∂J/∂w',
      sub: 'steep slope → long step · shallow slope → short step · zero slope → stop',
      pattern: 'storage',
      plot: {
        x: { min: -0.2, max: 1.2, step: 0.2, label: 'w' },
        y: { min: 0, max: 1.2, step: 0.2, label: 'J(w)' },
        series: [
          { kind: 'line', points: sample(-0.2, 1.2, 200, (w) => COST.at(w, B)), color: '#37b877' },
          { kind: 'scatter', points: steps, color: '#f0902f', label: 'eight steps', labelAt: [0.55, 0.78] },
        ],
      },
    },
    {
      id: 'rule',
      kind: 'code',
      hug: true,
      filename: 'one step, in full',
      label: [
        'w = 0.02          # start anywhere',
        'alpha = 0.10      # the learning rate',
        '',
        'for _ in range(8):',
        '    slope = dJ_dw(w)      # which way is up?',
        '    w = w - alpha * slope # so go the other way',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'walk', target: 'rule', label: 'two lines' }],
}

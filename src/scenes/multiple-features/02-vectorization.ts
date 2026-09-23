import type { Scene } from '@graphlearning/flow'
import { sample } from '../_curve'

// §02. Why the dot product is not just tidier. The plot is the argument: a Python loop's cost grows
// with n at a steep constant, while NumPy hands the same arithmetic to a SIMD kernel that does many
// multiplies per instruction. Both lines are linear in n — vectorising does not change the big-O —
// so the honest claim is a large constant factor, and the plot is drawn to show exactly that rather
// than to imply a different growth rate.
export const vectorization: Scene = {
  id: 'vectorization',
  title: 'Same arithmetic, one instruction at a time or many',
  flow: 'TB',
  nodes: [
    {
      id: 'timing',
      kind: 'plot',
      label: 'Time to compute one prediction',
      sub: 'both grow linearly in n — the gap is a constant factor, and the constant is large',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 2000, step: 500, label: 'n (features)' },
        y: { min: 0, max: 200, step: 50, label: 'microseconds' },
        series: [
          { kind: 'line', points: sample(0, 2000, 60, (n) => n * 0.085), color: '#f0656f', label: 'Python loop', labelAt: [1180, 118] },
          { kind: 'line', points: sample(0, 2000, 60, (n) => 2 + n * 0.0016), color: '#37b877', label: 'np.dot', labelAt: [1200, 16] },
        ],
      },
    },
    {
      id: 'why',
      label: 'Where the constant goes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'v-interp', label: 'No interpreter', sub: 'the loop runs in C', pattern: 'service', icon: 'cpu' },
        { id: 'v-simd', label: 'SIMD', sub: 'several multiplies per cycle', pattern: 'service', icon: 'layers' },
        { id: 'v-mem', label: 'Contiguous', sub: 'one cache line, not twelve', pattern: 'service', icon: 'memory' },
      ],
    },
  ],
  edges: [{ source: 'timing', target: 'why', label: 'three reasons' }],
}

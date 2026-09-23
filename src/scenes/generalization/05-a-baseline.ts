import type { Scene } from '@graphlearning/flow'
import { NOISE_FLOOR, jTrain, jVal } from './_data'

// §05. The number that turns two measurements into a diagnosis. J_train and J_val alone cannot say
// whether 0.035 is a disaster or the best anyone could manage — that needs a floor to measure the
// first gap against. Every cell is computed, not typed.
//
// Watch the sign of the first gap. J_train sits BELOW the floor for degree 3 and degree 12 alike,
// and that is not a paradox: training error is optimistically biased, because the model has already
// bent toward the noise in its own rows. For an unbiased fit the expectation is floor·(1 − p/m),
// which for degree 3 is 0.019·(1 − 4/24) = 0.016 against a measured 0.014, and for degree 12 is
// 0.019·(1 − 13/24) = 0.009 against a measured 0.008 — both dead on. Degree 1 is the odd one out at
// 0.036, double what its two parameters can explain, and THAT is what bias looks like in a number.
const n = (v: number) => v.toFixed(3)
const signed = (v: number) => (v >= 0 ? `+${v.toFixed(3)}` : `−${Math.abs(v).toFixed(3)}`)
const row = (deg: number, verdict: string, biasTag: string, varTag: string) => [
  `degree ${deg}`,
  n(jTrain(deg)),
  n(jVal(deg)),
  `${signed(jTrain(deg) - NOISE_FLOOR)}  ${biasTag}`,
  `${signed(jVal(deg) - jTrain(deg))}  ${varTag}`,
  verdict,
]

export const aBaseline: Scene = {
  id: 'a-baseline',
  title: 'Two gaps, and the number the first one is measured against',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'the same two numbers, three verdicts',
      sub: `irreducible floor = ${n(NOISE_FLOOR)} — nothing can score below it on unseen houses`,
      pattern: 'user',
      headers: ['model', 'J_train', 'J_val', 'J_train − floor', 'J_val − J_train', 'reading'],
      values: [
        row(1, 'high bias', 'BIG', 'none'),
        row(3, 'about right', 'at it', 'none'),
        row(12, 'high variance', 'under it', 'HUGE'),
      ],
    },
    {
      id: 'note',
      label: 'And in real life',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-a', label: 'You cannot compute it', sub: 'the noise is unknown', pattern: 'warn', icon: 'gauge' },
        { id: 'n-b', label: 'So you estimate it', sub: 'human error on the task', pattern: 'service', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'note', label: 'where the floor comes from' }],
}

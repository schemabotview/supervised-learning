import type { Scene } from '@graphlearning/flow'
import { confusion, missesByType, recall } from './_data'

// §04. Ceiling analysis, which is the cheapest piece of arithmetic in the course and almost nobody
// does it. Before buying data for a category, ask what recall would be if that category were solved
// PERFECTLY — the answer is an upper bound, free, off the tally §03 already produced.
//
// The point of the column is how small the numbers are. Friendly fraud is missed 9 times out of 10,
// which reads as the model's worst failure; solving it outright moves overall recall from 0.60 to
// 0.69, because there are only ten of them. Card testing is caught half the time — a much less
// embarrassing rate — and it is worth nearly twice as much, because there are 34. A worst-first
// instinct sends you to the wrong one.
const base = recall(confusion(0.5))

export const addingData: Scene = {
  id: 'adding-data',
  title: 'Ten thousand more rows — of what, exactly?',
  flow: 'TB',
  nodes: [
    {
      id: 'ceiling',
      kind: 'table',
      label: 'What is the most this could possibly buy?',
      sub: `recall today is ${base.toFixed(2)} · each row is that category solved OUTRIGHT — an upper bound, not a forecast`,
      pattern: 'user',
      headers: ['spend the quarter on…', 'misses it removes', 'recall ceiling', 'worth it?'],
      values: missesByType().map((m) => [
        m.type,
        String(m.missed),
        m.ceiling.toFixed(2),
        m.missed >= 15 ? 'yes — start here' : m.missed >= 7 ? 'only if it is cheap' : 'no',
      ]),
    },
    {
      id: 'ways',
      label: 'Three ways to get those rows',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-collect', label: 'Collect', sub: 'label the real thing', pattern: 'storage', icon: 'database' },
        { id: 'w-augment', label: 'Augment', sub: 'perturb rows you have', pattern: 'service', icon: 'repeat' },
        { id: 'w-synth', label: 'Synthesise', sub: 'simulate the attack', pattern: 'network', icon: 'gears' },
      ],
    },
  ],
  edges: [{ source: 'ceiling', target: 'ways', label: 'once you know which' }],
}

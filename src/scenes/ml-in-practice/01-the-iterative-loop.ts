import type { Scene } from '@graphlearning/flow'
import { confusion, precision, recall, f1 } from './_data'

// §01. The cycle a project actually runs, and then the SAME cycle as three measured rows. The
// diagram on its own is a platitude — everyone nods at "iterate" — so the table underneath is the
// section: three turns of the loop on the fraud detector, each one a single named change, with what
// it bought. v1 is not a strawman; it is what you get from the two columns that are always in the
// file, and it flags 540 legitimate customers to catch 28 frauds.
//
// NO BACK-EDGE (the layout is longest-path over a DAG, so an edge closing the ring has no consistent
// depth). The fourth box carries the return, exactly as `foundations` §08 does.
const row = (label: string, change: string, key: 's1' | 's2' | 's3') => {
  const c = confusion(0.5, key)
  return [label, change, recall(c).toFixed(2), precision(c).toFixed(2), f1(c).toFixed(2), String(c.fp)]
}

export const theIterativeLoop: Scene = {
  id: 'the-iterative-loop',
  title: 'Nobody gets it right on the first pass',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      label: 'One turn of the loop',
      sub: '…and back to the top — a dozen times before anything is worth deploying',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'l-choose', label: 'Choose', sub: 'model, features, λ', pattern: 'network', icon: 'sliders' },
        { id: 'l-train', label: 'Train', sub: 'fit on the train split', pattern: 'service', icon: 'gears' },
        { id: 'l-diagnose', label: 'Diagnose', sub: 'two numbers, then the errors', pattern: 'user', icon: 'gauge' },
        { id: 'l-change', label: 'Change', sub: 'exactly one thing', pattern: 'storage', icon: 'wrench' },
      ],
      edges: [
        { source: 'l-choose', target: 'l-train' },
        { source: 'l-train', target: 'l-diagnose', label: 'measure' },
        { source: 'l-diagnose', target: 'l-change', label: 'what next?' },
      ],
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Three turns on the fraud detector',
      sub: 'scored at threshold 0.5 on the same 20,000 held-out transactions · 100 of them fraudulent',
      pattern: 'user',
      headers: ['model', 'the one change', 'recall', 'precision', 'F1', 'declined in error'],
      values: [
        row('v1', 'amount + merchant category', 's1'),
        row('v2', '+ charges in the last hour', 's2'),
        row('v3', '+ per-card 90-day baseline', 's3'),
      ],
    },
  ],
  edges: [{ source: 'loop', target: 'runs', label: 'three times round' }],
}

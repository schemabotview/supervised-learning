import type { Scene } from '@graphlearning/flow'
import { HOUSES } from './_data'

// §01. The step up from one feature to n, taken on the table rather than in symbols, because the
// change is genuinely small: one term per column, and a dot product is what that sum is called. The
// code card carries the three ways of writing the same arithmetic so the reader can see that
// vectorising is a NOTATION change before it is a performance one.
export const moreColumns: Scene = {
  id: 'more-columns',
  title: 'One term per column, and a name for that sum',
  flow: 'TB',
  nodes: [
    {
      id: 'tbl',
      kind: 'table',
      label: 'the training set, widened',
      sub: 'm = 12 rows · n = 3 features',
      pattern: 'storage',
      headers: ['size ft²', 'beds', 'age', 'price $k'],
      values: HOUSES.slice(0, 5).map((h) => [String(h.size), String(h.beds), String(h.age), String(h.price)]),
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the same model, three ways',
      label: [
        '# one feature',
        'f = w * x + b',
        '',
        '# three features, written out',
        'f = w1*x1 + w2*x2 + w3*x3 + b',
        '',
        '# n features, as a loop',
        'f = sum(w[j] * x[j] for j in range(n)) + b',
        '',
        '# n features, as a dot product  <- this one',
        'f = np.dot(w, x) + b',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'tbl', target: 'code', label: 'one w per column' }],
}

import type { Scene } from '@graphlearning/flow'
import { HOUSES, mean, std } from './_data'

// §05. The three scalings, computed off the real twelve houses so the numbers in the table are the
// numbers. The code card carries the one thing that is a correctness bug rather than a style
// choice: the scaler is FITTED on the training split only. Scaling before the split leaks the test
// set's mean and standard deviation into training, and the resulting score is optimistic in a way
// nothing downstream will reveal.
const sizes = HOUSES.map((h) => h.size)
const mu = mean(sizes)
const sd = std(sizes)
const lo = Math.min(...sizes)
const hi = Math.max(...sizes)
const f = (v: number) => (Math.abs(v) < 10 ? v.toFixed(2) : Math.round(v).toString())

export const howToScale: Scene = {
  id: 'how-to-scale',
  title: 'Three ways, and the one rule that is not a preference',
  flow: 'TB',
  nodes: [
    {
      id: 'tbl',
      kind: 'table',
      label: 'size, scaled three ways',
      sub: `raw mean ${f(mu)} · raw σ ${f(sd)} · range ${lo}–${hi}`,
      pattern: 'storage',
      headers: ['raw', '÷ max', 'min-max', 'z-score'],
      values: HOUSES.filter((_, i) => i % 3 === 0).map((h) => [
        String(h.size),
        f(h.size / hi),
        f((h.size - lo) / (hi - lo)),
        f((h.size - mu) / sd),
      ]),
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the rule that is a bug if you break it',
      label: [
        'X_tr, X_te, y_tr, y_te = train_test_split(X, y)',
        '',
        'sc = StandardScaler()',
        'X_tr = sc.fit_transform(X_tr)   # FIT on train only',
        'X_te = sc.transform(X_te)       # reuse those numbers',
        '',
        '# sc.fit_transform(X) before the split leaks the test',
        "# set's mean and sigma into training. The score comes",
        '# out optimistic and nothing downstream tells you.',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'tbl', target: 'code', label: 'fit on train' }],
}

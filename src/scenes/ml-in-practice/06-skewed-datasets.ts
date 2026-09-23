import type { Scene } from '@graphlearning/flow'
import { confusion, accuracy, LEGIT_COUNT, VAL, pct } from './_data'

// §06. The section that retires accuracy. At 0.5% prevalence a function that never fires scores
// 99.5%, and the real model scores 99.645% — so the entire value of three iterations of work shows
// up in the THIRD decimal place of the number everyone quotes.
//
// The code card comes first and the matrix second, because the argument only lands in that order:
// you have to feel the two numbers being indistinguishable before splitting them apart is
// interesting. The matrix is the fix — the same predictions, not averaged.
const c = confusion(0.5)
const nul = accuracy({ tp: 0, fp: 0, fn: VAL.length - LEGIT_COUNT, tn: LEGIT_COUNT })

export const skewedDatasets: Scene = {
  id: 'skewed-datasets',
  title: '99.6% accurate, and so is doing nothing',
  flow: 'TB',
  nodes: [
    {
      id: 'acc',
      kind: 'code',
      hug: true,
      filename: 'the number that hides everything',
      label: [
        'y_val.mean()                  # 0.005   100 frauds in 20,000',
        '',
        `(y_pred == y_val).mean()      # ${accuracy(c).toFixed(5)}   three months of work`,
        `(0      == y_val).mean()      # ${nul.toFixed(5)}   def predict(x): return 0`,
        '',
        `# ${(accuracy(c) - nul).toFixed(5)} of accuracy is the whole difference between a working`,
        '# fraud model and a function that has never once fired.',
      ].join('\n'),
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'The same predictions, not averaged',
      sub: `20,000 held-out transactions at threshold 0.5 · ${pct(1 - LEGIT_COUNT / VAL.length, 1)} of them fraudulent`,
      pattern: 'user',
      headers: ['', 'model says legit', 'model says fraud'],
      values: [
        [`actually legit (${LEGIT_COUNT.toLocaleString('en-GB')})`, `${c.tn.toLocaleString('en-GB')}  ✓`, `${c.fp}  false alarm`],
        [`actually fraud (${c.tp + c.fn})`, `${c.fn}  MISSED`, `${c.tp}  ✓`],
      ],
    },
  ],
  edges: [{ source: 'acc', target: 'matrix', label: 'so stop averaging' }],
}

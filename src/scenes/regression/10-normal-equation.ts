import type { Scene } from '@graphlearning/flow'

// §10. The closed form, and the honest comparison. It is put LAST rather than first on purpose: a
// reader who meets it before gradient descent concludes the iteration was busywork, and then has
// nothing when they reach logistic regression, where no closed form exists. The table is the
// section — it is a decision, and a decision reads as a table.
export const normalEquation: Scene = {
  id: 'normal-equation',
  title: 'The answer in one step — and why it is not the answer',
  flow: 'TB',
  nodes: [
    {
      id: 'formula',
      kind: 'code',
      hug: true,
      filename: 'the normal equation',
      label: [
        'import numpy as np',
        '',
        'X = np.c_[np.ones(len(x)), x]        # add the b column',
        'theta = np.linalg.inv(X.T @ X) @ X.T @ y',
        '',
        '# no learning rate. no iterations. no convergence check.',
        '# b, w = theta',
      ].join('\n'),
    },
    {
      id: 'cmp',
      kind: 'table',
      label: 'which one, and when',
      sub: 'the closed form is the special case, not the general one',
      pattern: 'user',
      headers: ['', 'Normal equation', 'Gradient descent'],
      values: [
        ['learning rate', 'none to choose', 'you must tune α'],
        ['iterations', 'none', 'until it converges'],
        ['cost in n features', 'O(n³) — inverts a matrix', 'O(n) per step'],
        ['at n ≈ 10 000', 'too slow to use', 'fine'],
        ['works for', 'linear regression only', 'every model in this repo'],
      ],
    },
  ],
  edges: [{ source: 'formula', target: 'cmp', label: 'so why iterate?' }],
}

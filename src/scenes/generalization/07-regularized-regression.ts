import type { Scene } from '@graphlearning/flow'

// §07. What the extra term does to the update rule, which turns out to be one multiplication. The
// table is the point: every row except the middle one is unchanged from the regression course, and
// putting them side by side is what lets a reader check that rather than take it.
export const regularizedRegression: Scene = {
  id: 'regularized-regression',
  title: 'Shrink, then take the step you were going to take',
  flow: 'TB',
  nodes: [
    {
      id: 'cmp',
      kind: 'table',
      label: 'what the λ term changes',
      sub: 'only the weight update, and only by a factor',
      pattern: 'user',
      headers: ['', 'without λ', 'with λ'],
      values: [
        ['∂J/∂wⱼ', '1/m Σ (f − y)·xⱼ', '1/m Σ (f − y)·xⱼ + λ/m·wⱼ'],
        ['wⱼ update', 'wⱼ − α·(1/m Σ (f − y)·xⱼ)', 'wⱼ(1 − αλ/m) − α·(1/m Σ (f − y)·xⱼ)'],
        ['∂J/∂b', '1/m Σ (f − y)', 'unchanged'],
        ['b update', 'b − α·(1/m Σ (f − y))', 'unchanged'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the whole change, in one line',
      label: [
        'for _ in range(iterations):',
        '    err = X @ w + b - y',
        '    w = w * (1 - alpha * lam / m) - alpha * (X.T @ err) / m',
        '    b -= alpha * err.mean()',
        '#           ^^^^^^^^^^^^^^^^^^^^^',
        '#       with alpha=0.01, lam=0.03, m=24 this is 0.9999875:',
        '#       every weight loses a sliver of itself EVERY step, so',
        '#       a weight only stays large if the data keeps paying for it.',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'cmp', target: 'code', label: 'one multiplication' }],
}

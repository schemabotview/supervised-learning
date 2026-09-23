import type { Scene } from '@graphlearning/flow'

// §03. The update rule with a subscript, and the reassurance that nothing else changed. The two
// code cards are the section: the loop form makes the subscript concrete, the vector form is what
// anyone actually writes, and putting them side by side is what stops `w -= alpha * dw` from
// looking like a different algorithm.
//
// TB, not LR. Side by side these two cards make a ~1200x250 scene that fitView shrinks to 0.92 to
// fit the width, leaving most of the pane empty and the source small. Stacked they fill it.
export const gradientDescentForMany: Scene = {
  id: 'gradient-descent-for-many',
  title: 'The same rule, once per column',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      hug: true,
      filename: 'written out, one feature at a time',
      label: [
        'for _ in range(iterations):',
        '    err = X @ w + b - y          # (m,)',
        '',
        '    dw = np.zeros(n)',
        '    for j in range(n):           # <- the new subscript',
        '        dw[j] = (err * X[:, j]).mean()',
        '    db = err.mean()',
        '',
        '    w = w - alpha * dw           # ALL of them,',
        '    b = b - alpha * db           # from the same err',
      ].join('\n'),
    },
    {
      id: 'vec',
      kind: 'code',
      hug: true,
      filename: 'and how it is actually written',
      label: [
        'for _ in range(iterations):',
        '    err = X @ w + b - y',
        '    w -= alpha * (X.T @ err) / m',
        '    b -= alpha * err.mean()',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'loop', target: 'vec', label: 'identical' }],
}

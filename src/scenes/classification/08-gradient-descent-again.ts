import type { Scene } from '@graphlearning/flow'

// §08. The punchline of the whole course: after changing the model AND the cost, the update rule
// comes out character-for-character identical to linear regression's. The two code cards are put
// side by side precisely so the reader can check that claim rather than take it.
export const gradientDescentAgain: Scene = {
  id: 'gradient-descent-again',
  title: 'Different model, different cost, identical update',
  flow: 'TB',
  nodes: [
    {
      id: 'cmp',
      kind: 'table',
      label: 'what actually changed',
      sub: 'only the first row',
      pattern: 'user',
      headers: ['', 'Linear regression', 'Logistic regression'],
      values: [
        ['f(x)', 'w·x + b', 'g(w·x + b)'],
        ['cost', 'squared error', 'log loss'],
        ['∂J/∂wⱼ', '1/m Σ (f − y)·xⱼ', '1/m Σ (f − y)·xⱼ'],
        ['∂J/∂b', '1/m Σ (f − y)', '1/m Σ (f − y)'],
        ['the loop', 'unchanged', 'unchanged'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the whole of logistic regression',
      label: [
        'for _ in range(iterations):',
        '    f = sigmoid(X @ w + b)      # <- the only new line',
        '    err = f - y',
        '    w -= alpha * (X.T @ err) / m',
        '    b -= alpha * err.mean()',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'cmp', target: 'code', label: 'one line differs' }],
}

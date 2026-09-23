import type { Scene } from '@graphlearning/flow'

// §05. The boundary of this repo, drawn honestly. Same points twice: on the left nobody told the
// algorithm anything and it still found structure; on the right the colours were known in advance.
// Unsupervised learning is not a weaker supervised — it answers a different question, which is why
// it is a separate concept and not a later course here. Stacked rather than side by side, for the
// reason set out in §04 — a row of two plots is a wide scene, and fitView pays for that in type size.
export const noLabels: Scene = {
  id: 'no-labels',
  title: 'What happens when the y column is missing',
  padding: 0.10,
  nodes: [
    {
      id: 'unsup',
      kind: 'plot',
      label: 'No labels — find the structure',
      sub: 'the algorithm is told nothing and groups them anyway',
      pattern: 'external',
      plot: {
        x: { min: 0, max: 6, step: 1, label: 'x₁' },
        y: { min: 0, max: 6, step: 1, label: 'x₂' },
        equal: true,
        series: [
          {
            kind: 'scatter',
            color: '#9aa4b2',
            points: [
              [1.1, 4.6], [1.5, 5.1], [0.9, 4.1], [1.7, 4.4], [1.2, 5.3],
              [4.4, 4.5], [4.9, 5.0], [5.2, 4.2], [4.6, 5.3], [5.0, 4.7],
              [2.8, 1.2], [3.3, 1.6], [2.5, 1.7], [3.1, 1.0], [3.5, 1.4],
            ],
          },
        ],
      },
    },
    {
      id: 'sup',
      kind: 'plot',
      label: 'Labels — learn the boundary',
      sub: 'someone already decided what each point is',
      pattern: 'user',
      plot: {
        x: { min: 0, max: 6, step: 1, label: 'x₁' },
        y: { min: 0, max: 6, step: 1, label: 'x₂' },
        equal: true,
        series: [
          { kind: 'scatter', color: '#4f8ff7', points: [[1.1, 4.6], [1.5, 5.1], [0.9, 4.1], [1.7, 4.4], [1.2, 5.3]] },
          { kind: 'scatter', color: '#f0902f', points: [[4.4, 4.5], [4.9, 5.0], [5.2, 4.2], [4.6, 5.3], [5.0, 4.7]] },
          { kind: 'scatter', color: '#c98bff', points: [[2.8, 1.2], [3.3, 1.6], [2.5, 1.7], [3.1, 1.0], [3.5, 1.4]] },
        ],
      },
    },
  ],
  edges: [],
}

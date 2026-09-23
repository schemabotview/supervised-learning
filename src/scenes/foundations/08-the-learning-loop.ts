import type { Scene } from '@graphlearning/flow'

// §08. The shape every supervised algorithm in the next six courses has. Linear regression,
// logistic regression and a neural network differ only in what goes in the first two boxes; the
// loop does not change, which is why it is worth learning before any particular model.
//
// NO BACK-EDGE. The obvious drawing is a literal cycle — repeat → model — and it does not work:
// computeLayout is longest-path over a DAG, so an edge that closes the ring has no consistent
// depth to sit at. The first cut drew exactly that and the layout sprawled sideways into a thin
// band with "A model" stranded off to one side, at a scale where nothing was readable. The cycle
// is carried by the fourth box and the container's caption instead, which costs nothing: the
// narration is what says "and again", and the picture only has to hold the four stations.
export const theLearningLoop: Scene = {
  id: 'the-learning-loop',
  title: 'Every supervised algorithm is this loop',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      label: 'The loop',
      sub: '…and back to the top, a few thousand times',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'model', label: 'A model', sub: 'f with free parameters', pattern: 'network', icon: 'sigma' },
        { id: 'cost', label: 'A cost', sub: 'one number: how wrong', pattern: 'service', icon: 'gauge' },
        { id: 'step', label: 'A step', sub: 'nudge them downhill', pattern: 'user', icon: 'sortarrows' },
        { id: 'again', label: 'Repeat', sub: 'until it stops improving', pattern: 'storage', icon: 'repeat' },
      ],
      edges: [
        { source: 'model', target: 'cost', label: 'score it' },
        { source: 'cost', target: 'step', label: 'downhill?' },
        { source: 'step', target: 'again' },
      ],
    },
    {
      id: 'swap',
      label: 'Only the first two boxes differ',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-lin', label: 'Linear reg.', sub: 'wx + b · squared error', pattern: 'external', icon: 'ruler' },
        { id: 's-log', label: 'Logistic reg.', sub: 'sigmoid · log loss', pattern: 'external', icon: 'waves' },
        { id: 's-net', label: 'Neural net', sub: 'layers · cross-entropy', pattern: 'external', icon: 'brain' },
      ],
    },
  ],
  edges: [{ source: 'loop', target: 'swap', label: 'the loop itself never changes' }],
}

import type { Scene } from '@graphlearning/flow'

// §03. What "supervised" actually names: every training row carries the answer. The table is the
// content — the right-hand column is the supervision, and the whole method is that someone already
// did the work for those rows. The last node is what the fitted f is then asked to do.
//
// TB, not LR. Four nodes in a ROW — two of them tables — make a scene about 1600px wide and 250
// tall, and the scene pane is very nearly square, so fitView shrinks the whole thing to fit the
// WIDTH and every label goes with it. Stacked, the same four nodes fit the height at better than
// 1:1. Two wide nodes side by side are fine (see §06); four are not.
export const labelledPairs: Scene = {
  id: 'labelled-pairs',
  title: 'Supervised = every example comes with its answer',
  flow: 'TB',
  nodes: [
    {
      id: 'train',
      kind: 'table',
      label: 'training set',
      sub: 'the y column is the supervision',
      pattern: 'storage',
      headers: ['size ft²', 'beds', 'age', 'price $k'],
      values: [
        ['1420', '3', '12', '244'],
        ['1810', '4', '5', '312'],
        ['960', '2', '31', '178'],
        ['2350', '4', '2', '395'],
        ['1275', '3', '18', '221'],
      ],
    },
    { id: 'fit', label: 'Learning', sub: 'fit f to the pairs', pattern: 'service', icon: 'gears' },
    { id: 'f', label: 'f', sub: 'the fitted model', pattern: 'user', icon: 'sigma' },
    {
      id: 'new',
      kind: 'table',
      label: 'a house it has never seen',
      sub: 'no y column — that is the point',
      pattern: 'network',
      headers: ['size ft²', 'beds', 'age', 'price $k'],
      values: [['1680', '3', '9', '?']],
    },
  ],
  edges: [
    { source: 'train', target: 'fit', label: 'x and y together' },
    { source: 'fit', target: 'f' },
    { source: 'f', target: 'new', label: 'predict the missing cell' },
  ],
}

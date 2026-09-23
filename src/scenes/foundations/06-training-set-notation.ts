import type { Scene } from '@graphlearning/flow'

// §06. The notation, introduced against the object it describes rather than in the abstract. The
// table and the code card are the SAME five rows — the point is that m, x⁽ⁱ⁾ and y⁽ⁱ⁾ are just
// names for a shape you already have in front of you, and that the shape is two arrays.
//
// Keep the edge label SHORT. An edge label is a pill riding the midpoint, sized to its text, and
// the gap between these two cards is narrow — the first cut ("one row per example, one column per
// feature") was wide enough to sit on the table and hide a value in row 1.
export const trainingSetNotation: Scene = {
  id: 'training-set-notation',
  title: 'm, x⁽ⁱ⁾ and y⁽ⁱ⁾ — names for a table you already have',
  flow: 'LR',
  nodes: [
    {
      id: 'tbl',
      kind: 'table',
      label: 'the training set',
      sub: 'm = 5 rows · n = 3 features',
      pattern: 'storage',
      headers: ['i', 'size', 'beds', 'age', 'y'],
      values: [
        ['1', '1420', '3', '12', '244'],
        ['2', '1810', '4', '5', '312'],
        ['3', '960', '2', '31', '178'],
        ['4', '2350', '4', '2', '395'],
        ['5', '1275', '3', '18', '221'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the same table, in NumPy',
      label: [
        'import numpy as np',
        '',
        'X = np.array([[1420, 3, 12],   # x⁽¹⁾',
        '              [1810, 4,  5],   # x⁽²⁾',
        '              [ 960, 2, 31],',
        '              [2350, 4,  2],',
        '              [1275, 3, 18]])',
        '',
        'y = np.array([244, 312, 178, 395, 221])',
        '',
        'X.shape        # (5, 3)  ->  (m, n)',
        'X[0]           # x⁽¹⁾, one row, all features',
        'y[0]           # y⁽¹⁾ = 244',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'tbl', target: 'code', label: 'the same five rows' }],
}

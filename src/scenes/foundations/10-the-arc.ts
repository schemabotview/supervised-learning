import type { Scene } from '@graphlearning/flow'

// §10. The map, and the one API that runs through all of it. The code card is deliberately boring:
// every model in the next six courses is reached through the same three calls, so the reader can
// see now that what changes between chapters is the estimator on line 4 and nothing else. The
// container lists the six courses that follow WITHOUT numbering them — the house rule that lets
// this repo ship as a prefix.
export const theArc: Scene = {
  id: 'the-arc',
  title: 'One API, six courses of models to put through it',
  flow: 'LR',
  nodes: [
    {
      id: 'api',
      kind: 'code',
      hug: true,
      filename: 'the shape of every chapter that follows',
      label: [
        'from sklearn.model_selection import train_test_split',
        'from sklearn.linear_model import LinearRegression',
        '',
        'X_tr, X_te, y_tr, y_te = train_test_split(X, y)',
        '',
        'model = LinearRegression()      # <- only this line changes',
        'model.fit(X_tr, y_tr)           # learn the parameters',
        'model.score(X_te, y_te)         # the honest number',
      ].join('\n'),
    },
    {
      id: 'ahead',
      label: 'What is ahead',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-reg', label: 'Regression', sub: 'cost, and walking downhill', pattern: 'network', icon: 'ruler' },
        { id: 'a-many', label: 'Many features', sub: 'vectors, scaling, curves', pattern: 'network', icon: 'layers' },
        { id: 'a-cls', label: 'Classification', sub: 'sigmoid and log loss', pattern: 'user', icon: 'waves' },
        { id: 'a-gen', label: 'Generalizing', sub: 'bias, variance, regularize', pattern: 'user', icon: 'scale' },
        { id: 'a-prac', label: 'In practice', sub: 'what to try next, and why', pattern: 'service', icon: 'wrench' },
        { id: 'a-tree', label: 'Trees', sub: 'splits, forests, boosting', pattern: 'service', icon: 'tree' },
      ],
    },
  ],
  edges: [{ source: 'api', target: 'ahead', label: 'swap line 6' }],
}

import type { Scene } from '@graphlearning/flow'

// §09. Everything in the course, assembled into the object that makes it safe. A Pipeline is not a
// convenience wrapper — it is what makes the leakage rule of §05 structural rather than a thing you
// have to remember, because `fit` on the pipeline can only ever see the training split.
export const withScikitLearn: Scene = {
  id: 'with-scikit-learn',
  title: 'The pipeline is what makes the rule impossible to break',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'the whole course, assembled',
      label: [
        'from sklearn.pipeline import make_pipeline',
        'from sklearn.preprocessing import StandardScaler, PolynomialFeatures',
        'from sklearn.linear_model import SGDRegressor',
        '',
        'model = make_pipeline(',
        '    PolynomialFeatures(degree=2, include_bias=False),',
        '    StandardScaler(),',
        '    SGDRegressor(max_iter=2000, learning_rate="adaptive"),',
        ')',
        '',
        'model.fit(X_tr, y_tr)      # every step fits on TRAIN only',
        'model.score(X_te, y_te)    # and transforms test with those',
      ].join('\n'),
    },
    {
      id: 'order',
      label: 'The order is not arbitrary',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'o-poly', label: 'Expand first', sub: 'x² before you scale it', pattern: 'user', icon: 'boxes' },
        { id: 'o-scale', label: 'Then scale', sub: 'x² spans a huge range', pattern: 'user', icon: 'scale' },
        { id: 'o-fit', label: 'Then fit', sub: 'on a well-shaped bowl', pattern: 'user', icon: 'gears' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'order', label: 'why this sequence' }],
}

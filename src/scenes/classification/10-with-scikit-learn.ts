import type { Scene } from '@graphlearning/flow'

// §10. The library, and the three traps in its defaults. `predict` silently applies 0.5, which §09
// just spent a section arguing is a choice; `C` is inverse regularization and is on by default, so
// the fitted coefficients are already shrunk before the next course explains why; and a logistic
// coefficient is a log-odds, not a probability, which is the misreading that produces confidently
// wrong sentences in reports.
export const withScikitLearn: Scene = {
  id: 'with-scikit-learn-logistic',
  title: 'Three defaults worth knowing about',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'logistic regression, end to end',
      label: [
        'from sklearn.linear_model import LogisticRegression',
        '',
        'clf = LogisticRegression()      # C=1.0 -> ALREADY regularized',
        'clf.fit(X_tr, y_tr)',
        '',
        'clf.predict(X_te)               # applies 0.5 for you',
        'clf.predict_proba(X_te)[:, 1]   # the number you usually want',
        '',
        '(clf.predict_proba(X_te)[:, 1] > 0.2).astype(int)   # your rule',
        '',
        'clf.coef_        # log-odds per unit, NOT probability',
        'np.exp(clf.coef_)  # odds multiplier — the readable form',
      ].join('\n'),
    },
    {
      id: 'traps',
      label: 'The three',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-thresh', label: 'predict() hides 0.5', sub: 'use predict_proba', pattern: 'warn', icon: 'ruler' },
        { id: 't-reg', label: 'C = 1.0 by default', sub: 'not an unpenalised fit', pattern: 'warn', icon: 'scale' },
        { id: 't-coef', label: 'coef_ is log-odds', sub: 'exponentiate to read it', pattern: 'warn', icon: 'sigma' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'traps', label: 'read before trusting' }],
}

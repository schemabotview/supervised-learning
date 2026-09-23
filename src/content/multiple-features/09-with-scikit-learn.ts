import type { Section } from '../types'

export const withScikitLearn: Section = {
  id: 'with-scikit-learn',
  title: 'Assembling it',
  scene: 'with-scikit-learn',
  slide: `## The pipeline makes the rule impossible to break

Everything in this course, as one object.

### Why the order is what it is
1. **PolynomialFeatures** — expand first, so the new columns exist
2. **StandardScaler** — then scale, because x² spans a far bigger range than x
3. **SGDRegressor** — then fit, on a well-shaped bowl

Scale before expanding and you scale the originals, then immediately un-scale them by squaring.

### What the pipeline actually buys you
\`model.fit(X_tr, y_tr)\` fits **every step** on the training split only. \`model.score(X_te, y_te)\` transforms the test set using the numbers learned from train.

The leakage rule from §05 stops being something you have to remember. It becomes **structural** — the pipeline has no way to see the test set during \`fit\`.

### And it survives cross-validation
Hand a pipeline to \`cross_val_score\` and each fold re-fits the scaler on that fold's training rows. Hand it a pre-scaled array and every fold is contaminated.`,
  narration:
    "Let us put the whole course into one object, because scikit-learn has a construct that does something better than save you typing — it makes the mistake from section five impossible. Look at the code. Three steps, in a pipeline. Polynomial features, then the standard scaler, then the regressor. Take the order first, because it is not arbitrary. Expand first: create the squared and interaction columns while you still have the raw values. Then scale, because those new columns are exactly the ones with the extreme ranges — x squared on a feature running one to five spans one to twenty-five. And then fit, on a bowl that is now well shaped. If you scale before expanding, you carefully normalise your original columns and then immediately undo it by squaring them, which is the worst of both worlds. Now the part that matters. When you call model dot fit on the training split, every step in that pipeline fits on the training split. The scaler computes its mean and sigma from training rows only. When you then call model dot score on the test set, each step transforms using the numbers it learned from training. Look at what that does to the rule from section five. It stops being a thing you have to remember at three in the afternoon on a Friday. It becomes structural. The pipeline has no mechanism by which it could see the test set during fit, because you did not hand it the test set. And there is a second, bigger payoff that shows up the moment you start doing cross-validation. If you hand a pipeline to cross val score, every fold re-fits the scaler on that fold's own training rows — which is correct, and which almost nobody does by hand. If instead you scale your array once up front and then cross-validate on it, every single fold is contaminated by every other fold, and your cross-validation scores are quietly wrong. That is the real reason to use a pipeline. Not tidiness. Correctness that you get for free.",
}

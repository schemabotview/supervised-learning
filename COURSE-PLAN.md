# supervised-learning — course plan

The full section plot for the seven-course spine. `CLAUDE.md` is the operational summary; this is
the detail.

**68 sections.** Courses 1–4 (39 sections) are the shippable prefix.

Three decisions, taken before a line was authored, run through every course below:

- **The seam is not the syllabus.** The source material is the DeepLearning.AI / Stanford Machine
  Learning Specialization, whose second course ("Advanced Learning Algorithms") is neural networks
  for weeks 1–2 and then *advice for applying ML* and *decision trees* for weeks 3–4. Those last two
  weeks are here, not in `../deep-learning`, because neither is about neural networks: bias and
  variance are how you debug **any** learner, and a tree is the other classical model. Moving them
  is what makes all three ML repos coherent subjects rather than three arbitrary slices.
- **scikit-learn is the spine, but the maths comes first.** Every course states the model and its
  cost before it calls a library. The `fit` / `predict` / `score` triple is introduced in course 1
  and never changes — the consistency *is* part of the teaching.
- **One worked dataset per course, carried all the way through.** Housing for regression, tumour
  classification for logistic, and so on. A new dataset per section costs the reader a re-orientation
  they did not ask for.

---

## 01 · `foundations` — What Machine Learning Is (10) ✅ authored

1. `what-is-ml` — classical programming writes the rule; ML fits it. The arrow of authorship reversed
2. `rules-that-keep-growing` — the hand-written spam filter that never closes, and the reframe
3. `supervised` — every example arrives with its answer; x, y, and the row where y is missing
4. `regression-vs-classification` — is y a number or a label? The split that picks model, cost and score
5. `unsupervised` — what is still possible with no y column, and why it is a different concept
6. `the-training-set` — m, n, x⁽ⁱ⁾, y⁽ⁱ⁾ against the table they describe; why X and y are two arrays
7. `the-model` — a form with the numbers left blank; three (w, b) through one cloud of points
8. `the-loop` — model → cost → step → repeat; only the first two boxes differ per algorithm
9. `the-only-score` — zero training error proves nothing; the held-out split, stated before it is needed
10. `the-toolkit` — `fit` / `predict` / `score`, and the map of the six courses ahead

## 02 · `regression` — Regression and Gradient Descent (10)

1. `the-line` — f(x) = wx + b against real data; reading a prediction off it
2. `what-wrong-means` — the residual, and why the squared one is the one that gets used
3. `the-cost-function` — J(w, b) as a surface over the parameters, not over the data
4. `cost-in-one-parameter` — fix b, sweep w: the parabola, and the bottom of it
5. `the-cost-surface` — both parameters at once: contours, and the shape of the bowl
6. `gradient-descent` — the update rule as "step downhill, proportionally to the slope"
7. `the-learning-rate` — too small crawls, too large diverges; what each looks like on the curve
8. `the-derivative` — where ∂J/∂w actually comes from, done once, by hand
9. `running-it` — the descent path drawn on the contours, and what convergence looks like
10. `normal-equation` — the closed form, why it exists for this model only, and when to prefer it

## 03 · `multiple-features` — Many Features at Once (9)

1. `more-columns` — from one feature to n; the model as a sum, then as a dot product
2. `vectorization` — the same arithmetic, one NumPy line; why it is faster, not just shorter
3. `gradient-descent-for-many` — the update rule with a subscript, and nothing else new
4. `feature-scaling` — why unscaled features make the bowl a canyon, and descent zig-zag
5. `how-to-scale` — mean normalization vs standardization, and fitting the scaler on train only
6. `is-it-converging` — the learning curve of J against iteration, and what each failure mode looks like
7. `feature-engineering` — a new column that encodes what you know; area from width × depth
8. `polynomial-regression` — a curve from a linear model, by squaring the feature
9. `with-scikit-learn` — `Pipeline`, `StandardScaler`, `SGDRegressor`, and the leakage the pipeline prevents

## 04 · `classification` — Classification (10) ✅ authored

1. `why-not-a-line` — fitting a straight line to 0/1 labels, and the outlier that ruins it
2. `the-sigmoid` — squashing any real number into (0, 1), and reading the output as probability
3. `the-decision-boundary` — where wx + b = 0, and what the model actually draws
4. `non-linear-boundaries` — polynomial features, and a circle as a decision boundary
5. `why-not-squared-error` — the non-convex cost, and the local minima it creates
6. `log-loss` — the two branches, and why each one punishes confident-and-wrong so hard
7. `the-simplified-cost` — folding both branches into one line with y and (1 − y)
8. `gradient-descent-again` — the identical update rule, and the one thing that changed
9. `thresholds` — 0.5 is a choice; moving it, and what it trades away
10. `with-scikit-learn` — `LogisticRegression`, `predict_proba`, and reading the coefficients

## 05 · `generalization` — Overfitting, Bias and Variance (9)

1. `underfit-and-overfit` — the same data, three model complexities, side by side
2. `the-split` — train / validation / test, and what each one is allowed to be used for
3. `bias-and-variance` — the two failure modes as numbers: J_train and J_cv together
4. `learning-curves` — error against training-set size, and what more data can and cannot fix
5. `a-baseline` — human-level performance, and why an error of 15% may be excellent
6. `regularization` — shrinking the parameters, and the λ term added to the cost
7. `regularized-regression` — the modified update rule, and what it does to the fit
8. `choosing-lambda` — the validation sweep, and the U-shaped curve it produces
9. `the-diagnosis-table` — high bias or high variance, and the fix that follows from each

## 06 · `ml-in-practice` — Making a Model Better (10)

1. `the-iterative-loop` — choose → train → diagnose → change; the cycle a project actually runs
2. `deciding-what-to-try` — the menu of six fixes, and which diagnosis licenses which
3. `error-analysis` — reading a hundred misclassified examples by hand, and what it saves
4. `adding-data` — targeted collection beats more of the same; augmentation and synthesis
5. `transfer-learning` — borrowing a model trained on someone else's problem
6. `skewed-datasets` — why 99.5% accuracy can be worthless, and the confusion matrix
7. `precision-and-recall` — the two numbers, what each misses, and F1
8. `the-tradeoff` — moving the threshold along the precision-recall curve
9. `the-full-cycle` — scoping, data, modelling, deployment, monitoring, and the loop back
10. `fairness-and-ethics` — where harm enters, and the checks that catch it before release

## 07 · `trees` — Decision Trees and Ensembles (10)

1. `the-tree-model` — a sequence of questions; reading a prediction off the path
2. `how-a-split-is-chosen` — the greedy search, one feature and one threshold at a time
3. `measuring-purity` — entropy, and what a perfectly mixed node scores
4. `information-gain` — the weighted drop in impurity, and the split that maximises it
5. `when-to-stop` — depth, minimum samples, and the tree that memorises if you let it
6. `categorical-and-continuous` — one-hot encoding, and thresholds on a numeric feature
7. `regression-trees` — the same algorithm with variance in place of entropy
8. `why-many-trees` — one tree is unstable; sampling with replacement, and bagging
9. `random-forests` — decorrelating the trees by restricting the features at each split
10. `boosting` — fitting the next tree to what the last one got wrong; XGBoost, and when to use trees

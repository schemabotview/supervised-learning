import type { Section } from '../types'

export const withScikitLearn: Section = {
  id: 'with-scikit-learn',
  title: 'Three defaults worth knowing',
  scene: 'with-scikit-learn-logistic',
  slide: `## The library is four lines. The defaults are the lesson

\`LogisticRegression().fit(X, y)\` and you are done. Three of its defaults will bite you.

### 1 · \`predict\` hides a threshold
It applies 0.5 silently — the choice §09 just spent a section arguing is yours. Use \`predict_proba(X)[:, 1]\` and threshold where *you* decide.

### 2 · \`C = 1.0\` means it is already regularized
\`C\` is **inverse** regularization strength, and it is on by default. You never fitted the unpenalised model you think you fitted. Smaller C = more shrinkage. Course 5 is about what that does and how to choose it.

### 3 · \`coef_\` is in log-odds
Not probability. A coefficient of 0.7 does **not** mean "70%", and it does not mean a fixed change in probability — the same step moves p a lot near the boundary and almost nothing out in the tails.

\`np.exp(coef_)\` → an **odds multiplier**: 2.0 means each extra unit doubles the odds. That sentence is safe to put in a report.`,
  narration:
    "Finally, the library, and it is going to look anticlimactic — which is the point, because everything you now understand is happening inside four lines. Import logistic regression, construct it, fit it, predict. Same three-method shape as every other estimator: fit, predict, score. What I want to spend this section on is not the API, it is three defaults, because each one quietly contradicts something we spent a section establishing. Default one. Predict applies a threshold of nought point five for you, silently. We just spent an entire section on the fact that that number is a judgement call that belongs to you and depends on what each mistake costs. The library hard-codes it, and unless you know, you will never see the decision being made. So the habit is: reach for predict proba, take column one, which is the probability of the positive class, and apply your own threshold. It is one extra line and it keeps a decision visible that should be visible. Default two, and this one genuinely surprises people. There is a parameter C, set to one point zero, and C is inverse regularization strength. Regularization is on by default. Which means that if you fit this and then read off the coefficients and reason carefully about what the model learned, you are reasoning about a model that has already been deliberately shrunk towards zero, and not the unpenalised fit you thought you had. Smaller C means more shrinkage, larger C means less. We have not covered what that does yet — it is the whole of course five — but I want you to know now that it is there and switched on, because that is the kind of default that produces confident, wrong sentences in a write-up. Default three is not really a default, it is a misreading, and it is the most common one. The fitted coefficients live in coef underscore, and a logistic coefficient is in log-odds. If you see nought point seven, that does not mean seventy percent, and it does not mean a fixed increase in probability either. It cannot — the same one-unit step moves the probability a great deal near the boundary and essentially nothing out in the flat tails, which you can see just by looking at the sigmoid. What is constant is the effect on the log-odds. So exponentiate it. If exp of the coefficient is two point zero, then each extra unit of that feature doubles the odds of the positive class. That is a true sentence, it is a readable sentence, and it is the one to put in a report. And that closes the course. You changed the model to put a sigmoid around it, you changed the cost to log loss because squared error went non-convex, and then the update rule came out identical to the one you already had. Which means you have not learned a new algorithm. You have learned that the one you had is more general than it looked.",
}

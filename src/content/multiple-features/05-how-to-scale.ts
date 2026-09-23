import type { Section } from '../types'

export const howToScale: Section = {
  id: 'how-to-scale',
  title: 'How to scale',
  scene: 'how-to-scale',
  slide: `## Three ways, and one rule

### Divide by the maximum
\`x / max(x)\` → lands in roughly 0 to 1. Crude, one line, often enough.

### Min-max
\`(x − min) / (max − min)\` → exactly 0 to 1. Sensitive to a single outlier, which sets the range on its own.

### Z-score (standardization)
\`(x − μ) / σ\` → mean 0, standard deviation 1. **The default.** Outliers move it, but they do not own it the way they own min-max.

### The rule that is a bug if you break it
**Fit the scaler on the training split only.** Then apply those same numbers to the test set.

\`sc.fit_transform(X)\` before the split leaks the test set's mean and σ into training. Your score comes out optimistic, and nothing downstream will tell you — it looks like a good model right up until it meets real data.

### A target worth aiming at
Roughly −1 to 1 per feature. It does not need to be exact. −3 to 3 is fine; −1000 to 1000 is not.`,
  narration:
    "Three ways to do it, and then one rule that matters more than the choice between them. First, divide by the maximum. Take every value, divide by the largest one in the column, and everything lands between zero and one. It is crude, it is one line, and honestly it is often enough. Second, min-max scaling. Subtract the minimum, divide by the range. Now the column runs from exactly zero to exactly one. The weakness is right there in the formula: both ends are set by single values, so one freak outlier — one mansion, one data entry error — defines the entire range and squashes everything else into a corner. Third, the z-score, also called standardisation. Subtract the mean, divide by the standard deviation. The column now has mean zero and standard deviation one, and values run to roughly plus or minus two or three. This is the default, and the reason is robustness: an outlier still moves the mean and the sigma, but it does not own them the way it owns a minimum or a maximum. Look at the table to see all three on the same real column. Now the rule, and this one is not a style preference — it is a correctness bug, and it is on the code card. Fit the scaler on the training split only. Compute the mean and the standard deviation from the training rows, and then apply those same two numbers to the test rows. What you must not do is call fit underscore transform on the whole dataset and then split it. If you do, the mean and sigma you scaled by were computed partly from the test set. Information from data the model is supposed to have never seen has leaked into training. And here is why it is insidious: nothing breaks. No error, no warning. Your test score just comes out a little better than it should, so you ship a model you believe in slightly more than you ought to. Finally, how close do you need to get? Not very. Roughly minus one to one per feature is the aim. Minus three to three is fine. Nought point five to two is fine. What is not fine is one column at minus one to one and another at zero to ten thousand — that is the canyon again.",
}

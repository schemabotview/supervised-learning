import type { Section } from '../types'

export const logLoss: Section = {
  id: 'log-loss',
  title: 'Log loss',
  scene: 'log-loss',
  slide: `## Confident and wrong costs unboundedly much

Two branches, one per label.

### When y = 1
\`loss = −log(f)\`

- f = 0.99 → **0.01**. Right and confident: almost free
- f = 0.5 → 0.69. Hedging: a modest bill
- f = 0.1 → **2.3**. Wrong and confident: expensive
- f → 0 → **∞**

### When y = 0
\`loss = −log(1 − f)\` — the mirror image, same rule pointing the other way.

### The asymptote is the mechanism
There is no ceiling. Say "0.001" about something that then happens and you pay an **unbounded** penalty.

That is what forces *honest* probabilities rather than merely correct ranking. Squared error caps the penalty at 1, so under it being confidently wrong is cheap — and one catastrophic miss can be bought off with a hundred easy cases.`,
  narration:
    "Here is the cost, and I want to do it as two plots rather than as algebra, because the shape is the argument. Take the case where the true label is one — the tumour really is malignant. The loss is minus the log of f, where f is whatever probability the model assigned. That is the left-hand curve. Read it from the right. If the model said nought point nine nine — confident, and correct — the loss is about nought point zero one. Essentially free. If it hedged and said nought point five, the loss is about nought point six nine, which is a real but modest bill for not committing. And if it said nought point one — confidently wrong — the loss is two point three. Twenty-three times the confident-and-correct case. Now keep going left, and this is the important part. As f approaches zero, the loss does not level off. It goes to infinity. There is no ceiling. A model that says there is a one in a thousand chance of something, and then that thing happens, pays an unbounded penalty for having said so. The right-hand plot is the y equals zero case, minus log of one minus f, and it is the exact mirror image — the same rule pointing the other way. Now, why does that asymptote matter so much? Because it is what forces the model to output honest probabilities rather than merely ranking things correctly. Under squared error the worst you can possibly score on one example is one, since both f and y are between zero and one. Being catastrophically, confidently wrong costs about the same as being mildly wrong. Under log loss it does not — it costs arbitrarily more. And the reward for being right is bounded, which is the other half of the same coin: you cannot compensate for one confident disaster by being slightly more confident on a hundred easy cases. The arithmetic simply does not let you. That asymmetry is the whole design.",
}

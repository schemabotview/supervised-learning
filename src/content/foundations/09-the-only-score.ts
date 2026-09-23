import type { Section } from '../types'

export const theOnlyScoreSection: Section = {
  id: 'the-only-score',
  title: 'The only score that counts',
  scene: 'the-only-score',
  slide: `## Zero error on the training set proves nothing

Both curves were fitted to the **same blue points**. The red one passes through every single one of them. Its training error is zero.

### Now look at the purple points
They were never shown to either model. They come from the same process. They sit in the **gaps between** the training points — and the red curve is at its worst exactly there. The straight line is not.

### What went wrong
The red curve **memorised** the training set instead of learning from it. It has no opinion about anything it has not already seen.

### The fix, and it is not optional
**Hold data back.** Split before you fit, score on the half the model never touched.

That number is the only one that means anything — and it is the one that will be worse than you hoped.`,
  narration:
    "I want to show you the most expensive mistake in this field before you have a chance to make it. Look at the plot. Those blue points are a training set — eleven of them. Two models have been fitted to exactly those eleven points. The straight green line, and the red curve that snakes up and down. Now, if you score these two on the data they were trained on, the red curve wins, and it does not win narrowly — it wins perfectly. It passes through every single blue point. Its training error is zero. Not small. Zero. The green line does not go through any of them exactly. By the only measurement we have discussed so far, the red curve is the better model, and it is not close. Now look at the purple points. Those were never shown to either model. They came from the same process — the same kind of houses, the same underlying relationship — they were just held back. And look what happens. The green line sits right among them. The red curve, which fitted the training data perfectly, sails past every one of them, sometimes by an enormous margin. The ranking has completely inverted. Here is what went wrong. The red curve did not learn the relationship. It memorised the answers. Every wiggle in it exists to hit one particular training point, and between those points it is doing something arbitrary, because nothing constrained it there. It has no opinion at all about data it has not already seen, which is the only kind of data that will ever matter once this thing is deployed. So the fix, and it is not optional and it is not a refinement you add later. Hold data back. Before you fit anything, split your data, put some aside, and do not look at it. Fit on one part, score on the part the model never touched. That number — the one from the held-out data — is the only number that means anything. And I will tell you now: it will be worse than the training number, every time, for every model you ever build. That is not a bug. A model that scores the same on both is simply one you have not yet tested properly.",
}

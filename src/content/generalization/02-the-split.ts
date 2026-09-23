import type { Section } from '../types'

export const theSplit: Section = {
  id: 'the-split',
  title: 'Train, validation, test',
  scene: 'the-split',
  slide: `## Three splits, three jobs, and no sharing

40 houses → **train 24 · validation 8 · test 8**.

### What each is allowed to do
- **Train** — fits w and b. The model sees these rows.
- **Validation** — picks *between* models: which degree, which λ. Never fitted on; always chosen with.
- **Test** — read **once**, at the very end, to report a number.

### Why validation and test are separate
Try 12 degrees, keep the best validation score, and it is now the **best of 12 draws** — optimistic by construction. You did not fit w to it, but you fitted your *choice* to it.

The test set is clean only because nothing was ever chosen using it.

### Split so each part spans the range
Cutting at 3,200 ft² hands validation only the large houses, and every score afterwards measures **extrapolation**, not generalization.

### Once you look at test, you are done
If a bad test score sends you back to tune, it has become a second validation set.`,
  narration:
    "So we need a second number, measured on rows the model has not seen. That is one split. It turns out you need two, and the reason for the second one is subtle enough that people skip it for years. Here are the forty houses, cut three ways. Twenty-four for training, eight for validation, eight for test — and notice on the plot that all three colours are scattered right across the size range. That is deliberate and I will come back to it. Training is the easy one. These are the rows gradient descent actually fits w and b to. The model sees them. Validation is the interesting one. The model is never fitted to these rows — but you use them constantly, to choose between models. Which degree? Which value of lambda? You fit each candidate on train, score each on validation, and keep the winner. Test is the strict one. You read it once, at the very end, to report a number to someone. Now — why can validation not do that job too? Because of what choosing does. Suppose you try twelve degrees and keep whichever scored best on validation. That winning score is not a fair estimate any more. It is the best of twelve draws, and the best of twelve draws is optimistic by construction — some of that model's advantage is that it happened to suit those eight particular houses. You did not fit the parameters to validation, but you absolutely fitted your choice to it, and a choice is a kind of fitting. The test set is honest only because nothing was ever selected using it. Now that point about spanning the range. It is tempting to split by just slicing the table — first thirty rows for training, last ten for test. Do not. The table is sorted by size, so you would train on small and medium houses and then test exclusively on large ones. Your score would be measuring extrapolation, which is a much harder and completely different problem, and you would conclude your model was broken when it was your split that was broken. Each split has to look like the whole. And one discipline point that people find annoying and that is the entire value of the thing. Once you look at the test set, you are finished. If a disappointing test score sends you back to try another degree, then test has quietly become a second validation set, and you no longer have an honest estimate of anything at all. If you cannot resist, do not look until you are ready to stop.",
}

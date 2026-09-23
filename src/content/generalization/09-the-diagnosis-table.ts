import type { Section } from '../types'

export const theDiagnosisTable: Section = {
  id: 'the-diagnosis-table',
  title: 'The diagnosis table',
  scene: 'the-diagnosis-table',
  slide: `## Two numbers in, one decision out

Compare \`J_train\` to your baseline, and \`J_val\` to \`J_train\`. The two gaps pick the fix.

### High bias — gap to baseline is large
Too simple; it needs **more capacity**: more features, a higher degree, a **smaller** λ.

### High variance — gap to J_train is large
Too flexible for the data you have; it needs **less rope**: more data, fewer features, a **larger** λ.

### The lists point opposite ways
Guess the diagnosis and you do not merely fail to improve the model — **you make it worse.** Measuring costs four lines.

### The two expensive mistakes
1. **More data for a bias problem** — a flat learning curve stays flat
2. **Tuning against test** — it stops being an estimate the moment you act on it`,
  narration:
    "Let us collect the whole course into the thing you will actually come back to, six months from now, in the middle of a project that is not working. Measure two numbers: training error and validation error. Compare training error to your baseline — that gap is bias. Compare validation error to training error — that gap is variance. Then read off the table. Large first gap, small second gap: high bias. The model is too simple, and it needs more capacity. More features, or better ones. A higher degree. A smaller lambda. Small first gap, large second gap: high variance. The model has too much freedom for the amount of data you have, and it needs less rope. More training data. Fewer features. A larger lambda. Both gaps large: you have both problems at once, which does happen. Fix the bias first, because a model that is too simple cannot tell you anything reliable about its own variance, then measure again. And both gaps small: you are done. Stop tuning, read the test set once, write the number down. Now look at those two middle lists side by side, because this is the single most important thing in the course. They point in opposite directions. Bias wants lambda lower; variance wants it higher. Bias wants more features; variance wants fewer. There is no move that helps both. Which means if you guess the diagnosis wrong, you do not merely fail to improve the model — you actively make it worse, and then you are further from working than when you started, with no idea why. That asymmetry is the entire reason for measuring rather than guessing, and measuring costs you about four lines of code. Two mistakes are worth naming because they are the expensive ones. The first is throwing data at a bias problem. It is the most natural instinct in machine learning, it feels like diligence, and the learning curve in section four told you in advance that it does nothing: a flat curve stays flat, and you can lose a quarter to it. The second is tuning against the test set. You look at test, it is disappointing, you try another lambda. The moment you act on that number, test has become a validation set, and you have no honest estimate of anything left. And that is the course. You cannot remove error, only move it between two buckets, and the whole skill is knowing which bucket yours is in.",
}

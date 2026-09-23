import type { Section } from '../types'

export const theResidual: Section = {
  id: 'the-residual',
  title: 'What "wrong" means',
  scene: 'the-residual',
  slide: `## The gap, one house at a time

For each house the line predicts \`f(x⁽ⁱ⁾)\`. The house actually sold for \`y⁽ⁱ⁾\`. The gap between them is the **residual**:

\`f(x⁽ⁱ⁾) − y⁽ⁱ⁾\`

### Twelve gaps, not one
Every red stick is one house's error. A line that is good here may be poor there — the model has to answer for all twelve at once.

### Why not just add them up
Some gaps are positive, some negative. They **cancel**, and a badly wrong line can score zero.

### Why not absolute value
It does not cancel — but it has a corner at zero, so it has no derivative there. And the derivative is the thing the next four sections run on.

### So: square them
No cancelling, smooth everywhere, and it punishes one big miss more than several small ones.`,
  narration:
    "Before you can find the best line, you need to be able to say what wrong means, precisely enough to compute it. Here is the raw material. I have drawn a deliberately bad line — too flat, obviously wrong — because against the good line the errors are too small to see, and I want you to see them. Each red stick is one house. The top of the stick is what actually sold. The bottom, where it meets the grey line, is what this model predicted. The length of the stick is the gap, and the gap has a name: the residual. f of x i, minus y i. Prediction minus reality. Notice there are twelve of them. This is the thing people rush past. You do not get one error, you get one per example, and a line that hugs the small houses beautifully may be hopeless on the large ones. The model has to answer for all twelve simultaneously, which means you need to boil twelve numbers down to one. So how? First instinct: add them up. That fails immediately, and it fails badly. Look at the sticks — some houses are above the line, some below. Positive gaps and negative gaps cancel out. You can draw a line that is wildly wrong for every single house and still total exactly zero, as long as the misses balance. Useless. Second instinct: take the absolute value first, then add. That is genuinely better — nothing cancels any more, and you get an honest total. But absolute value has a problem that is not obvious yet, and it is the reason almost nobody uses it here. It has a sharp corner at zero. At that corner there is no slope, no derivative, and starting in two sections' time the derivative is the only thing this algorithm has to steer by. So: square them. Squaring kills the sign, so nothing cancels. It is smooth everywhere, corner and all. And it has a property worth wanting on purpose — because the error is squared, one house you are miles out on hurts far more than several you are slightly out on. That is usually the behaviour you want. Sum of squared residuals. That is the raw material, and next we turn it into a function.",
}

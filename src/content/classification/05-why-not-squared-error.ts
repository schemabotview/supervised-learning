import type { Section } from '../types'

export const whyNotSquaredError: Section = {
  id: 'why-not-squared-error',
  title: 'Why the cost had to change too',
  scene: 'why-not-squared-error',
  slide: `## The same data, two costs, two different shapes

Both curves are the real cost of the real tumours, swept over w.

### Squared error on a sigmoid is not convex
There is a long, nearly **flat shelf**: the slope is 0.0002 there, so descent takes microscopic steps and effectively stops, a long way from the answer.

Not a rounding problem — the shape of the function. The bowl is gone, and with it the guarantee that downhill leads somewhere.

### Why squaring breaks it
The sigmoid **saturates**. Once z is large and negative, f is around 0.001 and *barely moves* when w changes. Squared error multiplies that already-tiny sensitivity by another small factor, and the slope vanishes.

### Log loss restores the bowl
The lower panel is the same data under log loss: one minimum, a usable slope everywhere, nothing to get stuck on.

That is not luck. The log is chosen to **cancel the exponential** in the sigmoid — which is the whole reason it works.`,
  narration:
    "We fixed the output. Now we have to fix the cost, and it is not for tidiness — the old one genuinely breaks. Look at the upper panel. That is squared error, computed on the real tumours, swept across values of w with b held fixed. And it is not a bowl. Over on the left there is a long, almost perfectly flat shelf. Now think about what gradient descent does there. The slope is nearly zero, so the step is nearly zero, so it barely moves. And it is nowhere near the answer — the minimum is way over to the right. If you happened to initialise w somewhere on that shelf, which is entirely plausible, your model would sit there making imperceptible progress while the cost curve told you everything was fine. This is what non-convex means, and it is the guarantee we have been relying on for two courses quietly disappearing. And it is not a numerical artefact. It is the shape of the function. Here is why it happens. The sigmoid saturates. Once z is large and negative, f is something like nought point zero zero one, and — critically — it barely changes when you nudge w, because you are out on the flat tail of the curve. So the derivative of f with respect to w is already tiny out there. Squared error then multiplies that tiny number by another factor of f minus y, which is also small, and the product effectively vanishes. Two small things multiplied is how you get a dead flat region. Now look at the lower panel. Same data, same sweep, same everything, under log loss instead. One minimum. A usable slope at every point, including far out on the left where squared error had nothing. It is a bowl again. And that is not luck or a happy accident. The logarithm is chosen specifically because it undoes the exponential inside the sigmoid — the two cancel, algebraically, and what falls out is the well-behaved surface you are looking at. Which is what the next two sections build.",
}

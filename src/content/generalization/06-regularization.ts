import type { Section } from '../types'

export const regularization: Section = {
  id: 'regularization',
  title: 'Regularization',
  scene: 'regularization',
  slide: `## Keep every feature. Make the weights small

Dropping features is blunt: you must guess *which*, and lose whatever they knew. Regularization shrinks them all instead.

### One term, added to the cost
\`J = 1/2m · Σ(f(x) − y)² + λ/2m · Σwⱼ²\`

The first term wants to fit the data; the second wants every weight near zero. **λ sets the exchange rate.**

### What it does here
Same degree-12 model, same 24 houses:

- **λ = 0** → largest weight **848**, J_val **0.104**
- **λ = 0.03** → largest weight **1.40**, J_val **0.017**

A 600-fold collapse, and the wild curve becomes the sensible one — *without removing a feature.*

### Why big weights are the problem
A wiggle needs large opposing coefficients that cancel everywhere except where it wiggles. Deny it those and the wiggle is unaffordable; the smooth trend is not.

**Never penalise b** — it only sets the height, and shrinking it drags the whole curve toward zero.`,
  narration:
    "So you have diagnosed high variance. One fix is more data, which the last section covered and which is often not available. Another is to use fewer features — but that is a blunt instrument, because you have to guess which ones to drop, and whatever they knew goes with them. Regularization is the third option and usually the best: keep every feature, and make the weights small. Here is the whole idea. Take the cost function and add one term: lambda over two m, times the sum of the squared weights. That is it. Now the cost has two jobs that pull against each other. The first term wants to fit the data, as always. The second term wants every weight to be near zero, and does not care about the data at all. Lambda sets the exchange rate between them. Large lambda and the model cares mostly about small weights. Small lambda and it cares mostly about fit. Now look at the plot, because this is one of those cases where the numbers are more dramatic than the explanation. Both curves are degree twelve, fitted to the same twenty-four houses, differing only in that one term. The red one has no penalty. Its largest weight is eight hundred and forty-eight, and it validates at nought point one oh four — that is the wild curve from section one, diving down near the right edge and then shooting off the top. The green one has lambda set to nought point oh three. Its largest weight is one point four. Eight hundred and forty-eight down to one point four — a six hundred fold collapse — and its validation error is nought point oh one seven, which is essentially the best score anything achieved in this course. Same model. Same thirteen parameters. Same data. Nothing was removed. Now why do small weights buy smoothness? Think about what a wiggle actually requires. To make a curve bend up and down rapidly, the high-order terms have to be large and they have to very nearly cancel each other everywhere except in the little region where the wiggle happens. That cancellation only works with big opposing coefficients. Take those away and the wiggle becomes unaffordable — but the smooth underlying trend does not, because that only needed modest coefficients in the first place. The penalty is not banning complexity; it is making complexity expensive, so the model buys it only where the data insists. Last detail, and it is a real bug if you get it wrong. The sum runs over the weights only. Never include b. The intercept just sets the overall height of the curve — it does not contribute any wiggle at all — and penalising it pulls your whole model down toward zero for no benefit whatsoever. Every library does this correctly; hand-rolled implementations frequently do not.",
}

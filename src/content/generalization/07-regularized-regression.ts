import type { Section } from '../types'

export const regularizedRegression: Section = {
  id: 'regularized-regression',
  title: 'The update rule, again',
  scene: 'regularized-regression',
  slide: `## Shrink, then take the step you were going to take

Differentiate \`λ/2m · Σwⱼ²\` with respect to wⱼ and you get \`λ/m · wⱼ\`. That is the entire change.

### The update, rearranged
\`wⱼ := wⱼ(1 − αλ/m) − α · 1/m Σ(f − y)xⱼ\`

The second half is **exactly** the update from course 2. The first half is new, and it is a multiplication.

### Read it as two moves
1. **Shrink** wⱼ by a constant factor — with α = 0.01, λ = 0.03, m = 24 that factor is **0.9999875**
2. Take the ordinary gradient step

Every weight loses a sliver of itself on *every* iteration, whatever the data says. A weight only stays large if the gradient keeps pushing it back up — if the data keeps **paying** for it.

### b is untouched
No λ in its cost term, so no λ in its update.

### And that is the whole implementation
One line changes. Everything else — scaling, the learning rate, convergence plots — is unchanged.`,
  narration:
    "Let us make that concrete, because the implementation change is smaller than the explanation. We added lambda over two m times the sum of w j squared to the cost. Differentiate that with respect to a particular w j. The sum of squares differentiates to two w j, the two cancels the two in the denominator, and you are left with lambda over m times w j. So the gradient picks up one extra term, and it is just a scaled copy of the weight itself. Substitute that into the update and rearrange, which is where it gets pleasant. You get w j becomes w j times the quantity one minus alpha lambda over m, minus alpha times the usual one over m sum of f minus y times x j. Look at the second half of that. It is the gradient descent update from course two, character for character, unchanged. The first half is the new bit, and it is not an addition or a subtraction — it is a multiplication by a constant slightly less than one. So read the update as two moves that happen every iteration. First, shrink every weight by a fixed factor. With alpha at nought point oh one, lambda at nought point oh three and twenty-four examples, that factor is nought point nine nine nine nine eight seven five. Second, take exactly the step you would have taken anyway. And that first move is where the whole mechanism lives. Every weight loses a tiny sliver of itself on every single iteration, regardless of what the data says. It is a constant, patient downward pressure. So a weight can only stay large if the gradient term keeps pushing it back up — if the data keeps paying for it, every step, for the whole of training. The weights that were large only to make a wiggle through three particular houses do not get that support, and they decay away. The weights carrying the real trend do, and they survive. That is why this is sometimes called weight decay, and that name describes the mechanism better than regularization does. Note the b update has no lambda in it. There was no lambda in b's part of the cost, so there is none in its derivative. And that is genuinely the whole implementation. One line changes in the loop. Everything you learned in the last three courses still applies untouched: feature scaling, diagnosing the learning rate, plotting J against iteration to check convergence. You have not learned a new algorithm again. You have learned a new cost that the algorithm you already have will minimise without noticing the difference.",
}

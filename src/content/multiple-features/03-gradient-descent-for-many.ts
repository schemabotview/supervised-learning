import type { Section } from '../types'

export const gradientDescentForMany: Section = {
  id: 'gradient-descent-for-many',
  title: 'Gradient descent, widened',
  scene: 'gradient-descent-for-many',
  slide: `## The same rule, once per column

\`wⱼ ← wⱼ − α · ∂J/∂wⱼ\`  for every j
\`b  ← b − α · ∂J/∂b\`

### What actually changed
A subscript. That is all.

\`∂J/∂wⱼ = 1/m · Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾) · xⱼ⁽ⁱ⁾\`

The residual is the same residual. It is now weighted by **feature j's** value instead of by the single x.

### The one thing to get right, again
All n+1 updates come from the **same residual vector**, computed once before any of them is applied. Update w₁ and then recompute the error for w₂, and you are descending a surface that no longer exists.

The vectorized form gets this right for free — \`err\` is computed once, on the line above.

### Why the vectorized form is safer
It is not only shorter. \`err\` is computed once on its own line and every update reads from it, so the simultaneous-update rule you had to remember by hand becomes **structural** — array arithmetic has no way to apply the updates one at a time.`,
  narration:
    "Here is the good news about generalising gradient descent to many features: almost nothing happens. The update rule was w becomes w minus alpha times the derivative of J with respect to w. It is now w subscript j becomes w subscript j minus alpha times the derivative of J with respect to w subscript j, for every j from one to n. A subscript appeared. That is the change. And the derivative itself barely moves either. It used to be one over m, times the sum of the residual times x. It is now one over m, times the sum of the residual times x subscript j — feature j's value for that example. The residual is exactly the same residual; what differs between the n partial derivatives is only which column you weight it by. Which makes sense: to know how w two should move, you look at how the errors line up with feature two specifically. Look at the left-hand card, at the inner loop over j. That is the new subscript made concrete, and I have written it out because it is worth seeing once. But look also at the line above it — err is computed once, outside that loop, and every one of the n updates reads from that same err. This is the simultaneous-update rule from the previous course, and it is now n plus one updates instead of two, so it matters more. Compute the whole error vector first. Then apply all the updates. If you update w one and then recompute the error before doing w two, you are taking a step down a surface that has already changed underneath you. Now look at the right-hand card. Four lines. That is the entire algorithm for any number of features. X at w plus b minus y gives you every residual at once as a vector. X transpose at err gives you every partial derivative at once as a vector. And then you subtract. The n plus one updates happen in one array operation, simultaneously, because that is simply how array arithmetic works — the correctness rule you had to remember by hand is now structural.",
}

import type { Section } from '../types'

export const normalEquation: Section = {
  id: 'normal-equation',
  title: 'The closed form',
  scene: 'normal-equation',
  slide: `## The answer in one step — and why it is not the answer

For linear regression *specifically*, you can solve for the minimum directly. No iterations, no learning rate:

\`θ = (XᵀX)⁻¹ Xᵀy\`

### So why did we just do all that?

The comparison is on the left. Read the **last row** first.

### There is no closed form for anything else
Not for logistic regression. Not for a neural network. Nobody has found one, and it is not for want of trying.

Gradient descent is what you *have* — so linear regression was the place to learn it, because it is the one model where you can actually see the bowl.

### The other rows bite too
Inverting an n×n matrix costs about **n³**. Ten features is nothing. Ten thousand — an ordinary size once you one-hot a few categorical columns — is unusable, while gradient descent barely notices.

### In practice
\`LinearRegression\` in scikit-learn uses a direct solver, not gradient descent. For this one model, let it.`,
  narration:
    "I owe you something, and I have deliberately left it until last. For linear regression specifically, you do not have to iterate at all. There is a formula that gives you the exact best w and b in one shot. It is called the normal equation, and it is on the card: theta equals X transpose X, inverted, times X transpose y. No learning rate. No iterations. No convergence check. No watching a curve. You run it once and you have the mathematically optimal answer. So — reasonably — why did we just spend nine sections walking downhill? Look at the table, and read the last row first, because it is the one that matters. That formula works for linear regression. Only. It exists because squared error with a linear model produces a system you can solve algebraically, and that is a genuinely special property that almost nothing else has. When you reach logistic regression, next course but one, there is no closed form. None. Nobody has found one and it is not for want of trying. When you reach a neural network, the idea is not even faintly plausible. Gradient descent is what you have, so gradient descent is what was worth learning, and linear regression was the place to learn it where you could actually see the bowl. The other rows matter too, in practice. That formula inverts a matrix, and inverting an n by n matrix costs roughly n cubed. At ten features that is nothing. At a thousand it is noticeable. At ten thousand features — which is a perfectly ordinary size once you start one-hot encoding categorical columns — it is unusable, while gradient descent barely notices, because its cost per step grows linearly rather than cubically. One honest note to finish. When you call LinearRegression in scikit-learn, it does not run gradient descent. It uses a direct solver, a numerically careful relative of that formula. For this one model, on ordinary data, that is the right choice and you should let it. What you learned here was not how to fit a line. It was the loop, on the one model where you could watch it happen.",
}

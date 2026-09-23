import type { Section } from '../types'

export const gradientDescentAgain: Section = {
  id: 'gradient-descent-again',
  title: 'The identical update',
  scene: 'gradient-descent-again',
  slide: `## Different model, different cost, identical update

\`∂J/∂wⱼ = 1/m · Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾) · xⱼ⁽ⁱ⁾\`

Character for character, that is linear regression's derivative.

### It is not a coincidence
The log in the cost and the exponential in the sigmoid cancel. What survives is *residual times feature* — which is why the logarithm was the right choice, not merely a convenient one.

### But f means something different
Linear: \`f = w·x + b\`. Here: \`f = g(w·x + b)\`. The **formula** is identical; the quantity is not.

### So the implementation changes by one line
Push \`X @ w + b\` through the sigmoid. Every line after that is untouched.

### Everything you learned still applies
Feature scaling. The learning-rate diagnosis. The J-against-iteration plot. Simultaneous updates. All of it, unchanged.`,
  narration:
    "And here is the payoff for all that algebra. Take the derivative of the log-loss cost with respect to w j, and what you get is: one over m, times the sum of f minus y, times x j. Now go back and look at what we derived in the regression course. It is the same expression. Not similar — identical, character for character. And that is not a coincidence, it is the thing the logarithm was chosen to produce. The log in the cost and the exponential inside the sigmoid cancel each other when you differentiate. All the mess falls out, and what survives is residual times feature, which is about the simplest thing that expression could possibly be. That cancellation is the real reason log loss is the right cost and not merely a convenient one. Now, one caution, because the identical formula hides a genuine difference. f does not mean the same thing. In linear regression f is w dot x plus b — a raw number that can be anything. Here f is g of w dot x plus b — a probability between zero and one. The formula for the gradient is the same. The quantity you plug into it is not. Look at the comparison table and you can see exactly what moved: the model changed, the cost changed, and the two derivative rows did not. Which means the implementation changes by precisely one line. You compute f by pushing X at w plus b through the sigmoid instead of using it raw, and every line after that is untouched. And here is why this matters beyond saving you some typing. Everything you learned in the last two courses still applies, unchanged. Feature scaling — still necessary, for exactly the same geometric reason. The learning rate diagnosis — same three shapes, same prescriptions. Plotting J against iteration — same habit. Simultaneous updates — same trap. You have not learned a second algorithm. You have learned a second model that the algorithm you already had can train.",
}

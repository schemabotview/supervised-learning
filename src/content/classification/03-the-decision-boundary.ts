import type { Section } from '../types'

export const theDecisionBoundary: Section = {
  id: 'the-decision-boundary',
  title: 'The decision boundary',
  scene: 'the-decision-boundary',
  slide: `## The boundary is where z = 0

Predict 1 when \`f(x) ≥ 0.5\`. But \`g(z) ≥ 0.5\` exactly when \`z ≥ 0\`.

So the rule is not about the curve at all:

**predict 1 when \`w·x + b ≥ 0\`**

### Why that matters
The boundary is the set of points where \`w·x + b = 0\`. With one feature that is a single value: \`x = −b/w\`. With two features it is a **straight line**. With n, a flat hyperplane.

The output is curved. The boundary is not.

### Reading the fitted model
\`z = 2.9x − 7.6\` → boundary at \`x = 7.6/2.9 ≈ 2.62 cm\`

- **w** controls how *steep* the transition is — how fast confidence changes
- **b** slides the boundary left or right

### A steep curve is a confident model
Large w means the model jumps from "almost certainly benign" to "almost certainly malignant" over a tiny range. That is a strong claim, and §05 of the next course is about when it is not earned.`,
  narration:
    "Now, where exactly does the answer flip? You predict malignant when f of x is at least nought point five. But f is g of z, and we established that g of z is at least nought point five exactly when z is at least zero. So the condition simplifies, and it simplifies to something that has nothing to do with the sigmoid at all. Predict one when w dot x plus b is greater than or equal to zero. The curve drops out. That is worth sitting with, because it is the thing people find surprising about logistic regression. The output is a curve. The boundary is not. The boundary is the set of points where w dot x plus b equals exactly zero, and that is a linear condition. With one feature, as here, it is a single number on the axis. With two features it is a straight line across the plane. With n features it is a flat hyperplane. The sigmoid bends the output, not the boundary. Look at the fitted model on the plot. z equals two point nine x minus seven point six, so z is zero when x is seven point six over two point nine, which is about two point six two centimetres. That is the orange vertical rule, and it is the only place anything changes. Left of it, benign. Right of it, malignant. Everything the model does is that one number. And notice it does not get everything right — there is a small malignant tumour to the left of the rule and a large benign one to the right. No vertical line on this axis catches both, because the two groups genuinely overlap, and a boundary drawn to separate them perfectly would be lying about the data. Now look at what the two parameters do, because they do different jobs. b slides the boundary left or right — it sets where the decision sits. w controls how steep the transition is, which is to say how quickly confidence changes as you cross. A large w gives you a near-vertical curve: the model goes from almost certainly benign to almost certainly malignant over a few millimetres. That is a very strong claim about the world, and it is worth being slightly suspicious of. When a model is extremely confident right up to the boundary, it is often because it has been allowed to become so — and the next course, on regularization, is largely about that.",
}

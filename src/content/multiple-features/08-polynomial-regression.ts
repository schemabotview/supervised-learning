import type { Section } from '../types'

export const polynomialRegression: Section = {
  id: 'polynomial-regression',
  title: 'Polynomial regression',
  scene: 'polynomial-regression',
  slide: `## A curve, from a model that is still linear

The straight line misses at both ends and in the middle. Add one column — **x²** — and the same model bends:

\`f(x) = w₁x + w₂x² + b\`

### "Linear" was never about the picture
It means linear **in the parameters**. f is a weighted sum of *whatever columns you give it*, and the weights enter linearly no matter how curved those columns are.

So this is still linear regression. Same cost, same gradient descent, same everything.

### Scaling is now mandatory, not advisory
If x runs 1–5, then x² runs 1–25 and x³ runs 1–125. You have built the canyon on purpose. **Always scale after expanding.**

### And the obvious temptation
If x² is better than x, is x⁵ better still? It will fit the training data better. Every time.

That is the next course.`,
  narration:
    "Look at the grey dashed line first. That is the best straight line through this data, and you can see it is wrong in a characteristic way — it sits above the points at both ends and below them through the middle. The data curves. Prices rise with size, but they rise less steeply at the top end, which is exactly what you would expect: the tenth bedroom adds less than the third did. A straight line cannot do that. So add a column. Take the size, square it, and call that x two. Now the model is w one times x, plus w two times x squared, plus b, and look at the orange curve — it bends, and it follows the data. Now, the thing that trips people up. Is this still linear regression? Yes. Completely. And the reason is that linear was never a statement about the shape of the picture. It means linear in the parameters. Look at the model: w one and w two both appear to the first power, multiplied by something and added up. The something happens to be curved, but that is not what the word is describing. f is a weighted sum of whatever columns you hand it, and the weights enter linearly regardless of how bent those columns are. So the cost function is unchanged. The gradient is unchanged. Gradient descent is unchanged. You have not switched algorithms, you have added a column. Two warnings. First, scaling is now not advisory, it is mandatory. If x runs from one to five, then x squared runs from one to twenty-five, and x cubed runs from one to a hundred and twenty-five. You have deliberately constructed features on wildly different scales — you have built the canyon on purpose. Always scale after expanding, and the pipeline in the next section does it in the right order for you. Second, and more interesting: if x squared fits better than x, does x to the fifth fit better still? And the answer is yes. It will fit your training data better. Every single time, without exception, no matter what the data is. Which should be setting off an alarm, because we have seen a curve that fitted training data perfectly before. That is the whole of the next course.",
}

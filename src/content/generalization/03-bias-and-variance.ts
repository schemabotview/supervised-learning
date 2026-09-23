import type { Section } from '../types'

export const biasAndVariance: Section = {
  id: 'bias-and-variance',
  title: 'Bias and variance',
  scene: 'bias-and-variance',
  slide: `## Two numbers, read together

Neither J_train nor J_val means much alone. The **pair** is the diagnostic.

### High bias — underfitting
\`J_train\` high, \`J_val\` ≈ \`J_train\`

Degree 1: 0.036 and 0.035. The model does equally badly everywhere, including on the rows it was fitted to. Nothing is being memorised; there is nothing to memorise *with*.

### High variance — overfitting
\`J_train\` low, \`J_val\` ≫ \`J_train\`

Degree 12: 0.008 and 0.104. Excellent on what it saw, hopeless on what it did not.

### The shape on the plot
J_train falls **monotonically** — more flexibility always fits the training rows better. J_val falls, bottoms out, then climbs. The bottom is the model you want.

### Degree 2 or degree 3?
0.0154 against 0.0153. The process really is degree 2, and **8 validation houses cannot tell the difference**. That is not a flaw in the method; it is the method being honest about its resolution.`,
  narration:
    "Now we can put the two numbers side by side and watch them across every degree from one to twelve. This plot is the diagnostic the whole rest of the course runs on, so it is worth reading slowly. Blue is training error. Red is validation error. Start on the left, at degree one. Both curves are up around nought point oh three five, and they are practically on top of each other. That is the high bias signature, and the together-ness is the informative part. The model is doing equally badly on the houses it was fitted to and the houses it has never seen — which tells you it has not memorised anything. There is nothing to memorise with. A straight line has two parameters; it could not overfit twenty-four houses if it wanted to. Now move right. Both curves drop sharply between degree one and degree two — that is the model finally being allowed to bend, and it is a real improvement. And then they part company. Blue keeps drifting down, all the way to degree twelve. It never turns round, and it never will, because adding flexibility can only ever fit the training rows better. Red bottoms out, flattens, and then takes off — nought point oh two six at degree ten, nought point one oh four at degree twelve. That separation between the two curves is the high variance signature: low on what it saw, bad on what it did not. So the recipe is: read them together. Both high and together means bias — the model is too simple. Low training with a big gap means variance — the model is too flexible for the data you have. And the bottom of the red curve is the model you actually want. One honest detail, because I would rather you hear it from me than notice it yourself. The minimum here is at degree three, at nought point oh one five three, and degree two is right behind at nought point oh one five four. I will tell you a secret about this data: I generated it, and the true relationship is a degree two curve. So the correct answer is degree two, and the validation set picked degree three by a margin of one ten-thousandth. That is not a bug. Eight validation houses simply do not carry enough information to separate two models that close, and the honest reading of that plot is not degree three — it is that anything from two to five is fine and you should stop agonising. Knowing the resolution of your own measurement is part of using it.",
}

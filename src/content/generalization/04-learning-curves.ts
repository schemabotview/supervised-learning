import type { Section } from '../types'

export const learningCurves: Section = {
  id: 'learning-curves',
  title: 'Learning curves',
  scene: 'learning-curves',
  slide: `## Will more data help? The curve tells you before you buy it

Error against **training-set size**, both panels on the same axes.

### High bias: degree 1 (upper)
The curves meet by m ≈ 16 and flatten at **0.035** — nearly twice the 0.019 floor.

They have converged. Going from 24 houses to 240 moves a plateau that is already flat. **More data is wasted money.**

### High variance: degree 7 (lower)
A gap of **0.078** at m = 14, down to **0.008** by m = 24, with J_val dropping toward the floor.

Still closing when the data runs out → **more data is exactly the fix.**

### Reading any learning curve
J_train **rises** with m, J_val **falls**, and they converge. Everything is in two questions: *how high*, and *have they met yet*.

### Why they cross above
J_train ends a hair above J_val. With 8 validation houses the two measure nearly the same thing, so which lands on top is luck. The **level** is the content.`,
  narration:
    "Here is the most directly useful plot in the course, because it answers a question that costs real money: will collecting more data help? Both panels show error against the number of training examples. Same axes on both, so you can compare the shapes. Upper panel, degree one — our high bias model. Follow the blue training curve from the left. At four houses it is nearly zero, which makes sense: a straight line through four points can do quite well. As you add houses it climbs, because it is harder to satisfy twenty-four points with two parameters than four points. Meanwhile the red validation curve comes down from nought point one, because a line fitted to four houses is a bad line and a line fitted to twenty-four is a reasonable one. They approach each other, they meet around sixteen examples, and then — this is the bit — they go flat. Both sitting at about nought point oh three five. The dashed line is the noise floor, nought point oh one nine, the best score anything could achieve here. So they have converged at nearly twice the floor, and they converged eight houses ago. Now ask the question. What would another twenty-four houses do? Look at the right-hand end of those curves and answer honestly: nothing. They are flat. You would be extending a horizontal line. That is what high bias looks like from a budget perspective, and it is why more data is the classic wrong answer to an underfitting problem — it is expensive, it is slow, and the curve told you in advance it would not work. Lower panel, degree seven, a model with far too much freedom for this data. Completely different shape. The training curve sits right down at the bottom — flexible models fit their training rows easily. The validation curve comes in from way up: it is at nought point one eight at ten examples, so far above this chart that I have started the curve at fourteen. And then it falls, and keeps falling, and by twenty-four it is almost touching the training curve near the floor. The gap goes from nought point oh seven eight down to nought point oh oh eight. And crucially, when the data runs out the gap is still closing. That is the high variance signature, and it is the case where more data genuinely is the fix — you are not changing the model at all, just giving it enough examples that it can no longer chase the noise. So the reading rule. Training error rises with m, validation error falls with m, and they converge. Everything is in two questions: how high do they converge, and have they converged yet. One honest wrinkle in the upper panel. The training curve actually ends a whisker above the validation curve, which is backwards from how this is usually drawn. That is not an error and I have not tidied it away. With a high bias model the two curves are measuring almost exactly the same thing, and with only eight validation houses, which one lands on top is luck. The level they meet at is the content. The ordering is noise.",
}

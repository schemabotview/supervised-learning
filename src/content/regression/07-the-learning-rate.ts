import type { Section } from '../types'

export const theLearningRate: Section = {
  id: 'the-learning-rate',
  title: 'The learning rate',
  scene: 'the-learning-rate',
  slide: `## Too small, about right, too large

Same curve, same start, same rule. Only \`α\` differs.

### α = 0.02 — too small
Twenty-five steps and still arriving. It *will* get there — possibly after a hundred thousand iterations you did not budget for.

### α = 0.10 — about right
Five steps, each shorter than the last, settled at the bottom.

### α = 0.30 — too large
Each step overshoots and lands **further up the far side** than it started. The next is bigger. **J goes up**, off the top of the frame, and soon you have \`inf\`.

### The threshold is a real number
Stable only while \`α < 2 / mean(x²)\` — here about **0.26**. You will never compute it. You find it by overshooting.

### Diagnosing it
Sweep \`0.001, 0.01, 0.1, 1\`, look at the second panel, then refine. Roughly 3× between values.`,
  narration:
    "Alpha is the one knob this algorithm has, and there is no formula that hands you the right value. You try some. But the failure modes are completely distinctive once you have seen them, so let us look at all three. Same curve, same starting point, same rule. The only thing that changes is alpha. Look at the top plot. The blue dots are alpha equals nought point zero two. Far too small. Those are twenty-five steps — twenty-five — and they are still strung out down the left-hand side of the curve, only just arriving. And here is the thing: this is not broken. It is converging. Every step is going the right direction. It will get there. It might take a hundred thousand iterations, on a model where each iteration touches your entire dataset, and you will sit watching a progress bar wondering whether it has hung. Correct but useless is still useless. The orange dots are alpha equals nought point one. This is the behaviour you want: five steps, each shorter than the last, and it has settled at the bottom. And the red dots are alpha equals nought point three, which is the interesting failure. Watch what happens. The first step is so long that it flies straight over the bottom and lands on the far side, higher up than where it started. Now it is on the right slope, so the derivative points the other way, and it steps back left. And it overshoots again, further. Each step is bigger than the last because each step lands somewhere steeper. The cost is going up. It is diverging, and within twenty iterations you will have infinity or not-a-number in your weights. Now, there is a real number behind that. The curvature of this cost is the mean of x squared, which for these twelve houses is seven point six nine, and the iteration is stable only while alpha stays below two divided by that — about nought point two six. Nought point three is over the line. You will almost never compute that number in practice; you find it by overshooting, which is why the diagnosis matters more than the theory. Now, the practical part, and it is the bottom plot. You cannot draw that top picture for a real model with a thousand parameters — but you can always plot J against iteration number, which is what this is: the same three runs, cost on the vertical, step count along the bottom. Going down and flattening, you are fine. Going down but barely, raise alpha. Going up, or bouncing around wildly, alpha is too big — drop it by a factor of ten and start again. A good habit is to sweep it: nought point zero zero one, nought point zero one, nought point one, one, look at the curves, then refine around whichever worked. Roughly threefold steps between values is about right.",
}

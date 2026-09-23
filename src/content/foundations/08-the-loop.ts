import type { Section } from '../types'

export const theLoop: Section = {
  id: 'the-loop',
  title: 'The loop every algorithm runs',
  scene: 'the-learning-loop',
  slide: `## Four boxes, and a cycle

Learn this shape once. Every supervised algorithm in the next six courses is an instance of it.

### The cycle
1. **A model** — a form with free parameters
2. **A cost** — one number saying how wrong the current parameters are
3. **A step** — nudge them in the direction that makes the cost smaller
4. **Repeat** — until it stops improving

### What actually varies
Only the first two boxes. Linear regression, logistic regression and a neural network differ in their *form* and their *cost* — the loop is identical.

### Why this is worth knowing now
When a new algorithm arrives, you have two questions, not ten: **what is the form, and what is the cost?**`,
  narration:
    "This is the shape of the whole subject, and I want you to have it before we do any particular algorithm, because it turns what looks like a long list of unrelated techniques into one idea with variations. Follow the cycle on the left. Box one, a model — we just did this — a form with free parameters. Box two, a cost. This is the piece we were missing at the end of the last section. A cost function takes your current parameters and returns one single number that says how wrong they are right now. Not a plot, not a description. One number, and lower is better. Box three, a step. Given that number, and given which direction makes it smaller, nudge the parameters that way. A little. Not all the way. Box four, repeat — go back to box one with your slightly better parameters and do it again. And again. Until the number stops going down. That is the loop. Now look at the row along the bottom, because this is the payoff. Linear regression: the form is a straight line, the cost is squared error. Logistic regression: the form is a sigmoid, the cost is log loss. A neural network: the form is a stack of layers, the cost is cross-entropy. Three algorithms that are taught in three different places and feel like three different subjects — and the only thing that differs between them is what sits in the first two boxes. The loop is identical. Genuinely identical, not roughly similar. So here is what that buys you. When a new algorithm turns up — and they will keep turning up, long after this course — you do not have ten questions to ask about it. You have two. What is the form, and what is the cost? Answer those and you already know how it is trained, because everything is trained the same way.",
}

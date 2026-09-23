import type { Section } from '../types'

export const theModel: Section = {
  id: 'the-model',
  title: 'What a model actually is',
  scene: 'choosing-parameters',
  slide: `## A shape, with the numbers left blank

A model is not a program you write. It is a **form** with free numbers in it.

### The simplest one
\`f(x) = wx + b\`

- **w** and **b** are the **parameters** — the blanks
- Every choice of (w, b) is a **different line** through the same points
- The form never changes. Only the numbers do

### So "training" means
Search the space of (w, b) for the pair that fits best.

### And "a trained model" is
That form, plus the numbers you landed on. Nothing more — a fitted model is the parameters.`,
  narration:
    "Here is what a model actually is, and the plot on the left is the whole idea. A model is not a program you sit down and write. It is a shape, with the numbers left blank. The simplest one in the field is this: f of x equals w x plus b. That is a straight line. w is the slope — how steep — and b is the intercept, where it crosses. Those two letters are called the parameters, and they are the blanks. Now look at the three lines drawn through those points. Every one of them is f of x equals w x plus b. Every one of them is the same model. The two grey dashed ones are not a different kind of thing — they are the same form with different numbers dropped into the blanks. The flat one has w equal to nought point nought five, so it barely rises at all and it misses the big houses badly. The steep one has w equal to nought point nine five, and it shoots up past everything on the right. And the orange one, w equal to nought point four two, goes through the middle of the cloud. Same equation, three times. So now the word training stops being mysterious. Training means: search the space of possible w and b, and find the pair that fits best. That is it. That is all it ever means. And notice what a trained model therefore IS. It is the form — which you chose — plus the two numbers you landed on. When you save a trained model to disk, what you are saving is the numbers. When somebody sends you a model, they are sending you numbers. For a straight line it is two of them. For a large neural network it is a few hundred billion of them. But the idea does not change between those two cases, which is worth holding on to. Now, I have been saying fits best as though it were obvious. It is not. What does best mean? That needs a definition, and defining it precisely is the next thing we do.",
}

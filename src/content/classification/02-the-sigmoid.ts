import type { Section } from '../types'

export const theSigmoid: Section = {
  id: 'the-sigmoid',
  title: 'The sigmoid',
  scene: 'the-sigmoid',
  slide: `## Any real number in, a probability out

\`g(z) = 1 / (1 + e⁻ᶻ)\`

### Three facts worth memorising
- **g(0) = 0.5** exactly. The midpoint is at z = 0, not at x = 0
- **z → +∞ gives g → 1**, but never reaches it
- **z → −∞ gives g → 0**, but never reaches it

It is always strictly between 0 and 1, which is exactly what a probability needs.

### The model, assembled
\`z = w·x + b\` → the same linear model as before, unchanged
\`f(x) = g(z)\` → squashed into (0, 1)

**Logistic regression is linear regression with one function wrapped round the output.**

### Read the output as a probability
\`f(x) = 0.7\` means *a 70% chance this is malignant*. That is a far more useful thing to hand a clinician than a bare label — and §09 is about what you do with it.`,
  narration:
    "Here is the function that fixes the first problem, and it is one of the most important shapes in the field. g of z equals one over one plus e to the minus z. It is called the sigmoid, or the logistic function, and the plot is what it does. Feed it any real number at all — minus a thousand, zero, plus a million — and what comes out is strictly between zero and one. Three facts worth committing to memory, and they are marked on the curve. At z equals zero, g is exactly nought point five. Dead centre. As z goes off to the right, g climbs towards one but never gets there — it approaches asymptotically, so there is no input that produces exactly one. And as z goes off to the left, g falls towards zero and likewise never arrives. Strictly between zero and one, always. Which is precisely the property a probability needs. Now let us assemble the model, and notice how little is new. Start with z equals w dot x plus b. That is the linear model from the last two courses, entirely unchanged — same weights, same intercept, same dot product. Then take that z, whatever it is, and pass it through g. That is it. That is logistic regression. It is linear regression with one function wrapped around the output. I want to stress how small a change that is, because the name makes it sound like a different subject. And now the output means something. f of x equals nought point seven says: this model thinks there is a seventy per cent chance this tumour is malignant. Compare that to what you actually want to hand a clinician. Not a bare label — malignant, take it or leave it — but a number they can weigh against everything else they know about the patient. That is a genuinely more useful object, and section nine is entirely about what you do with it.",
}

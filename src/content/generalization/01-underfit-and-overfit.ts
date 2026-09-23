import type { Section } from '../types'

export const underfitAndOverfit: Section = {
  id: 'underfit-and-overfit',
  title: 'Underfit and overfit',
  scene: 'underfit-and-overfit',
  slide: `## The same 24 houses, three amounts of flexibility

Last course ended on a straight line that missed at both ends. Here is what happens either side of it.

### Degree 1 — too rigid
\`J_train 0.036 · J_val 0.035\`

Both bad, and **equally** bad. The model is not confused by the data; it simply cannot bend.

### Degree 3 — about right
\`J_train 0.014 · J_val 0.015\`

Low, and close together. That pairing is what you are aiming for.

### Degree 12 — too flexible
\`J_train 0.008 · J_val 0.104\`

**The best training score of the three, and seven times the worst validation score.** It snakes through the points, and where the houses run out it leaves the chart entirely.

### The trap
Training error goes **down for ever** as you add flexibility. Judge a model by it and you will always pick the most complicated one you tried.`,
  narration:
    "The last course finished by fitting a straight line to these houses and noticing it missed — at both ends and in the middle. I said at the time that this was a signature with a name, and this course is about the name. So let us go either side of that line. Same twenty-four houses in all three panels, same axes, same everything. The only thing changing is how much the model is allowed to bend. Top panel, degree one. A straight line. Training error nought point oh three six, validation error nought point oh three five. Both bad — but notice they are bad in the same way and by the same amount. The model has not misunderstood the data; it simply does not have the shape to follow it. That is underfitting, and the technical name for it is high bias. Middle panel, degree three. Training nought point oh one four, validation nought point oh one five. Both low, and close together. That pairing — low, and close — is the target, and it is worth fixing in your head now because the rest of this course is about how to get back to it from either side. Bottom panel, degree twelve. And here is the number I want you to sit with. Its training error is nought point oh oh eight, which is the best of the three by a distance. On the data it was fitted to, this is the best model you have. Its validation error is nought point one oh four — seven times worse than the straight line that was too rigid to bend. Look at what the curve is doing. It snakes. It leans toward individual houses, because with thirteen parameters and twenty-four rows it has enough freedom to chase the noise as well as the signal. And out at the right-hand edge, where the training houses run out and there is nothing left to pin it down, it simply leaves the top of the chart. That last part matters more than it looks. Overfitting is worst where your data is thinnest — which is exactly where you are most likely to be asking the model a question. So here is the trap, stated plainly. Training error goes down for ever as you add flexibility. It went down every single time across those three panels, including the time it went catastrophically wrong. If you judge a model by the data you fitted it to, you will always choose the most complicated thing you tried. You need a second number, measured somewhere else.",
}

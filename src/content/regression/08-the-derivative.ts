import type { Section } from '../types'

export const theDerivative: Section = {
  id: 'the-derivative',
  title: 'Where the derivative comes from',
  scene: 'the-derivative',
  slide: `## The slope is the whole instruction

Three tangents on the same curve:

- **Left of the minimum** — slope is negative. \`w − α(negative)\` *increases* w. Moves right
- **Right of the minimum** — slope is positive. Subtracting it *decreases* w. Moves left
- **At the minimum** — slope is zero. Nothing moves

One rule, both directions, no \`if\` statement.

### Deriving it, once
\`J = 1/2m · Σ (wx + b − y)²\`

Chain rule: differentiating the square gives \`2(wx + b − y)\`, times the derivative of the inside. For w that inside derivative is \`x\`; for b it is \`1\`.

The 2 cancels the ½ — which is the only reason the ½ was ever there.

\`∂J/∂w = 1/m · Σ (wx + b − y) · x\`
\`∂J/∂b = 1/m · Σ (wx + b − y)\`

### Both are averages of the residual
For b, the plain average. For w, weighted by x — so a big house pulls the slope harder than a small one.`,
  narration:
    "Let us open up the derivative, because it is the piece that looks like it needs a maths degree and does not. Start with the geometry. I have drawn three tangent lines — three places on the curve, with the local slope drawn at each. On the left, well short of the minimum, the tangent slopes downwards: the derivative is negative. Now put that into the update rule. w becomes w minus alpha times a negative number. Subtracting a negative adds. So w increases, and we move right, towards the bottom. Correct. On the right of the minimum, the tangent slopes upwards; the derivative is positive; subtracting it decreases w and we move left. Also towards the bottom. Also correct. And at the bottom itself, the tangent is flat, the derivative is zero, and the update subtracts nothing. Notice there is no conditional anywhere. Nobody wrote if we are to the left, go right. The sign of the derivative handles both directions, and the size of it handles the step length. One line of arithmetic does all of it. Now the algebra, and we do it once, properly, so it is never mysterious again. J is one over two m, times the sum of w x plus b minus y, all squared. Differentiate with respect to w. The chain rule says: bring the power down and reduce it, which turns the square into two times the bracket, and then multiply by the derivative of what is inside the bracket. What is inside is w x plus b minus y. Differentiate that with respect to w and everything vanishes except x. So you get two, times the bracket, times x. And now look what the two does. It meets the one-half out front and they cancel. That is the entire reason the half was there — somebody, long ago, put it in specifically so this would happen. So the derivative with respect to w is one over m, times the sum of the residual times x. For b, the inside derivative is just one, so it is even simpler: one over m times the sum of the residuals. Both of them are averages of the residual. That is all they are. The b one is the plain average. The w one is weighted by x, which means a large house pulls on the slope harder than a small one — which is exactly right, because getting a large house wrong is evidence about the slope specifically.",
}

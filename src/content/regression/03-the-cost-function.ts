import type { Section } from '../types'

export const theCostFunction: Section = {
  id: 'the-cost-function',
  title: 'The cost function',
  scene: 'the-cost-function',
  slide: `## A point here is a whole line there

\`J(w, b) = 1/2m · Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾)²\`

Sum the squared residuals, average them, halve it.

### The move that matters
**J is a function of the parameters, not of the data.** The houses are fixed. w and b are the variables.

So there are two different pictures, and they are not the same picture:
- **Data space** — axes are size and price. A *line* lives here
- **Parameter space** — axes are w and b. That same line is a single *dot*

### Why halve it
The 2 cancels when you differentiate. Pure convenience, and it changes nothing about where the minimum is.

### The job, restated
Find the point in the lower picture where J is smallest.`,
  narration:
    "Now we turn twelve residuals into one number, and then do the thing that reframes the whole problem. The number first. Take each residual, square it, add them all up, divide by m to get an average rather than a total — so twelve houses and twelve hundred houses are on the same scale — and then halve it. That is the cost function, written J. The halving is pure convenience: when we differentiate in a few sections, the square brings down a factor of two, and the half cancels it. It makes the algebra tidier and it moves the minimum nowhere. Now the reframe, and this is the part worth slowing down for. Look at what J depends on. The houses are fixed — they sold, that is history, those numbers are never going to change. The things that can vary are w and b. So J is a function of w and b. Not of size, not of price. Of the parameters. Which means there are two completely different pictures in play, and confusing them is the single most common way to get lost in this material. The upper plot is data space. The axes are size and price. This is where houses live, and a choice of w and b shows up here as a whole line drawn across the picture. I have put three of them up: a flat one, a steep one, and the good one. The lower plot is parameter space. The axes are w and b. Nothing about houses appears anywhere. Every point on this plane is a possible model, and each of those three lines above is a single dot below. The flat line — small w, high b — sits up and to the left. The steep line — large w, low b — sits down and to the right. The good one sits between them. One line above, one dot below, and it is the same object seen two ways. And now the job can be stated properly for the first time. J assigns a number to every point in that lower plane. Find the point where that number is smallest. That is training. The rest of this course is how.",
}

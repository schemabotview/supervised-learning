import type { Section } from '../types'

export const gradientDescent: Section = {
  id: 'gradient-descent',
  title: 'Gradient descent',
  scene: 'gradient-descent',
  slide: `## Walk downhill, in steps the slope decides

\`w ← w − α · ∂J/∂w\`
\`b ← b − α · ∂J/∂b\`

### Read it as an instruction
The derivative points **uphill**. So subtract it — go the other way. \`α\` (the learning rate) says how big a step to take.

### Why the steps shrink on their own
The step length is proportional to the slope:
- Steep slope, far from the bottom — **long step**
- Shallow slope, getting close — **short step**
- Zero slope, at the bottom — **no step**. It stops

Nobody programs the slowing down. It falls out of the rule.

### The one thing to get right
Update w and b **from the same old values**, then assign. Update w first and use the new one to compute b's step, and you are descending a surface that no longer exists.`,
  narration:
    "Here is the algorithm, and it is two lines. w becomes w minus alpha times the derivative of J with respect to w. And the same for b. That is gradient descent, and it is the engine under almost everything in modern machine learning, including models with hundreds of billions of parameters. It genuinely is this. Read the rule as an instruction. The derivative — the slope — tells you which way is uphill. You want down. So subtract it. Alpha, called the learning rate, scales how far you move. Now watch the orange dots on the curve, because they show you something the formula alone does not. That is a real run: eight steps, alpha at nought point one, starting from w equals nought point zero two, over on the left. Look at the spacing. The first step is enormous — it leaps most of the way across. The second is shorter. The third shorter still. By the eighth, the dots are practically on top of each other. Nobody programmed that slowing down. There is no schedule, no counter, nothing that says take smaller steps as you go. It falls out of the rule. Far from the bottom the curve is steep, so the derivative is large, so the step is long. As you approach, the curve flattens, the derivative shrinks, the steps shrink with it. And exactly at the bottom, the slope is zero, so the update subtracts zero and the algorithm stops moving. It converges by construction. That property is why this works, and it is worth admiring for a second. Now the one implementation detail that bites people, and it is on the card. You must compute both updates from the same old values of w and b, and only then assign the new ones. If you update w first, and then use that brand-new w to compute b's step, you are no longer taking one step down the surface you measured — you are taking a step down a surface that has already changed. It sometimes still works, which is worse, because then you ship it. Use temporaries, or update simultaneously.",
}

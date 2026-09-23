import type { Section } from '../types'

export const featureScaling: Section = {
  id: 'feature-scaling',
  title: 'Why scaling is not optional',
  scene: 'feature-scaling',
  slide: `## The canyon, and the bowl it should have been

Size runs 800–4600. Bedrooms runs 2–6. A thousand-to-one difference in range.

### What that does to the bowl
Look at the two contour maps. Same algorithm, same data, different units:

- **Raw** — the contours stretch by roughly the ratio of the ranges. A long, thin canyon
- **Scaled** — near-circular

### Why the canyon is slow
Steepest descent moves **perpendicular to the contours**. In a canyon, perpendicular points mostly at the *wall*, not along the floor toward the minimum. So it zig-zags across, making very little progress in the direction that matters.

And a step size large enough to move usefully along the floor overshoots the walls. So you are forced to use a small α, and then everything is slow.

### The fix
Put every feature on roughly the same range. Then the steepest direction actually points at the answer.`,
  narration:
    "Here is a problem that looks cosmetic and is not. Size runs from eight hundred to four thousand six hundred. Bedrooms runs from two to six. Those two numbers live on scales that differ by about a thousand to one, and gradient descent cares enormously. Look at the two contour maps. Same algorithm, same houses, same cost function. The only difference is the units the features are measured in. On the left, raw features. The contours are not rings, they are a long thin canyon — stretched by roughly the ratio of the two ranges. On the right, after scaling, they are very nearly circular. Now, why does the canyon hurt? Remember the rule from last course: steepest descent moves perpendicular to the contours. On circular contours, perpendicular points straight at the middle, and you go there directly — that is the right-hand panel, a handful of steps in a nearly straight line. But in a canyon, perpendicular to the contour points mostly at the wall. Not along the floor. So the algorithm takes a step, hits the far wall, the gradient reverses, it steps back, hits the near wall, and it bounces — that is the zig-zag on the left. It is making progress along the canyon floor, but only a tiny amount per bounce, because almost all of each step is spent going across. And it is worse than slow, because there is a second bind. You might think: fine, take bigger steps. But the step that is a reasonable size along the floor is far too big across the canyon — it overshoots the wall entirely and diverges, exactly as we saw with too large an alpha. So the narrow direction sets your maximum learning rate, and the wide direction is the one you actually need to travel. You are forced into a small alpha, and then everything crawls. The fix is embarrassingly simple, and it is the next section. Put every feature on roughly the same range, and the canyon becomes a bowl.",
}

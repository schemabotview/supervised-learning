import type { Section } from '../types'

export const costInOneParameter: Section = {
  id: 'cost-in-one-parameter',
  title: 'The shape of the cost',
  scene: 'cost-in-one-parameter',
  slide: `## Hold b still, and sweep w

Two parameters is one too many to see at once. So pin \`b = 1.08\` and vary only w.

### What comes out is a parabola
Every point on that curve is **one line, scored against all twelve houses**:
- Far left, w near 0 — a flat line. High cost
- Far right, w near 1 — far too steep. High cost again
- One place in between where it bottoms out

### It is a parabola for a reason
Squared error is *quadratic* in w. Not roughly bowl-shaped — exactly a parabola, every time, for this model.

### Which is why this is easy
One minimum. No local traps, no bad starting points. Whichever way is downhill leads to the answer.`,
  narration:
    "Two parameters is one too many to see at once, so we are going to cheat for a moment. Pin b at one point zero eight — its best value, which I am handing you — and let only w vary. Now J depends on a single number, and a function of a single number can be drawn as a curve. Here it is, and it is a parabola. Read it carefully, because it is easy to look at this and forget what the axes are. The horizontal axis is w. Not size. Not price. There are no houses on this plot at all. Every single point along that curve represents one complete line, scored against all twelve houses at once. Take the point at the far left, where w is near zero. That is a nearly flat line, which fits the small houses tolerably and is hopeless on the large ones, so the total squared error is high. The curve is high there. Slide right to where w is nearly one. That line shoots up far too steeply, badly wrong at the top end, and the cost is high again. And somewhere in between, the curve comes down, bottoms out, and turns back up. I have marked three points on it — the flat line, the steep line, and the bottom — and they are the same three lines you saw in the previous section, now scored. The one at the bottom is the answer. Now, why is it a parabola? Not roughly bowl-shaped — an actual parabola. Because the residual is linear in w, and we squared it. A linear thing squared is quadratic, and a quadratic function drawn out is a parabola. That is not a coincidence about this dataset, it is guaranteed by the model and the cost we chose. And that guarantee is worth an enormous amount, which you will appreciate later when we lose it. A parabola has exactly one minimum. There are no local dips to get stuck in, no bad places to start. Wherever you are on that curve, downhill leads to the answer. So the algorithm can be spectacularly simple: work out which way is downhill, and go.",
}

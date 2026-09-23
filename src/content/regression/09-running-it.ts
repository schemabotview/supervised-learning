import type { Section } from '../types'

export const runningIt: Section = {
  id: 'running-it',
  title: 'Running it',
  scene: 'running-it',
  slide: `## The walk, and the curve you actually watch

Both parameters descending at once, on the contour map. This is a real run — 200 iterations at \`α = 0.02\`, from \`w = 0.25, b = 0.45\`.

### Reading the path
- A fast **dash** to the valley floor — twenty steps get almost all the way
- Then a slow **crawl** along the valley. After 200 iterations it is still short of the minimum
- That is the cost of the lean. On circular contours it would go straight to the middle

### The second plot is the one you use
You cannot draw a contour map with twelve parameters. You can always plot **J against iteration**.

- Monotone down, then flattening — converged
- Still falling steeply at the end — run it longer
- Rising or oscillating — α is too big

### When to stop
When J stops improving by more than about \`0.001\` per step.`,
  narration:
    "Now both parameters at once, and this is the picture the whole course has been building towards. The upper plot is the contour map from before, and the orange line is a real run — two hundred iterations, alpha at nought point zero two, starting from the bottom left where w is nought point two five and b is nought point four five. Nothing here is drawn by hand; it is the update rule, executed. Watch the shape of it. Coming out of the start, the path cuts across the rings almost perpendicular. That is not a coincidence — steepest descent always leaves a contour at right angles, because the steepest direction is by definition the one perpendicular to the direction where nothing changes. Then, as it gets into the stretched part of the bowl, it turns, and runs along the valley rather than across it. And that turn is the price of the lean I pointed at two sections ago. If those contours were circles, the very first step would have pointed straight at the middle and the path would be a straight line. Because they are stretched ellipses, the steepest direction is not the direction of the target, and the walk has to bend. And look where it actually is after two hundred iterations — that purple dot is still visibly short of the minimum. It gets there eventually. It just takes far longer than it needed to. Hold on to that; it is the whole motivation for feature scaling. Now look at the lower plot, because this is the one you will actually use for the rest of your career. It is the same run, plotted differently: cost on the vertical, iteration number along the bottom — the first forty steps, because over the full two hundred the tail is flat enough to tell you nothing. Here is why it matters. That contour map exists because this model has exactly two parameters. Next course you will have twelve. A neural network will have millions. You will never draw a contour map again. But you can always plot J against iteration, whatever the model, however many parameters. And it tells you what you need. Falling and flattening out, like this one: converged, you are done. Still dropping steeply at the right-hand edge: you stopped too early, run it longer. Going up, or sawing up and down: your learning rate is too big. As for when to stop — when J stops improving by more than about a thousandth per step is a reasonable rule, but honestly, automatic thresholds are fiddly to choose and looking at the curve is decent engineering.",
}

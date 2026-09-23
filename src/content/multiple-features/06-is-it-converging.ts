import type { Section } from '../types'

export const isItConverging: Section = {
  id: 'is-it-converging',
  title: 'Is it converging?',
  scene: 'is-it-converging',
  slide: `## Four shapes, four prescriptions

Plot J against iteration after every run. It is the one diagnostic that survives any number of parameters.

### Converged
Falls, then flattens. **Stop.** More iterations buy nothing.

### Still falling
Flattening has not started. **Run longer, or raise α.** Do not read the score yet — the model is not finished.

### Rising
J is going *up*. **α is too large.** Drop it by 10×. This one is unambiguous: with a correct implementation, gradient descent on a convex cost can only go up if the step size is wrong.

### Sawing up and down
Oscillating while trending down. **α is near the edge** — halve it. If halving does not settle it, your features are probably unscaled, and §04 is the real fix.

### One caveat
A rising curve can also mean a **bug in the gradient**. Try a far smaller α; if it still rises, the arithmetic is wrong, not the step size.`,
  narration:
    "Get in the habit of plotting this after every single run. Cost on the vertical, iteration count along the bottom. It takes one line of code and it is the one diagnostic that keeps working no matter how many parameters your model has. Four shapes. Top left: converged. It falls, and then it flattens out. That flattening is the signal — it means further iterations are buying you essentially nothing, and you can stop. Top right: still falling. This is the one people misread most often, because the curve looks healthy. It is going down, everything is fine — except it has not flattened yet. The model is not finished. If you read your test score here you are scoring a half-trained model and concluding something false about your architecture. Run it longer, or raise alpha. Bottom left: rising. J is going up. With a correct implementation on a convex cost, this can only happen for one reason: the step size is too large. Drop alpha by a factor of ten and run again. Bottom right: sawing up and down while trending downward. This is alpha sitting right at the edge of stability — it is converging, but it is overshooting on every step and clawing back. Halve alpha and it will smooth out. And if halving does not smooth it out, your problem is probably not alpha at all: it is unscaled features, and the fix is two sections ago, not here. Now, one honest caveat about the rising case, because I told you it was unambiguous and it is very nearly unambiguous. A rising curve can also mean your gradient is simply wrong — a sign error, or the non-simultaneous update we keep warning about. The way to tell them apart is to try a drastically smaller alpha, something like a thousandth of what you had. If it converges, it was the step size. If it still climbs, the arithmetic is wrong, and no learning rate will save you.",
}

import type { Section } from '../types'

export const choosingLambda: Section = {
  id: 'choosing-lambda',
  title: 'Choosing λ',
  scene: 'choosing-lambda',
  slide: `## λ is chosen the same way degree was

Fit on train, score on validation, keep the winner. There is no formula.

### Sweep multiplicatively
\`0.0001, 0.001, 0.01, 0.1, 1, 10\` — ×10 each step, which is why the axis is log₁₀ λ. A linear grid wastes every point on a range where nothing changes.

### The two curves say different things
- **J_train only ever rises with λ.** It has to — you are deliberately spoiling the fit. It is not a failure signal.
- **J_val has a bottom.** That bottom is the answer: **λ ≈ 0.03**, J_val **0.017**.

### Both ends are failures
- λ too small → the penalty does nothing. At λ = 0: **0.104**, high variance
- λ too large → weights crushed, the model cannot bend. At λ = 10: **0.116**, high *bias*

Same U-curve as degree, from the other direction: **λ buys bias to sell variance.**

λ was chosen on validation, so read **test** once for the number you report.`,
  narration:
    "So lambda controls how much you shrink. What should it be? And the answer is the same answer as for the degree, which is the point of doing them in this order: there is no formula. You try a range, you score each one on the validation set, and you keep the winner. Notice the grid on the x axis. Nought point oh oh oh one, nought point oh oh one, nought point oh one, and so on — multiplying by ten each time, which is why the axis is labelled log base ten of lambda. Always sweep lambda multiplicatively. If you tried a linear grid — nought point one, nought point two, nought point three — you would spend every one of your attempts in a region where essentially nothing changes, and never discover that the interesting behaviour is three orders of magnitude below. The two curves tell you different things and it is important not to confuse them. The blue training curve only ever rises as lambda increases. It has to. Increasing lambda means telling the optimiser to care less about fitting the data, so the fit gets worse — by construction, every time. That is not a failure signal, and a rising training error here is exactly what should happen. The red validation curve is the one with information in it, because it has a bottom. Coming from the left it drifts down, reaches a minimum around lambda equals nought point oh three where J val is nought point oh one seven, and then climbs steeply. That minimum is your answer. And look at what is happening at the two ends, because they are the two failure modes we have already met. Go far enough left and the penalty is so small it does nothing; the dashed line at the top shows where you end up with no penalty at all, nought point one oh four, which is the wildly overfitted model from section one. High variance. Go far enough right and the weights get crushed to almost nothing; at lambda equals ten the validation error is nought point one one six, and that model is now too constrained to bend at all. High bias. So it is the same U-curve as the degree sweep, approached from the other direction. Degree adds flexibility; lambda removes it. And that is the cleanest way to hold lambda in your head: it buys bias in order to sell variance, and you are looking for the exchange rate that minimises the total. One last thing, which is section two coming back to collect. You have now used the validation set to choose the degree and to choose lambda. That means the validation score at the bottom of that curve is optimistic — it is the best of eleven draws. When you want a number to report, go to the test set, read it once, and stop.",
}

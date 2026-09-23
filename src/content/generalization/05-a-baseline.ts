import type { Section } from '../types'

export const aBaseline: Section = {
  id: 'a-baseline',
  title: 'A baseline',
  scene: 'a-baseline',
  slide: `## "Is 0.035 bad?" is not answerable without a third number

J_train and J_val give you one gap. A **baseline** gives you the other.

- **baseline → J_train** — error that is the *model's fault*: bias
- **J_train → J_val** — error that is memorisation: variance

### Here the baseline is exact
The data was generated with known noise, so the floor is \`σ²/2 = 0.019\`.

### J_train below the floor is normal
Training error is **optimistically biased** — the fit has already bent toward its own rows. Expect \`floor · (1 − p/m)\`:

- degree 3 → 0.016 predicted, 0.014 measured
- degree 12 → 0.009 predicted, 0.008 measured
- degree 1 → 0.018 predicted, **0.036** measured. *That* is bias.

### In real life you estimate it
You cannot compute the noise. Use **human error on the same task**. If experts disagree by 14%, a 15% model is nearly perfect and chasing 5% is chasing noise.`,
  narration:
    "There is a question I have been dodging for three sections. Degree one scored nought point oh three five. Is that bad? You cannot answer that, and neither can I, from the number alone. It might be a terrible model. It might be that house prices are just not very predictable from floor area and nothing could do better. Those two situations demand completely opposite responses, and telling them apart needs a third number: a baseline. The idea is that you have two gaps, not one. The first gap is from the baseline up to your training error, and that is the part of your error that is the model's fault — that is bias. The second gap is from training error up to validation error, and that is the part that is memorisation — that is variance. Two gaps, two diagnoses, and you need the baseline to see the first one at all. Now, in this course I have an unfair advantage: I generated the data, so I know the noise exactly, and the floor works out at nought point oh one nine. Nothing, no model ever, can do better than that on houses it has not seen, because that is the size of the randomness I put in. Look at the table. Degree one trains at nought point oh three six, which is nought point oh one seven above the floor. That is an enormous first gap, and that is the whole diagnosis: high bias. Now look at the other two rows and you will see something that stops people. Degree three trains at nought point oh one four and degree twelve at nought point oh oh eight, and both of those are BELOW the floor. Below the number I just told you was unbeatable. That is not a contradiction, and the explanation is worth having properly. Training error is optimistically biased. The model has already bent itself toward the noise in its own rows, so when you score it on those same rows some of the noise has been absorbed into the fit. There is even a formula: the expected training error is the floor times one minus p over m, where p is the number of parameters. Degree three: nought point oh one nine times one minus four over twenty-four, which is nought point oh one six, and we measured nought point oh one four. Degree twelve: the formula says nought point oh oh nine, we measured nought point oh oh eight. Both land. And now the same formula for degree one predicts nought point oh one eight, and we measured nought point oh three six. Double. Degree one is the only one that does not fit the pattern, and that discrepancy IS its bias. Finally, the practical part, because you will not know the noise. You estimate the floor, and the usual estimate is how well a person does on the same task. If two experienced appraisers shown the same house disagree by fourteen percent, then a model at fifteen percent is doing essentially as well as a human, and a team spending six months chasing five percent is chasing something that is not there. The baseline is what stops you optimising noise, and the fact that it is an estimate rather than a measurement does not stop it being the most useful number in the project.",
}

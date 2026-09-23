import type { Section } from '../types'

export const thresholds: Section = {
  id: 'thresholds',
  title: 'Moving the threshold',
  scene: 'thresholds',
  slide: `## The model outputs a probability. The threshold is yours

Nothing in training chose 0.5. Gradient descent fitted **w** and **b**; the cut is a separate decision, made afterwards, by you.

### Lowering it does not improve the model
Dropping 0.5 to 0.2 retrains nothing — same w, same b, same curve. The boundary slides left, and one missed cancer becomes one more healthy patient sent for a biopsy. **You cannot reduce both kinds of mistake**: the groups overlap, so tumours of the same size carry different diagnoses.

### Where the number comes from
Not from the data. From the **cost of each mistake**: a missed malignancy and an unnecessary biopsy are not remotely the same harm, and no amount of training knows the exchange rate.

### So keep the probability
Thresholding throws away everything except one bit. Report \`0.47\` and a clinician can act on it; report \`benign\` and you have made their decision for them.

Those two error counts become **precision and recall** in course 6.`,
  narration:
    "One last thing about this model, and it is the thing most often got wrong in practice. Look at the two plots. Same model on both — the same w, the same b, the same curve, the same fifteen tumours. The only difference is where I drew the horizontal line. On the upper plot it is at nought point five, which is the default everyone uses. Now, notice something: nothing in training chose nought point five. Gradient descent fitted w and b by minimising log loss, and it finished. The threshold was not part of that. It is a separate decision, made afterwards, by you, and the fact that the library does it silently is exactly why people forget they have made it. So let us make it deliberately. At nought point five the boundary sits at two point six two centimetres. The model catches six of the seven malignant tumours, misses one — that small malignant tumour at two point two, marked on the plot — and raises one false alarm, the large benign one at three centimetres. Now drop the threshold to nought point two. That is saying: call it malignant if there is even a one in five chance. The boundary slides left, to two point one four, and look what happens. The missed tumour is now caught. All seven, no misses. But the tumour at two point four, which is benign, has crossed to the wrong side, so the false alarms go from one to two. And that is the entire lesson. You did not make the model better. You did not retrain anything. You moved one number, and you exchanged one kind of mistake for the other. You cannot reduce both, because the two groups genuinely overlap — there are tumours of the same size with different diagnoses, and no cut on that axis separates them. So where does the right number come from? Not from the data, and this is the part worth internalising. It comes from what each mistake costs. A missed malignancy and an unnecessary biopsy are not remotely the same harm to a person, and nothing in the training set contains that exchange rate. It is a clinical and ethical judgement, and the honest thing is to make it explicitly with the people who own it, rather than inherit it from a library default. Which leads to a practical habit: keep the probability. The moment you threshold you have thrown away everything the model knew except a single bit. If you hand a clinician nought point four seven they can weigh it against everything else they know about that patient. If you hand them the word benign, you have quietly made their decision for them. Predict probabilities; threshold as late as you possibly can. Those two kinds of mistake have proper names — they turn into precision and recall — and a curve that plots one against the other as you sweep the threshold. That is section seven of course six, and it is where this idea gets its full treatment.",
}

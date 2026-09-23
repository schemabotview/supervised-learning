import type { Section } from '../types'

export const whyNotALine: Section = {
  id: 'why-not-a-line',
  title: 'Why not just fit a line',
  scene: 'why-not-a-line',
  slide: `## One point it gets right, and the line moves anyway

y is now **0 or 1** — benign or malignant. The obvious move is to fit a line and threshold it at 0.5.

### It half works
Awkward but usable: 0.5 crosses at 2.61 cm and gets 13 of the 15 right. The two it misses overlap, and no straight cut fixes those.

### Then add one very large malignant tumour
9.5 cm, malignant — and the model already had it **right**, well above 0.5. Squared error does not care: it penalises *distance* from 1, so a point predicted at 2.7 is "wrong" by 1.7. The line tilts, 0.5 slides right to 2.94 cm, and **a 2.8 cm tumour that was correct now reads benign**.

### The real objection
A prediction of 2.7 is not a probability. Neither is −0.16. The output has no ceiling and no floor, so "distance from the label" is the wrong thing to be minimising.

### What is needed
An output squashed into (0, 1), and a cost that stops caring once you are confidently right.`,
  narration:
    "You already have a working regression algorithm, so the obvious question is whether you can just point it at this problem. y is zero or one now — benign or malignant — but zero and one are numbers, so fit a line and threshold it at nought point five. Let us see how far that gets. Look at the upper plot. Fifteen tumours, size along the bottom, and the label up the side — either zero at the bottom or one at the top. I have fitted a least-squares line through them, and honestly it is not a disaster. It is an odd-looking picture, but the place where it crosses nought point five lands at two point six one, nicely between the two groups, and thresholding there gets thirteen of the fifteen right. The two it misses are the pair in the middle that overlap — a small malignant tumour and a large benign one — and no cut anywhere on this axis separates those two, so hold that thought rather than holding it against the line. Now the lower plot. I have added one more tumour: nine and a half centimetres, malignant. And here is what I want you to notice, because it is the whole argument. The original model already got that point right. Emphatically right — the old line predicts about two point seven for it, which is miles above the threshold. There is nothing to fix. But squared error does not measure right-ness, it measures distance from the label. That point's label is one, and the model said two point seven, so squared error sees an error of one point seven and pulls hard to reduce it. So the line tilts. And look what the tilt does: the nought point five crossing slides to the right, from two point six one to two point nine four, and the two point eight centimetre tumour that was correctly classified a moment ago now falls on the wrong side of it. Adding a data point the model already handled correctly made it worse. And once you see that, the deeper objection is clear. Two point seven is not a probability. Neither is minus nought point one six, which is what that line predicts for the smallest tumour in the set. The output has no ceiling and no floor, so distance from the label is simply the wrong quantity to minimise. What we need is two things. An output that is squashed into zero to one so it can be read as a probability at all. And a cost that stops caring once you are confidently right. Both are coming, and both are simpler than you would guess.",
}

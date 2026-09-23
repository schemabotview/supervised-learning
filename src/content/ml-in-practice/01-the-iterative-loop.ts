import type { Section } from '../types'

export const theIterativeLoop: Section = {
  id: 'the-iterative-loop',
  title: 'The iterative loop',
  scene: 'the-iterative-loop',
  slide: `## Four boxes, a dozen times round

Nobody chooses the right features on Monday. The skill is not the first guess — it is how fast each turn of the loop teaches you something.

### One change per turn
v2 added velocity features and **nothing else**. That is the only reason the jump from 0.28 to 0.48 can be attributed to anything. Change three things at once and you have learned one fact: *the bundle helped.*

### v1 is not a strawman
Amount and merchant category are the two columns that are always in the file. On those alone the model declines **540 legitimate customers** to catch 28 frauds. That is a call-centre queue, not a product.

### Diagnosing is the slow box
Choosing and training take an afternoon. Deciding *what to change* takes the rest of the week — and it is the only step where you can be wrong for a month and not notice.

### What the table leaves out
The six turns that moved nothing. Those are not failures; they are how you find out which column the signal is **not** in.`,
  narration:
    "Everything in the last five courses was about one model, sitting still, being measured. This course is about the thing that actually happens, which is that you build a model, it is disappointing, and then you have to decide what to do next. And that decision — not the maths, not the library — is where a machine learning project is won or lost. Here is the cycle. Choose: pick a model, a set of features, a value of lambda. Train: fit it on the training split. Diagnose: measure it, and work out what kind of wrong it is. Change: alter one thing, and go back to the top. Four boxes. You will go round them a dozen times before anything is worth deploying, and there is no version of this job where you do not. Now look at the table underneath, because that is three real turns of that loop on the fraud detector we will use for the whole course. Version one uses the two columns that are always in a transaction file: the amount, and the merchant category. Its recall is nought point two eight — it catches twenty-eight of the hundred frauds. And its precision is nought point oh five. Read that second number again, because it is the interesting one. To catch those twenty-eight frauds it declined five hundred and forty legitimate customers. Five hundred and forty people whose card stopped working in a shop. That is not a product; that is a call centre. Version two adds velocity features — how many charges has this card seen in the last hour, in the last day. Recall goes to nought point four eight, and precision jumps from nought point oh five to nought point three four. False alarms collapse from five hundred and forty to ninety-two. Version three adds a per-card historical baseline: not how much is this charge, but how much is this charge compared to what this particular card normally does. Recall nought point six, precision nought point six six, thirty-one false alarms. Now here is the discipline that makes that table readable, and it is the single most commonly broken rule in applied machine learning. Each version changed exactly one thing. That is why I can tell you that velocity features are what fixed the precision problem. If version two had added velocity features and also switched to a different model and also retuned lambda, the table would show the same improvement and I would know nothing at all about why. You would have learned one fact: that bundle of three changes helped. Which is almost useless, because you cannot build on it. Changing one thing per round is slower per turn and enormously faster overall. One more thing that table does not show you, and I want to be honest about it. Between version one and version three there were six other attempts that moved nothing. Features that seemed obviously predictive and were not. A model swap that made no difference. Those are not failures and they are not wasted; they are how you find out which columns the signal is not in, which is most of the information you ever get. The loop is not a formality you go round on the way to the answer. The loop is the work.",
}

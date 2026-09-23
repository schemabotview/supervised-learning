import type { Section } from '../types'

export const theTradeoff: Section = {
  id: 'the-tradeoff',
  title: 'The trade-off',
  scene: 'the-tradeoff',
  slide: `## Precision and recall are one knob, seen from two ends

The model is fixed. Nothing is retrained. The only thing moving is the number a score has to beat.

### Three settings on the same model
- **0.9** → 30 caught, **1** customer declined. Nearly everything you flag is real; 70 frauds walk
- **0.5** → 60 caught, 31 declined
- **0.1** → 84 caught, **381** declined. You caught 24 more frauds and made twelve times the trouble

### The curve is the model's real identity
A single (precision, recall) pair is one dot on it. Two models are only comparable by their **whole curves** — and they can cross.

### 0.5 is not special
Best F1 here is at **0.39**. The default is the sigmoid's midpoint, which is a fact about the function, not about your costs.`,
  narration:
    "So you have two numbers that pull against each other. The natural question is how you choose, and the answer is that you have exactly one knob, you have had it all along, and turning it is free. It is the threshold. Back in the classification course we said that nought point five is a default and not a law, and this is where that comes due. The model outputs a probability. You decide what probability is enough to act on. Nothing is retrained, no parameters change, you are only moving the bar. Look at the upper panel. The horizontal axis is the threshold, from zero to one, and the two curves are precision and recall measured at each setting. They go in opposite directions, and they do it monotonically. Raise the bar and you flag fewer things, so a higher proportion of them are real — precision climbs — and more frauds slip under it, so recall falls. Lower the bar and it reverses. There is no point anywhere on that axis where both are rising. That is the trade-off, and it is not a limitation of this model; it is arithmetic. Now the concrete version, which is the three marked points on the lower panel. At a threshold of nought point nine, this model catches thirty frauds and declines exactly one legitimate customer. One. Precision ninety-seven per cent. Almost everything it flags is genuinely fraud — but seventy frauds walk straight through. At nought point five, the default, sixty caught and thirty-one declined. At nought point one, eighty-four caught — twenty-four more frauds than the default — and three hundred and eighty-one legitimate customers declined. Twenty-four extra catches for three hundred and fifty extra angry phone calls. Whether that is a good deal is not something I can tell you, and it is not something the model can tell you. It depends on the average value of a fraudulent transaction and the cost of a false decline, and those are numbers that live in a different department. What the curve does is lay the menu out so the decision can be made with its price attached, instead of being made accidentally by whoever typed nought point five. The lower panel is the same sweep with the threshold thrown away: precision plotted directly against recall, one point per threshold, traced from the strict end on the left to the permissive end on the right. This is the precision-recall curve, and it is worth understanding what it is, because it is the honest description of a classifier. A single precision-recall pair is one dot on this curve. It tells you where somebody set the dial, and almost nothing about the model. If you want to compare two models properly you compare their whole curves — and they can cross, which means one model can be better at high precision and worse at high recall, and the question “which model is better” can genuinely have no answer until you say where you intend to operate. Two details on our curve. It is faintly ragged up at the high-precision end, and that is real rather than a drawing artefact: when you are only flagging thirty rows, one more flagged row moves precision by three percentage points, and I have left that in rather than smoothing it, because that jitter is telling you the honest resolution of a measurement built on a hundred positives. And the second: the best F one on this curve is at a threshold of nought point three nine, not nought point five. Nought point five was never optimal for anything here. It is the midpoint of the sigmoid — a fact about a function, not a fact about what a declined card costs.",
}

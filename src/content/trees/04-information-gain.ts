import type { Section } from '../types'

export const informationGain: Section = {
  id: 'information-gain',
  title: 'Information gain',
  scene: 'information-gain',
  slide: `## Parent, minus the weighted average of the children

\`gain = H(parent) − (n_L/n)·H(left) − (n_R/n)·H(right)\`

**Weighted**, because a beautifully pure node holding four flights has told you almost nothing.

### The winner
0.9478 − (497·0.6461 + 502·0.9875)/999 = **0.1302 bits.** Split at 13:48.

### And now the uncomfortable part
The best split on any *other* column scores **0.1297.** A margin of **0.0005 bits** — five ten-thousandths — chose between "what time is it" and "is the aircraft already late".

### The curve is the search
766 thresholds, plotted in order: jagged, one broad peak, no cliff at 13:48. Everything from **12:59 to 15:47** scores within 10% of the winner.

Adjacent thresholds differ by **0.0013** on average — the jitter in the scan is bigger than the margin that picked the column.

### Remember this
That margin is what §08 is about.`,
  narration:
    "Now we assemble it. We have a number for how mixed one node is, and a split hands us two nodes. The score for the split is: how much did the mixing go down? Take the parent's entropy. Subtract the entropy of the two children — but not their plain average, their weighted average, weighted by how many flights went each way. The weighting is not a technicality and it is where naive implementations go wrong. Imagine a split that carves off four flights, all of them late. That child is perfectly pure, entropy zero, gorgeous. And it is worth nothing, because it is four flights out of nine hundred and ninety-nine, and the other nine hundred and ninety-five are sitting in a node that is exactly as confused as before. Weighting by size is what stops the tree from being seduced by tiny pure corners. That quantity — parent entropy minus the weighted child entropy — is called information gain, and it is the better function from section two. Let us do the winning one by hand. The parent, all nine hundred and ninety-nine training flights, scores nought point nine four seven eight bits. Split at thirteen forty-eight: four hundred and ninety-seven flights go left and score nought point six four six; five hundred and two go right and score nought point nine eight seven. Weighted average, using those counts, is nought point eight one seven seven. Subtract, and the gain is nought point one three oh two bits. And that is the largest number out of all one thousand and ninety-seven candidates, which is why the root of the tree says thirteen forty-eight. Now look at the plot, because this is the whole of section two actually run. Seven hundred and sixty-six thresholds on departure hour, each one scored, laid out in threshold order. There is nothing mysterious left — that blue curve is the search. And notice its shape. It is jagged, not smooth — two adjacent thresholds differ by about nought point oh oh one three on average, which I want you to hold onto for thirty seconds. And it has one broad peak with no cliff anywhere near thirteen forty-eight: every threshold from about one o'clock to a quarter to four scores within ten per cent of the winner. The tree reports thirteen forty-eight to the minute, which makes it sound like a finding, and it is not — it is an artefact of precisely which flights happened to be in this sample. If you take that number to an operations meeting as though it means something, you are over-reading your own model. And now the part I want you to actually remember. Look at the dashed orange line. That is the best split available on any other column — asking whether the inbound aircraft was late — and it scores nought point one two nine seven. The winner scores nought point one three oh two. The margin is nought point oh oh oh five bits. Five ten-thousandths — and remember what I asked you to hold onto, because the scan's own jitter from one threshold to the next is nought point oh oh one three. The noise in the curve is two and a half times the margin that decided the root of the tree. Two completely different ways of thinking about why an aeroplane is late — is it the time of day, or is it the state of the aircraft — and the algorithm picked between them by a margin indistinguishable from nothing. It will not tell you that. It reports a root split with total confidence, and everything below that root is now conditioned on a decision that could have gone either way. Every split deeper in the tree is downstream of a coin flip. Hold onto that, because section eight is going to take that observation and build the most useful thing in this course out of it.",
}

import type { Section } from '../types'

export const measuringPurity: Section = {
  id: 'measuring-purity',
  title: 'Measuring purity',
  scene: 'measuring-purity',
  slide: `## Zero when they all agree, maximum when they split evenly

\`H = −p·log₂(p) − (1−p)·log₂(1−p)\`, in **bits**: the answer you would still have to be told.

### Read the shape, not the formula
**Flat on top, steep at the edges.** Moving a node from 50/50 to 60/40 costs 0.029 bits. Moving 10/90 to 2/98 buys 0.328 — eleven times as much for the same eight points.

That is why a tree chases nodes that are *already* lopsided rather than tidying up the muddled ones.

### On our four leaves
The confident two score **0.337** and **0.249**. The two in the middle score **0.980** and **0.974** — against a worst-possible 1.000.

### Gini instead?
\`2p(1−p)\`. Same shape, no logarithm, and it is scikit-learn's default. The two disagree on which split wins **rarely**, and never in a way anyone has shown to matter.`,
  narration:
    "We need to fill in the word better. A split gives you two groups of flights, and you need one number saying how good that is — and the way this is done is slightly indirect, so it is worth going slowly. You do not score the split. You score each of the two resulting groups for how MIXED it is, and then you combine them. So the quantity we need first is: given a bag of flights of which some fraction p was late, how mixed is that bag? Look at the curve on the left. If p is zero — every flight in the node was on time — the answer is zero. Completely pure, nothing left to learn, you are done. If p is one, same thing: zero. All late. And in between it rises to a maximum at p equals one half, where the node is an exact coin flip and is as useless as a group of flights can possibly be. The function that does that is entropy: minus p log p, minus one minus p log one minus p, with the logarithm in base two so the answer comes out in bits. And bits is a real unit with a real meaning. It is how much information you would still need to be given to know the answer for a flight in that node. One bit for a fifty-fifty node, which is exactly one yes-or-no question. Zero bits for a pure node, because you already know. Our full training set sits at p equals nought point three six six, which scores nought point nine four eight bits — nearly as uncertain as it gets. Now the shape, because the shape is what you should actually take away, more than the formula. Entropy is flat on top and steep at the edges. Let me put numbers on that. Move a node from fifty-fifty to sixty-forty — a shift of ten points — and entropy drops by nought point oh two nine. Almost nothing. Now move a node from ten per cent to two per cent — a shift of eight points, slightly smaller — and entropy drops by nought point three two eight. Eleven times as much, for less movement. The lesson is that purifying an already-lopsided node is worth enormously more than nudging a muddled one, and that is a real behavioural fact about trees: they chase the clean corners of your data and they are quite content to leave a big confused blob sitting in the middle. You can see exactly that in our own tree, in the table underneath. Two of its leaves are the confident ones, and they score nought point three three seven and nought point two four nine — well down the curve. The other two, the forty-two per cent and forty-one per cent ones, score nought point nine eight and nought point nine seven. Against a worst-possible score of one. So those two leaves — which felt like a genuine discovery in section one, and are a genuine discovery — have, by this measure, barely moved. The tree learned something true about the world there and almost nothing about whether any particular flight will be late. Both of those statements are correct at once, and holding them together is most of what it means to read a tree properly. One alternative, briefly, because you will meet it the moment you open scikit-learn. Gini impurity: two p times one minus p. Same shape — zero at both ends, maximum in the middle — no logarithm, marginally cheaper to compute, and it is the default criterion rather than entropy. People ask which is better. They almost always choose the same split, the cases where they differ are rare, and nobody has ever demonstrated that the difference matters. Use the default. Now we have a number for one node, and a split gives us two nodes. Combining them is the next section.",
}

import type { Section } from '../types'

export const howASplitIsChosen: Section = {
  id: 'how-a-split-is-chosen',
  title: 'How a split is chosen',
  scene: 'how-a-split-is-chosen',
  slide: `## Try all of them

The algorithm is a double loop and a comparison. There is no optimisation, no calculus, and nothing to converge.

### A continuous column has a *finite* number of splits
\`depHour\` takes 767 distinct values, so there are **766** thresholds worth trying — one per gap. Anything between two observed values cuts the rows identically.

That is the observation that makes an exhaustive search affordable: **1,097 candidates** at the root, and the tree tries every single one.

### Greedy, and it never reconsiders
The best split *now* is taken and never revisited. That is not the best **tree** — finding that is NP-hard — and it is why two mediocre splits that would together be excellent get skipped.

### Then recurse
Each half is a smaller version of the same problem. The only thing left to define is \`better()\`.`,
  narration:
    "So: where does thirteen forty-eight come from? The answer is going to be slightly deflating, and I think that is good for you. It comes from trying everything. Look at the code on the left. That is not pseudocode for the algorithm; that is the algorithm. For every column, for every threshold worth trying, split the rows into the ones at or below it and the ones above, score the two halves somehow, and keep the best pair you saw. No calculus. No gradient. Nothing converges, because there is nothing iterative happening — it is a search over a finite list, and at the end of the list you take the winner. Now, the word finite is doing real work in that sentence, and it is the one genuinely clever observation in this section. Departure hour is a continuous number. Thirteen forty-eight, thirteen forty-nine, thirteen forty-eight and a half — there are infinitely many thresholds you could pick, so how can you try all of them? You can, because almost all of them are the same threshold. Sort the nine hundred and ninety-nine flights by departure hour. Any threshold between two adjacent values splits the rows into exactly the same two groups. Thirteen forty-eight and thirteen fifty-two are different numbers and identical splits, if no flight departs in between. So the only thresholds that matter are the midpoints between adjacent distinct values, and there are only as many of those as there are gaps. For departure hour, that is seven hundred and sixty-six. Not infinity. Seven hundred and sixty-six. Look at the table. Departure hour: seven hundred and sixty-six candidates. Precipitation: three hundred and twenty-seven, far fewer, because five hundred and seventy-nine of these flights are in dry weather and all share the value zero — that whole block is a single value, and it contributes a single gap. The binary columns contribute exactly one candidate each — there is only one place to cut between no and yes. Add it up and the root node has one thousand and ninety-seven possible splits, and the algorithm evaluates every one of them before choosing. Then it does the same thing again on each half, with fewer rows and therefore fewer candidates, all the way down. Now the word greedy, which is the important caveat and which you should hold onto. Each node picks the split that looks best right there, immediately, and never reconsiders it. It does not look ahead. It does not ask whether a slightly worse split now would open up a much better pair of splits below. And that means the tree you get is not the best possible tree for your data — it is just a good one, found quickly. Finding the genuinely optimal tree is NP-hard; for any real dataset it is out of reach, and nobody does it. So every decision tree you have ever used is the output of a greedy approximation. In practice this matters in one specific way that is worth knowing about: a pair of features that are useless alone and powerful together — exclusive-or is the textbook case — will be skipped, because at the moment of choosing, neither one improves anything. The tree cannot see two moves ahead. One thing is still undefined, and it is the thing in the if-statement: better. What does it mean for one split of the rows to be better than another? That is the next section, and then the one after that assembles it into the actual score.",
}

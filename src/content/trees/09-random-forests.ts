import type { Section } from '../types'

export const randomForests: Section = {
  id: 'random-forests',
  title: 'Random forests',
  scene: 'random-forests',
  slide: `## Averaging only helps if the things you average differ

Bagging recovered **one point.** The trees were resampled, and they still all found the same two dominant columns — so the vote had nothing to cancel.

### The fix is one line
At **every split**, offer the tree a fresh random subset of the columns. Not once per tree — once per node.

### It works by making each tree worse
\`max_features\` = 6 is bagging: each tree fits the training set to **0.985**, and the ensemble gets **0.824**. At 2: each tree manages **0.888**, and the ensemble gets **0.840**.

Weaker trees, stronger forest. That is the bias-variance trade in one line of output.

### Why it helps the weak columns
A dominant column is absent from two-thirds of the splits, so \`precip\` and \`carrier\` finally get used — and a tree that leans on them is wrong in a *different direction*.

### Defaults
√n for classification, n/3 for regression. Anything from 2 to 4 works here; the differences between them are noise on 501 flights.`,
  narration:
    "Bagging worked, and it was a bit of a let-down. Eighty trees and we went from about nought point seven nine to nought point eight one four. One point, for eighty times the compute. Why so little? Because averaging only buys you something to the extent that the things you are averaging are different, and go back and look at section four's table. Two columns dominate everything: departure hour and the inbound leg, at nought point one three and nought point one three. The next best is precipitation, at nought point oh four eight — a third as good. So every bootstrap tree, no matter which rows it got, finds one of those two columns at the root, and then finds the other one just below, and from there the trees look broadly alike. Their errors are correlated. Averaging eighty nearly-identical trees gives you one nearly-identical tree. The fix is one line, and it is the reason random forests exist. At every split, do not let the tree see all six columns. Show it a random subset — say two — and make it choose the best split from those. Not a random subset per tree; a fresh random draw at every single node. So two-thirds of the time, departure hour is simply not on the menu, and the tree is forced to find the best split it can from precipitation and carrier. And now look at the plot, because the numbers here are the clearest statement of the bias-variance trade in this entire repo. On the right, max features equal to six: that is every column available at every split, which is exactly bagging. Each tree in that ensemble fits the training data to nought point nine eight five — they are extremely good at the training set — and the ensemble scores nought point eight two four held out. Now move left to two columns per split. Each individual tree now only manages nought point eight eight eight on the training data. They are, individually, substantially worse models. And the ensemble scores nought point eight four zero. Weaker trees, stronger forest. Read that again, because it is genuinely counter-intuitive and it is the whole idea. You deliberately handicap each member in order to make the members disagree, and the disagreement is what the vote is able to cancel. There is a second benefit that is easy to miss. In an ordinary greedy tree, a moderately useful column like precipitation is essentially never used, because a stronger column always beats it at every node. Restricting the feature set forces precipitation into the model, and a tree that has been made to lean on precipitation is wrong in a different direction from a tree that leaned on departure hour. That is not just noise reduction — it is a genuinely different view of the data, and that is why forests tend to be good at problems with many weakly-informative columns. Push it too far and it stops working. At one column per split the tree has no choice at all, it is picking essentially at random, and the ensemble drops to nought point eight. The trees have become too weak to be worth averaging. So there is an optimum, and the usual defaults are the square root of the number of columns for classification and a third of them for regression. On our six columns that suggests two, and two is indeed about right — though I would point out honestly that two, three and four all score within a point of each other here, and on five hundred and one held-out flights a point is noise. Do not over-tune this. The important move is not six.",
}

import type { Section } from '../types'

export const theTreeModel: Section = {
  id: 'the-tree-model',
  title: 'The tree model',
  scene: 'the-tree-model',
  slide: `## A sequence of questions, and you are the one running it

No dot product. No gradient. You compare a number, you go left or right, you read the leaf.

### What is actually stored
A **threshold per internal node** and a **number per leaf.** That is the entire model — and it is the only one in this repo you could execute on paper.

### The two ends separate
Morning, inbound on time → **6% late** across 353 flights. Afternoon, inbound late → **96%** across 145. That is a real split of the world, from two questions.

### The middle is the interesting part
42% and 41%, reached by opposite routes. *Morning with a late aircraft* and *afternoon with a good one* are the same risk — an interaction a straight line cannot express without being told to look for it.

### Where this is going
Every remaining section answers one question: **where did 13:48 come from?**`,
  narration:
    "Six courses in, every model we have built has been an equation. You multiply the features by some weights, add them up, and push the result through something. Trees are not like that, and the first thing to do is just look at one. Here is a tree fitted to nine hundred and ninety-nine flights on a small regional airline, and the thing I want to predict is whether a flight leaves more than fifteen minutes late. Start at the top. Does it depart before thirteen forty-eight? That is it. That is the first question. If yes, go left; if no, go right. Then one more question on each side — was the inbound aircraft late, the one that has to land and turn around before your flight can leave. And then you are at a leaf, and the leaf has a number on it. That is the prediction. Now look at what those four numbers are, because this is a real fit and I did not choose them. Morning departure, inbound aircraft on time: six per cent late, across three hundred and fifty-three flights. Afternoon departure, inbound aircraft late: ninety-six per cent, across a hundred and forty-five. Two questions, and you have separated a six per cent risk from a ninety-six per cent risk. The table underneath walks three actual held-out flights down the tree so you can see there is no sleight of hand. Take the third one. Scheduled at sixteen forty-six, so we go right at the top. Inbound leg was late, so we go right again. Leaf says ninety-six per cent. And that flight left forty-four minutes late. You did that in your head. No arithmetic at all — three comparisons. Now the middle two leaves, because they are the most interesting thing on this frame and they are the reason trees are worth having. One of them is forty-two per cent: morning departure, but the inbound aircraft was late. The other is forty-one per cent: afternoon departure, but the aircraft was fine. Those are essentially the same risk, arrived at by completely opposite routes. An early flight with a broken connection is as risky as a late flight with a clean one. That is called an interaction, and it is exactly the kind of thing a linear model cannot say unless you go and build the interaction term by hand and tell it to look. The tree found it by accident, because splitting is inherently conditional — everything below a node is already a subpopulation. Let me also point out what is actually stored here, because it is almost nothing. A threshold at each internal node, and a number at each leaf. Three thresholds and four numbers. You could write this model on a napkin, hand it to somebody who has never heard of machine learning, and they could run it correctly. No other model in this repo is like that, and that property — not accuracy — is why trees are still everywhere in banking and medicine and anywhere a decision has to be explained to somebody it was made about. And now the obvious question, which is the whole rest of this course. Where did thirteen forty-eight come from? Not thirteen thirty, not two o'clock. Something chose that number, out of hundreds of possibilities, and the next three sections are how.",
}

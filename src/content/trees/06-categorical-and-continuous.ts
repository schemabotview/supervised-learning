import type { Section } from '../types'

export const categoricalAndContinuous: Section = {
  id: 'categorical-and-continuous',
  title: 'Categorical and continuous',
  scene: 'categorical-and-continuous',
  slide: `## A split is \`value ≤ t\`, so the column has to be a number

Continuous columns need nothing — the tree finds its own thresholds, which is why **trees never need scaling.**

### Categories are the problem
Three carriers. Number them 0, 1, 2 and you have invented an order nobody agreed to, and the tree will happily cut through it.

### And it costs you the best split
With three carriers there are three groupings to ask about. Numbering them 0, 1, 2 leaves you only two: \`{N}\` and \`{N, C}\`.

**The best one — Cascade against the other two — cannot be expressed at all.** You give up 0.0115 and settle for 0.0097.

Worse: *which* two survive depends on the order somebody typed the categories into a dict. Rename the airline and your model changes.

### The real cost of one-hot
With 300 categories you get 300 nearly-empty columns, each with a weak split, and a tree that never picks any of them.`,
  narration:
    "Trees split on the question: is this value less than or equal to t. That is the only question they can ask, which has one very convenient consequence and one genuinely annoying one. The convenient one first. Continuous columns need no preparation whatsoever. Departure hour is in hours and precipitation is in millimetres and one of them runs from five to twenty-two while the other runs from zero to twenty-eight, and the tree does not care even slightly. It finds its own threshold on each column separately, and a threshold is unaffected by the units. Remember course three, where unscaled features turned the cost bowl into a canyon and gradient descent zig-zagged down it for a thousand iterations? None of that exists here. Trees are invariant to any monotone transformation of a feature — take logs, take square roots, change from Celsius to Fahrenheit, and you get literally the same tree. You will see people run a standard scaler before fitting a random forest. It does nothing. It is harmless, and it is cargo cult. Now the annoying one. Our carrier column holds three values: Northwind, Cascade, Meridian. There is no number there, and the tree needs a number. So the obvious move is to number them — Northwind is nought, Cascade is one, Meridian is two — and this is where people quietly damage their model, because you have just asserted that Cascade is between the other two, and it is not between anything. There is no order. And the tree will take you at your word and cut through the ordering you invented. Let me show you what that costs, with the actual numbers, because this is usually argued rather than measured. Under one-hot encoding — three separate zero-or-one columns, one per carrier — the tree can ask about any single carrier against the other two. Cascade against the rest scores nought point oh one one five bits. Northwind against the rest, nought point oh oh nine seven. Meridian against the rest, nought point oh oh oh one, essentially nothing. Fine. Now the ordinal version. With carriers numbered nought, one, two, how many splits exist? Two. Cut below nought point five, which gives you Northwind against the other two. Or cut below one point five, which gives you Northwind and Cascade together against Meridian. That is the complete list. And notice what is missing: Cascade against the other two. The best split available — the one worth nought point oh one one five — cannot be expressed at all. The best you can reach is nought point oh oh nine seven. And here is the part that should genuinely bother you: which two of the three groupings you get depends entirely on the order somebody happened to type the categories in. Alphabetise them differently, and a different split becomes reachable and a different one becomes impossible. Your model now depends on an arbitrary decision in a data-loading script. So: one-hot for unordered categories. And be honest about when a category really is ordered — small, medium, large genuinely is ordinal, and numbering it nought, one, two is correct and better than one-hot, because it lets the tree cut anywhere along a real scale. One caveat about one-hot, because it is not free. It works beautifully for three carriers. For a column with three hundred values — airport codes, product IDs — you get three hundred columns, each almost entirely zeros, each supporting only a weak isolated split, and in practice the tree will look at all of them and pick none of them, because none can compete with a real continuous feature. High-cardinality categoricals are a genuinely hard problem, and the modern gradient boosting libraries handle them natively for exactly this reason. Three carriers, though: one-hot, and move on.",
}

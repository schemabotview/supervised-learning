import type { Section } from '../types'

export const skewedDatasets: Section = {
  id: 'skewed-datasets',
  title: 'Skewed datasets',
  scene: 'skewed-datasets',
  slide: `## When one class is 0.5%, accuracy stops being a number

\`return 0\` scores **99.500%**. Three months of work scores **99.645%**. The entire project lives in the third decimal place.

### Worse than uninformative
An accuracy that high is *reassuring*, and it rewards the wrong direction: every move toward "flag nothing" raises it.

### Split it back into four counts
**TP** caught · **FP** wrongly declined · **FN** let through · **TN** correctly ignored. Accuracy is those four averaged together, and averaging is what destroyed the information.

### The two mistakes are not the same size
A missed fraud costs the bank the transaction. A false alarm costs a customer their card at a till. Nothing about \`0.99645\` knows that — and no single number ever will.

### The tell
If your positive class is under a few percent, **never quote accuracy.** Not as a headline, not in passing.`,
  narration:
    "We are going to spend three sections on how you score a model, and the reason is that the obvious way is catastrophically broken for problems like this one, and it is broken in a way that flatters you rather than warning you. Here is the setup. Twenty thousand held-out transactions. One hundred of them are fraudulent. That is nought point five per cent — and that is not an artificial figure, that is roughly what card fraud actually looks like. Now, our model. Three months of work, three turns of the loop, velocity features, per-card baselines. Its accuracy is ninety-nine point six four five per cent. Take a second with that number, because it is a genuinely lovely number. You could put that on a slide. You could take that to a steering committee and people would nod. Now look at the line underneath it. Def predict: return zero. A function that says every single transaction is legitimate. Never fires. Has no parameters. Did not need any data. Its accuracy is ninety-nine point five per cent. The difference between three months of machine learning and a function that does nothing at all is nought point one four five of a percentage point. And this is not a curiosity — this is the default state of affairs for every rare-event problem in the world. Fraud, disease screening, equipment failure, click-through. In every single one of them, accuracy is a number that mostly measures how rare your positive class is. But I want to push harder than that, because “accuracy is uninformative here” undersells it. Accuracy is worse than uninformative; it is actively misleading, and it is misleading in a specific direction. Every change that makes your model more timid — raise the threshold, shrink the weights, flag less — will push accuracy up. The metric is quietly rewarding you for doing nothing, and it will keep doing that right up until your model has stopped firing entirely, at which point it will report ninety-nine point five per cent and you will have shipped a no-op. So what do you do instead? You stop averaging. Look at the table underneath. Those are exactly the same predictions, on exactly the same twenty thousand rows, not averaged — just sorted into the four boxes they belong in. Of the nineteen thousand nine hundred legitimate transactions, nineteen thousand eight hundred and sixty-nine were correctly left alone, and thirty-one were declined. Of the hundred frauds, sixty were caught and forty went through. That is a confusion matrix, it is not complicated, and it contains everything accuracy threw away. And notice what becomes visible the moment you write it down. The two ways of being wrong are completely different things. A missed fraud costs the bank the value of the transaction — real money, measurable, and somebody will chase it. A false alarm costs a customer their card at a till, in front of a queue, and possibly costs you the customer. Those are not comparable quantities. They are not even in the same units. Accuracy folded them together and then divided by twenty thousand, and there is no way back from that. The rule to take away is blunt. If your positive class is under a few per cent, do not quote accuracy. Not as a headline, not as a supporting number, not in passing. It will give everyone in the room a false sense of how well things are going, and it will take you months to undo that.",
}

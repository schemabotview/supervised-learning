import type { Section } from '../types'

export const addingData: Section = {
  id: 'adding-data',
  title: 'Adding data',
  scene: 'adding-data',
  slide: `## Ask the ceiling question first

Before you buy a category of data, ask what recall would be if that category were **solved outright**. It is an upper bound, it is free, and it is off the tally you already have.

### Worst-first is the wrong instinct
Friendly fraud is missed 9 times in 10 — the model's most humiliating number. Solving it perfectly is worth **0.60 → 0.69**, because there are only ten of them.

Card testing is caught half the time and is worth **0.60 → 0.77**. The unembarrassing failure is the valuable one.

### Three ways to get the rows
**Collect** real labelled examples · **augment** rows you already have · **synthesise** the attack from a description of it.

### The rule that governs all three
Augment along a variation you can *state*. Same ring, different amounts and hours — real. Gaussian noise on a card number — you will fit the noise.`,
  narration:
    "Error analysis just told us where the model is weak. The obvious next move is to go and get more data about that weakness — and before you spend a quarter doing it, there is a piece of arithmetic that takes about thirty seconds and that almost nobody performs. It is called ceiling analysis, and the question is this: if this category were solved perfectly — not improved, solved, every single one caught — what would overall recall be? That is an upper bound. You cannot possibly do better than that, and you will do worse. And the striking thing is how often the answer is small enough to cancel the project. Look at the table. Recall today is nought point six. Friendly fraud — where the cardholder buys something and then disputes their own purchase — is missed nine times out of ten. Nine out of ten. That is the model's most humiliating single number, and it is the one that will get raised in the meeting, because a ten per cent catch rate is easy to be outraged about. Solve it outright, perfectly, every one: recall goes from nought point six to nought point six nine. Nine points. Because there are only ten of them in the whole file. Now card testing. Caught half the time. Fifty per cent is not an embarrassing number; nobody is going to shout about fifty per cent. Solve it outright and recall goes from nought point six to nought point seven seven. Seventeen points, nearly twice as much, for fixing the failure that looked less bad. And that is the whole lesson. The worst-looking rate and the most valuable fix are not the same thing, and your instinct will reliably send you to the wrong one, because your instinct is tuned to embarrassment rather than to volume. Ceiling analysis costs you one column of arithmetic on a tally you already produced, and it re-orders your entire roadmap. So: card testing. How do you get more of it? Three ways. The first is to collect it — go and find real card-testing rings in the historical data and label them. Most expensive, slowest, and unambiguously the best data, because it is the actual thing. The second is augmentation: take the card-testing rows you already have and perturb them into new ones. Same ring, different amounts, shifted to a different hour of the day, a different merchant in the same category. The third is synthesis: write down what a card-testing attack is and simulate rows of it, which you can do because it is one of the few attacks that is genuinely simple to describe. And there is one rule that governs both augmentation and synthesis, and breaking it is how people quietly ruin a model. Only vary along a dimension you can actually state. Shifting the hour of a card-testing burst is a real variation, because real rings run at all hours and the fraud does not stop being fraud. Adding Gaussian noise to a card number is not a variation at all; it is nonsense, and what you have built is ten thousand rows of nonsense that your model will obediently learn. Augmentation works when the perturbation is a thing the world actually does. When it is not, you have not added data — you have added a pattern, and the model will find it.",
}

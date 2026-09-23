import type { Section } from '../types'

export const featureEngineering: Section = {
  id: 'feature-engineering',
  title: 'Feature engineering',
  scene: 'feature-engineering',
  slide: `## The column the model could not have found

A plot of land has a **frontage** and a **depth**. Neither predicts price well on its own. Their product — the **area** — predicts it almost exactly.

### Why the model could never find this itself
\`f = w₁·frontage + w₂·depth + b\` is a **weighted sum**. No choice of w₁ and w₂ makes a weighted sum equal a *product*.

The relationship is there in the data and the model is structurally incapable of expressing it.

### So you write the column yourself
\`x₃ = x₁ · x₂\`

One multiplication, and a loose scatter becomes a line.

### This is where domain knowledge pays
The model searches the space you give it. Choosing that space is often worth more than a better algorithm.

Look for **ratios and products** — area, density, price per ft², rate-per-unit-time. And **scale afterwards**: an area column spans a far bigger range than its factors did.`,
  narration:
    "Here is the most valuable thing in this course, and it is not an algorithm. Suppose you are predicting the price of a plot of land, and you have two measurements: the frontage — how wide it is along the road — and the depth, how far back it goes. Look at the left-hand plot. Frontage against price. There is a relationship there, clearly, but it is loose. Plenty of scatter. And if I showed you depth against price it would look much the same: real, and noisy. Now look at the right-hand plot. Same twelve plots of land. The only thing I have done is multiply the two columns together. Frontage times depth is the area, and against area the price lines up almost perfectly. The scatter has essentially vanished. Now here is the part that matters. Your model could never have found that. Not with more data, not with a better learning rate, not by training longer. Look at the model: it is w one times frontage, plus w two times depth, plus b. That is a weighted sum, and there is no choice of w one and w two that makes a weighted sum equal a product. The relationship is sitting right there in the data and the model is structurally incapable of expressing it. So you write the column yourself. One multiplication. x three equals x one times x two, and now the model has something it can use. That is feature engineering, and this is where knowing something about the actual problem pays off in a way that no amount of algorithm-shopping will. The model searches the space you hand it; choosing that space is your job. A couple of habits worth carrying. Look for ratios and products — price per square foot, area, density, anything-per-unit-time. Those are usually where the real signal lives. And scale afterwards, not before: an area column spans a far wider range than either factor did, so the feature you just created is precisely the kind that builds a canyon.",
}

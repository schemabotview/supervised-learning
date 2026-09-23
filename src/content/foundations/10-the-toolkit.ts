import type { Section } from '../types'

export const theToolkit: Section = {
  id: 'the-toolkit',
  title: 'The toolkit, and what is ahead',
  scene: 'the-arc',
  slide: `## Three calls, six courses

Everything ahead is reached through the same small API. Read the code card: only **line 6** changes between chapters.

### The three calls
- \`fit(X, y)\` — search for the parameters
- \`predict(X)\` — apply them to rows you have not seen
- \`score(X, y)\` — the honest number, on held-out data

### What is ahead
- **Regression** — the cost function, and walking downhill
- **Many features** — vectors, scaling, and curved fits
- **Classification** — the sigmoid and log loss
- **Generalizing** — bias, variance, and regularization
- **In practice** — how to decide what to try next
- **Trees** — splits, random forests, boosting`,
  narration:
    "Let us close by looking at what you will actually be typing, and where this is all going. The code card on the left is the shape of every chapter that follows, and I want you to notice how little of it changes. Line four splits the data — that is the habit from the last section, made concrete, and it comes first, before any model exists. Then line six creates a model. Line seven fits it. Line eight scores it on the half that was held back. Now here is the thing worth seeing. When we get to logistic regression, line six becomes LogisticRegression. When we get to decision trees, it becomes DecisionTreeClassifier. When we get to gradient boosting, it becomes XGBClassifier. And that is the only line that changes. Fit, predict, score — three calls, and they are the same three calls for every model in this course and for most models you will meet afterwards. The consistency is deliberate, and once you have internalised it, learning a new algorithm is learning what it does, not learning how to call it. Now the map, on the right. Six courses ahead. Regression comes first, where we make cost function precise and actually walk downhill — the step from box three of the loop. Then many features at once, which is where vectors earn their place and where you find out why scaling your inputs is not optional. Then classification, the sigmoid and log loss. Then generalizing, which takes what we just saw with that red curve and turns it into something you can diagnose and fix rather than just fear. Then a course on practice — the one that answers what should I try next, which is the question you will actually be sitting with at nine o'clock on a Tuesday. And finally trees: splits, random forests and boosting, which is where a great many real problems are still best solved. That is the arc. Let us go and build the first model properly.",
}

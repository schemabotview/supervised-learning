import type { Section } from '../types'

export const theSimplifiedCost: Section = {
  id: 'the-simplified-cost',
  title: 'Two branches, one line',
  scene: 'the-simplified-cost',
  slide: `## y switches a term off

The two branches collapse into one expression:

\`loss = −[ y·log(f) + (1 − y)·log(1 − f) ]\`

### Check it
- **y = 1** → \`−[ 1·log(f) + 0·log(1−f) ]\` = \`−log(f)\` ✓
- **y = 0** → \`−[ 0·log(f) + 1·log(1−f) ]\` = \`−log(1−f)\` ✓

y is exactly 0 or 1, so one term is always multiplied by zero. A **switch written as arithmetic**.

### Why bother
- One differentiable expression, no branch to case-split on — which §08 needs
- It vectorizes: \`-(y*np.log(f) + (1-y)*np.log(1-f)).mean()\` over the whole array at once
- It is what every library actually implements

### The full cost
\`J = −1/m Σ [ y⁽ⁱ⁾log(f⁽ⁱ⁾) + (1−y⁽ⁱ⁾)log(1−f⁽ⁱ⁾) ]\`

This is **binary cross-entropy**. Same object, different name — you will meet it again as the loss of almost every classifier.`,
  narration:
    "Small section, and a genuinely elegant trick. We have two expressions, one for each label, and a conditional is awkward — you cannot easily differentiate an if-statement, and you certainly cannot vectorise one across an array. So here is how they get folded into one line. Write the loss as minus the quantity y times log f, plus one minus y times log of one minus f. Now check it, which takes ten seconds. Suppose y is one. The first term is one times log f, so it survives. The second is zero times log of one minus f, so it vanishes. What remains is minus log f, which is exactly the y equals one branch. Now suppose y is zero. The first term is zero times log f — gone. The second is one times log of one minus f, which survives. Minus log of one minus f, exactly the y equals zero branch. Both cases, correct. The trick is that y is exactly zero or one, never anything between, so multiplying by y or by one minus y acts as a switch. It is a conditional written as arithmetic. Three reasons to bother. It is one differentiable expression with no branch in it, which is what the next section needs when it takes the derivative. It vectorises — that whole thing is one NumPy line evaluated across every example simultaneously, no loop. And it is what every library on earth actually implements, so when you read source code, this is the form you will see. Average it over all m examples and you have the cost function for logistic regression. One more thing about names. This expression is called binary cross-entropy, and it comes out of information theory rather than statistics, by a completely different route. It is the same object. You will meet it again as the loss function of essentially every classifier you ever train, including neural networks, so it is worth recognising in both costumes.",
}

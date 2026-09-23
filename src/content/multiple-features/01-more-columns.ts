import type { Section } from '../types'

export const moreColumns: Section = {
  id: 'more-columns',
  title: 'From one feature to many',
  scene: 'more-columns',
  slide: `## One term per column

A house is not just its size. Add bedrooms and age, and the model gains one weight per column:

\`f(x) = w₁x₁ + w₂x₂ + w₃x₃ + b\`

### Notation, tightened
- **n** — how many features. Here, 3
- **x⁽ⁱ⁾** — the whole row for example *i*, now a **vector** of length n
- **xⱼ⁽ⁱ⁾** — feature *j* of example *i*. Superscript is the row, subscript is the column
- **w** — also a vector of length n. **b** stays a single number

### That sum has a name
\`w · x\` — the dot product. Multiply element-wise, add it all up.

\`f(x) = w · x + b\`

### Read the weights carefully
w₂ is *the effect of one more bedroom, holding size and age fixed*. Not the effect of bedrooms in general — the features are correlated, and that caveat does real work later.`,
  narration:
    "A house is not just its size, and any estate agent would have told you that. It has bedrooms, and an age, and a dozen other things. So let us widen the table. Look at the left: size, bedrooms, age, and then price. Three input columns now instead of one. The model widens to match, and the change is smaller than it looks. Where before we had w times x plus b, we now have w one times x one, plus w two times x two, plus w three times x three, plus b. One weight per column, and the single b on the end as before. That is the whole generalisation. A little notation, because it will appear in everything from here on. n is the number of features — three, here. x superscript i in parentheses is still example i, but it is now a vector: the whole row, all three numbers at once. And when you need to talk about one particular cell, you write x subscript j superscript i — superscript for which row, subscript for which column. Row up top, column down below. w is now a vector too, one entry per feature. b stays a single number; there is only ever one intercept. Now look at the code card, and specifically at the last two lines. That sum — multiply each w by its matching x and add everything up — is such a common operation that it has a name and a symbol. It is the dot product, written w dot x. So the model becomes f of x equals w dot x plus b, and that expression is the same whether n is three or three thousand. One last thing, and it is a genuine trap. It is tempting to read w two — the bedrooms weight — as the value of a bedroom. It is not. It is the effect of one more bedroom while holding size and age fixed, which is a much narrower claim, because bigger houses tend to have more bedrooms. When features move together, individual weights stop meaning what you want them to mean. Hold on to that; it comes back.",
}

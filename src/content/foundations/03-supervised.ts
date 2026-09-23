import type { Section } from '../types'

export const supervised: Section = {
  id: 'supervised',
  title: 'Supervised learning',
  scene: 'labelled-pairs',
  slide: `## Every example arrives with its answer

Supervised learning is the setting where somebody already did the work for the rows you train on.

### What a training set is
- One **row per example** — a house, an email, a scan
- Some columns are the input, written **x**
- One column is the answer, written **y** — that column is the supervision

### What comes out
A function **f**, fitted so that \`f(x) ≈ y\` on the rows it was shown.

### What it is for
A row where the **y is missing**. That is the only reason to have built it.`,
  narration:
    "Supervised learning is the setting where somebody already did the work. Look at the table on the left. Five houses, and for each one we know the size, the number of bedrooms, the age, and — critically — the price it actually sold for. That last column is what makes this supervised. Somebody, somewhere, already established the right answer for these five rows. The word supervised is a little unfortunate, because nobody is watching over the algorithm while it runs. What it means is that the training data is annotated. The answers came with it. The convention is that the input columns are called x and the answer column is called y, and you will see those two letters for the rest of your life in this field, so it is worth fixing them now. x is what you know. y is what you want. Now follow the arrows. The pairs go into a learning procedure, and what comes out is a function — we will call it f — that has been fitted so that when you feed it the x from one of those rows, it gives back something close to that row's y. Notice I said close, not equal. That gap matters enormously and we will come back to it. But here is the part that people skip past, and it is the only part that pays. Look at the table on the far right. One house. Sixteen hundred and eighty square feet, three bedrooms, nine years old. And the price column is a question mark. Nobody has ever sold this house. There is no answer to look up. That row is the entire reason you built f. Everything you did with the five rows on the left was preparation for a row that is not in your table at all.",
}

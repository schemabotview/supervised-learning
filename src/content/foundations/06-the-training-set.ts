import type { Section } from '../types'

export const theTrainingSet: Section = {
  id: 'the-training-set',
  title: 'The notation you will keep seeing',
  scene: 'training-set-notation',
  slide: `## Names for a table you already have

Four symbols carry every formula in the next six courses. All four describe the table on the left.

### The four
- **m** — how many examples. Here, 5
- **n** — how many features. Here, 3
- **x⁽ⁱ⁾** — the whole input row for example *i*. \`X[0]\` is x⁽¹⁾
- **y⁽ⁱ⁾** — the answer for that same row

### Read the superscript carefully
x⁽ⁱ⁾ means **example i**, not *x to the power i*. Parenthesised means "which row".

### Why it is two arrays, not one table
\`X\` is \`(m, n)\` and \`y\` is \`(m,)\`. Every library you will touch expects them separated — the whole point is that y is the thing being withheld at prediction time.`,
  narration:
    "Four symbols carry every formula you will meet in the next six courses, and all four of them are just names for the table on the left. Let us do them one at a time so they never trip you up again. m is how many examples you have. Count the rows: five. So m equals five. n is how many features — how many input columns. Size, bedrooms, age. So n equals three. Notice the y column does not count towards n. It is the answer, not a feature. Then x with a superscript i in parentheses. That is the whole input row for example i. So x superscript one is the first house: fourteen twenty, three bedrooms, twelve years old. All three numbers, as one object. And y superscript i is that same row's answer — two hundred and forty-four. Now, one thing that catches everyone exactly once. The superscript is in parentheses for a reason. x superscript i does not mean x raised to the power i. It means example i. The parentheses are the whole signal, and when you see a subscript instead — x subscript j — that means feature j, the column rather than the row. Row is up top in brackets, column is down below. Look at the code card on the right and you will see all of this as something you can actually type. Same five houses, now as a NumPy array. X dot shape gives five by three — that is m by n, exactly. X index zero is the first row, which is x superscript one; the off-by-one between maths and Python is just something you carry. And y index zero is two hundred and forty-four. One last thing, and it is not arbitrary. Notice that X and y are two separate arrays, not one table with four columns. Every library you will ever touch wants them apart, and the reason is the whole point of this field: at prediction time, y is the thing you do not have.",
}

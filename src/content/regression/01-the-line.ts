import type { Section } from '../types'

export const theLine: Section = {
  id: 'the-line',
  title: 'The model, and a prediction',
  scene: 'the-line',
  slide: `## One line, and a price you can read off it

Twelve houses that actually sold. One straight line through them:

\`f(x) = wx + b\`

### The two numbers
- **w** — the slope. How much the price moves per extra 1000 ft²
- **b** — the intercept. Where the line starts

Here \`w = 0.45\` and \`b = 1.08\`.

### Making a prediction
Go along to the size, up to the line, across to the price. A 3400 ft² house: **about $261k**.

That reading is the product. The whole of the rest of this course is about choosing w and b so the reading is worth trusting.`,
  narration:
    "Twelve houses, and each one actually sold, so each blue dot is a real pair: this size, that price. Running through them is a straight line, and the line is the model. f of x equals w x plus b. Two numbers control it. w is the slope — how much the price moves for each extra thousand square feet. Here it is nought point four five, which in the units on these axes means about forty-five thousand pounds per thousand square feet. And b is the intercept, one point zero eight, which is where the line would cross if a house had no size at all. That is not a meaningful house, and you should not read b as a prediction about one; it is just where the line is pinned. Now watch what the line is actually for. Follow the green guides. Start at three point four on the bottom axis — a thirty-four hundred square foot house. Go straight up until you hit the line. Then go across to the price axis and read it off. About two hundred and sixty-one thousand. Look back at the dots for a moment. There is no house at exactly thirty-four hundred square feet in that data. Nobody has ever sold this house. The line answered anyway, and that is the entire product — everything else is machinery for making that answer worth believing. Which brings the obvious question, and it is the one the next nine sections answer. That line is one of infinitely many I could have drawn. I told you w is nought point four five and b is one point zero eight, as though they were given. Where did they come from? Why not nought point three, or nought point six? To answer that I need to be able to say, precisely, that one line is better than another — and right now I cannot. So that is where we go next.",
}

import type { Section } from '../types'

export const errorAnalysis: Section = {
  id: 'error-analysis',
  title: 'Error analysis',
  scene: 'error-analysis',
  slide: `## Sit down and read them

Bias and variance tell you *how much* room there is. They never tell you **where**. For that you open the rows.

### Skew makes it affordable
0.5% prevalence means the model's entire error set is **71 rows** — 40 frauds through the net, 31 customers wrongly declined. That is an afternoon, not a project.

### The tally is the finding
17 of the 40 misses are one category. **Card testing** — bursts of tiny authorisations probing a stolen number — is half the problem, and nothing in J_val could have told you that.

### Read the false alarms too
Everyone reads the misses. The 31 declined customers are the half that reaches a person, and **16 of them share one pattern.** The last section of this course is about who they turned out to be.

### If there are 5,000 errors
Sample 100 at random. The ranking is what you need, and 100 gives it to you.`,
  narration:
    "Bias and variance are a wonderful instrument and they have one hard limit: they tell you how much room there is, and they never tell you where it is. J validation being nought point four says the model has headroom. It does not say a single word about what the model is getting wrong. For that there is only one technique, and it is not a technique so much as an afternoon. You open the rows and you read them. Now normally that sentence makes people wince, because reading examples by hand sounds like the opposite of engineering. But look at the arithmetic here, because skew — the thing that is about to cause us so much trouble in section six — is doing us an enormous favour right now. Out of twenty thousand held-out transactions, this model gets seventy-one wrong. Forty frauds went through the net and thirty-one legitimate customers were declined. Seventy-one rows. You can read seventy-one rows before lunch. So we did, and we sorted them into piles, and the piles are the upper table. Seventeen of the forty misses are one single category: card testing. That is the attack where somebody with a list of stolen card numbers runs a burst of tiny authorisations — a pound here, fifty pence there — purely to find out which numbers still work. Each individual charge looks completely ordinary. There is nothing wrong with it. It is only a fraud when you see it next to the other forty charges from the same ring in the same six minutes, and our model looks at one row at a time. Seventeen out of forty. Almost half of everything we miss is that one attack, and I want to be emphatic about this: no amount of staring at J train and J validation would ever have told you that. Those two numbers are an average. Averages do not have categories. Now look at the second pile, because this is the half people skip. Everybody reads the misses — the misses are the embarrassing ones, the ones the fraud team gets asked about. Almost nobody reads the false alarms. But the false alarms are the ones that reach an actual human being: thirty-one people whose card was declined at a till, or at a hotel desk, or at a petrol station at eleven at night. And sixteen of those thirty-one — over half — share one pattern. They are people making frequent small charges abroad. Which, if you think about what card testing looks like to a model, is exactly the shape of the thing we just said we cannot catch. The model is not confused; it is being consistent. It is declining a legitimate behaviour because it genuinely resembles the attack. Hold on to those sixteen. We come back to them in the last section of this course, and the answer to who they are is not comfortable. One practical note for when you try this on your own problem. Seventy-one errors is a luxury of working on a rare event. If your model makes five thousand mistakes, do not read five thousand mistakes. Sample a hundred of them at random and read those. You are not trying to build a census; you are trying to find out which pile is the biggest, and a hundred examples settles that question almost as well as five thousand would. What you need from this exercise is a ranking, and a ranking is cheap.",
}

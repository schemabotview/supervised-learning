import type { Section } from '../types'

export const unsupervised: Section = {
  id: 'unsupervised',
  title: 'When there is no y column',
  scene: 'no-labels',
  slide: `## Learning with nothing to copy

Take the answer column away and the question changes. You can no longer ask *"is this prediction right?"* — there is nothing to check it against.

### What is still possible
- **Clustering** — which of these points belong together?
- **Anomaly detection** — which of these looks unlike the rest?
- **Dimensionality reduction** — can fifty columns be said in two?

### The honest difference
Supervised learning has a **right answer to copy**. Unsupervised learning has **structure to find**, and no marking scheme.

### Where it lives
Its own concept — clustering, recommenders and reinforcement learning. This course stays on the labelled side.`,
  narration:
    "Take the answer column away, and the question changes shape. Look at the two plots. They are the same fifteen points, in the same positions, both times. On the right, someone has coloured them — blue, orange, purple — because someone knew what each one was. That is the supervised setting we have been in. On the left, nobody coloured anything. Every point is the same neutral grey, because that is genuinely all the algorithm is given. And yet — look at the left plot again, and try not to see three groups. You cannot. There is a clump up at the top left, a clump at the top right, and a clump down at the bottom middle. Nobody told you that. The structure is in the positions of the points, not in any label, and an algorithm can find it the same way your eye just did. That is unsupervised learning. Three things it does. Clustering, which is what you just did by eye — which points belong together. Anomaly detection, which is the inverse — which single point looks unlike all the rest, and is worth a human's attention. And dimensionality reduction, which asks whether fifty columns of data are really saying fifty different things, or whether two would do. Now, the honest difference, because this is where people get muddled. Supervised learning has a right answer to copy, so you can always ask, was that prediction correct. Unsupervised learning has no marking scheme at all. If the algorithm says there are three clusters and you thought there were four, neither of you is provably wrong. That is not a weakness, it is a different kind of question — but it does mean everything about how you evaluate it is different. Which is why it lives in its own concept, alongside recommenders and reinforcement learning. From here on, this course stays firmly on the labelled side.",
}

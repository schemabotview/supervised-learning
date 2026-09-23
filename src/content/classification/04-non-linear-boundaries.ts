import type { Section } from '../types'

export const nonLinearBoundaries: Section = {
  id: 'non-linear-boundaries',
  title: 'Curved boundaries',
  scene: 'non-linear-boundaries',
  slide: `## A straight rule, on columns you bent

The boundary is linear *in the columns you supply*. Supply different columns and it curves — exactly the trick from polynomial regression, seen from the other side.

### The ring
No straight line separates a cluster from a ring around it.

### One change
\`z = w₁x₁² + w₂x₂² + b\`

Square both columns. The rule is still "predict 1 when z ≥ 0" — still linear in its inputs — but its inputs are now squares, and \`x₁² + x₂² = r²\` **is a circle**.

### The general move
- \`x₁, x₂\` → a straight line
- \`x₁², x₂²\` → a circle or ellipse
- add \`x₁x₂\` → rotate it
- higher degrees → almost any shape

### And the same warning as before
Degree 6 will separate your training data. It will separate almost *any* training data. That is not a feature.`,
  narration:
    "The boundary is linear in the columns you supply. That qualification is doing all the work, and it is the same observation as polynomial regression, seen from the other side. Look at the upper panel. Two classes: a cluster of blue points in the middle, and a ring of orange around them. Now try to separate those with a straight line. You cannot. Not badly — genuinely cannot. Whatever line you draw, it cuts through both groups, and the dashed red line is roughly the best a linear model can manage, which is to say useless. It will get about half of them wrong no matter what you do. Now the lower panel. Same points, exactly the same points, nothing has been moved. The only change is that I have given the model two different columns: not x one and x two, but x one squared and x two squared. And now the decision rule — still the same rule, predict one when z is at least zero, still perfectly linear in whatever it is fed — cuts a circle. Why a circle? Because x one squared plus x two squared equals r squared is the equation of a circle. That is all. The model is drawing a straight boundary in the space of squared features, and a straight boundary there is a circular boundary here. The general move is worth having as a list. Raw columns give you a straight line. Squared columns give you an ellipse or a circle. Add the cross term, x one times x two, and you can rotate and tilt it. Go to higher degrees and you can carve out shapes of essentially arbitrary complexity — blobs, crescents, several disconnected regions. And there is the warning, and it is the same warning as last course, which should be starting to feel like a drumbeat. A degree six boundary will separate your training data. It will separate almost any training data you hand it, including data with no real structure at all. That is not evidence that it is right. It is the next course.",
}

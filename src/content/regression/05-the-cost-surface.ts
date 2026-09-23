import type { Section } from '../types'

export const theCostSurface: Section = {
  id: 'the-cost-surface',
  title: 'Both parameters at once',
  scene: 'the-cost-surface',
  slide: `## The bowl, seen from directly above

Let b vary again. J is now a surface over the (w, b) plane — a bowl. Drawn the way a map draws a hill: **level sets**.

### Reading it
- Each ring is every (w, b) with the **same cost**
- Rings close together — the surface is steep there
- Rings far apart — it is nearly flat
- They shrink onto the single point where J is smallest

### The rings are ellipses, and they lean
They are not circles. That means **a step of the same size costs differently depending on the direction** you take it.

The lean comes from the features themselves — and when features are on wildly different scales, the bowl becomes a long narrow canyon. Fixing that is a whole section of the next course.

### Still one minimum
The guarantee from the last section survives: one bottom, no traps.`,
  narration:
    "Now let b vary again, so we are back to two parameters. J is a function of two numbers, which makes it a surface — a bowl sitting over the w-b plane. And a bowl drawn in perspective on a flat frame is almost impossible to read anything off precisely, so we will do what map-makers do with hills. Contours. Level sets. Every ring you see is a set of parameter pairs that all produce exactly the same cost. Walk around a ring and the line you are describing changes, but how badly it fits stays identical. Step across the rings and the cost changes. And the rings tighten inward, smaller and smaller, closing on one point — the bottom of the bowl, the best w and b. Two things to read off this. First, the spacing. Where rings are crowded, the surface is steep; a small change in parameters changes the cost a lot. Where they are spread apart, it is nearly flat. Look near the middle — the rings there are far apart, which is telling you something useful and slightly deflating: near the optimum, quite a range of different lines score almost the same. Second, and this one matters later: these rings are ellipses, not circles, and they lean. If they were circles, every direction would be equivalent — a step of a given length would change the cost by the same amount whichever way you went. They are not circles. They are stretched along one axis, which means the cost is far more sensitive to one parameter than the other. And that asymmetry comes straight out of the numbers in the data. Here it is mild. When you have features on genuinely different scales — square feet in the thousands next to bedrooms in single digits — the ellipses stretch out into a long thin canyon, and the algorithm we are about to write handles a canyon badly. That is a real problem with a real fix, and it gets its own section next course. For now, hold on to the shape. And notice the guarantee survived: however stretched it is, there is still exactly one bottom.",
}

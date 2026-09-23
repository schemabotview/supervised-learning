import type { Section } from '../types'

export const regressionVsClassification: Section = {
  id: 'regression-vs-classification',
  title: 'Regression or classification',
  scene: 'two-shapes',
  slide: `## What kind of thing is y?

Supervised learning splits in two, and the split is decided entirely by the **answer column**.

### Regression — y is a number
*How much? How many?* The answer lives anywhere on a continuous axis.

House price · tomorrow's demand · a patient's blood pressure

### Classification — y is one of a fixed set
*Which one?* There is a small list, and the answer is a member of it.

Spam or not · benign or malignant · which of ten digits

### Why the distinction decides everything
It picks your **model**, your **cost function** and your **score**. Asking it is the first thing you do, every time.`,
  narration:
    "Supervised learning splits into two families, and the thing that decides which one you are in is not the data you have, not the algorithm you like — it is the answer column. What kind of thing is y? Look at the left-hand plot. Each blue dot is a house: its size along the bottom, the price it sold for up the side. The price can be two hundred and forty thousand, or two hundred and forty-one, or two hundred and forty thousand five hundred. It lives anywhere on that axis. There is no list of allowed prices. When y is a number like that, you are doing regression, and the job is to draw the line — the orange one — so that for any size you care to name, you can read a price off it. The green marker shows exactly that: a house we have not seen, at thirty-two hundred square feet, and the model says about two hundred and forty-five thousand. Now look at the right-hand plot. Same picture at first glance — points scattered on two axes — but look at what the colours mean. Blue is benign, orange is malignant. There is no in-between. A tumour is not zero point six malignant. The answer is one of exactly two things, and the job has changed shape completely: instead of drawing a line the points sit ON, you are drawing a line the points sit either SIDE of. That dashed boundary is the model. Feed it a new patient and the answer is not a number you read off an axis, it is which side you landed on. That is classification. And this distinction is not academic bookkeeping. It picks your model, it picks your cost function — the thing that measures how wrong you are — and it picks how you score yourself at the end. Different in all three cases. So asking what kind of thing is y is genuinely the first thing you do, every single time, before you have chosen anything else.",
}

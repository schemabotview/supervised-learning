import type { Section } from '../types'

export const transferLearning: Section = {
  id: 'transfer-learning',
  title: 'Transfer learning',
  scene: 'transfer-learning',
  slide: `## The one fix that needs none of your data

Somebody trained a model on a million examples of a *different* problem. Keep what it learned about the input; replace only what it learned about the task.

### Why it works at all
The early layers learn things about the **medium**, not the job. Edges and textures before faces. Grammar and word sense before sentiment. That part transfers; the last layer never does.

### What has to be true
Same kind of input. The generic stage has to come first. And your own set is *small* — with a million labelled rows you would not be borrowing.

### It does not apply to your table
There is no pretrained model of card transactions: those columns mean nothing outside this issuer. **Transfer learning is for shared media, not shared schemas.**

### Where it did apply
Classifying the free-text merchant descriptor — 900 labelled examples, and a language model that had already read everything else.`,
  narration:
    "Every fix in this course so far has been spending: more data, more features, more time round the loop. There is one fix that is essentially free, and it is free because somebody else already paid for it. The idea is called transfer learning, and it is this. Somebody trained a large model on a million examples of a problem that is not yours. A model that has looked at a million photographs, or read most of the internet. They then published it. You take that model, you throw away its final output layer — the part that is specifically about their task — and you keep everything underneath. Then you train that last layer, and sometimes gently adjust the rest, on your own few hundred examples. Why on earth should that work? Because of what the early stages of such a model actually learn, which is not about the task at all. A model trained to recognise a thousand categories of photograph spends its first layers learning about edges, and corners, and gradients, and textures. None of that is about cats. That is about what photographs are. A model trained on a very large amount of text learns grammar, and which words travel together, and what a negation does to a sentence. None of that is about product reviews. That is about what English is. The early stages learn the medium; the final stage learns the job. And the medium is shared, which is why you can borrow it. So the recipe is three steps, and the first one has already happened without you: somebody pretrained, on hardware you do not own, months ago. You download it. You replace the head. You fine-tune on your nine hundred rows. And nine hundred rows, which would be a hopeless amount of data to learn a language from scratch with, is a perfectly reasonable amount to point an existing understanding of language at a new question. Now here is the honest part, and it is why this section is short. Transfer learning does not apply to our fraud model at all. Not a little bit — not at all. There is no pretrained model of card transactions, and there could not be one, because the columns in this file mean nothing outside this issuer. My column seven is a risk band computed by our own scoring system. Yours is something else entirely. There is no shared medium for us to have both learned about. Transfer learning works for images, for audio, for text — the media that everybody's data is made of — and it does not work for arbitrary tables, no matter how much you would like it to. Where did it apply on this project? One place. Our transactions carry a free-text merchant descriptor, that mangled string that shows up on your statement, and the team wanted to classify it. They had nine hundred labelled examples, which is nothing. They took a pretrained language model, replaced the head, fine-tuned it on the nine hundred, and had something usable in an afternoon. That is the pattern to look for: not your main table, but the small text or image sub-problem sitting inside your project, the one you were going to skip because you did not have the data for it. That is the one where somebody else's million examples are waiting for you.",
}

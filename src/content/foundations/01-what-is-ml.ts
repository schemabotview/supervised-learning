import type { Section } from '../types'

export const whatIsMl: Section = {
  id: 'what-is-ml',
  title: 'What machine learning is',
  scene: 'rules-vs-fit',
  slide: `## Who writes the rule?

In ordinary programming **you** write the rule and the machine runs it. Machine learning turns that arrow around.

### The trade
- You supply **examples** — inputs, and the answers that go with them
- The machine searches for a **rule that reproduces them**
- You get a program nobody typed out

### What you give up
- The rule is **found, not stated** — you cannot read it off like an \`if\`
- It is only as good as the examples, and it inherits everything in them

### Arthur Samuel, 1959
A field of study that gives computers the ability to learn **without being explicitly programmed**.`,
  narration:
    "Here is the whole field in one contrast, and it is worth getting straight before anything else. Look at the top band. This is ordinary programming, the kind you have done before. A person decides the logic — the rules — and writes them down. Data arrives, the machine applies those rules, and answers come out. The rules go IN. Now look at the bottom band. The same three things are there, but two of the arrows have swapped ends. Data goes in, and so do the answers — we already know what the right output was for these particular cases. What comes OUT is the rule. That is machine learning. It is not a smarter kind of programming, it is a different direction of authorship. You stop writing the logic and you start supplying examples of the logic being right, and a search procedure finds something that reproduces them. Arthur Samuel put it in 1959 as the ability to learn without being explicitly programmed, and that phrase is doing exactly this work. Now, you give something up in the trade, and it is only fair to say it now rather than in five courses' time. You cannot read the rule off the page any more. It exists as a pile of numbers, and when it goes wrong you cannot point at a line and say, there, that is the bug. And it is only ever as good as the examples you handed it. Every bias in your data is a bias in your model, faithfully reproduced. Keep both of those in mind. Everything else in this course is detail on the lower band.",
}

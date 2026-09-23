import type { Section } from '../types'

export const rulesThatKeepGrowingSection: Section = {
  id: 'rules-that-keep-growing',
  title: 'Why bother learning the rule',
  scene: 'rules-that-keep-growing',
  slide: `## The rule you cannot finish writing

Nobody reaches for machine learning because hand-written rules are *wrong*. They reach for it because the list **never closes**.

### Three ways this code loses
- **No last rule** — every miss adds a line, and misses keep arriving
- **It goes stale** — spammers read your filter and route around it
- **Magic numbers** — why more than twelve exclamation marks, and not nine?

### The reframe
Stop asking *"what is the rule?"* and start asking *"what did the answer look like last time?"*

You have thousands of emails a human already sorted. That is the training set.`,
  narration:
    "Nobody reaches for machine learning because hand-written rules are wrong. Look at the code on the left. Every single line in it is correct. Free money in the body, more than twelve exclamation marks, a brand-new sender with a link in the message — these are real signals, and each one catches real spam. The problem is not that the code is wrong. The problem is that it is unfinishable. Follow the comments down the right-hand side. Each of those lines was added after something got through. Somebody complained, an engineer looked at the message, saw the trick, and patched it. So the fourth rule exists because somebody wrote free money with a three for the e and a zero for the o. The fifth exists because somebody used all capitals in the subject. And tomorrow they will change the wording again, and there will be a sixth. There is no last rule. Look at the panel on the right for the other two failures. This code goes stale by design — the people you are filtering can read your behaviour and route around it, so a filter that worked beautifully last month quietly stops working. And then the magic numbers. Why more than twelve exclamation marks? Why not nine, or fifteen? Somebody picked twelve, probably in an afternoon, probably by looking at about four emails. That number is now load-bearing and nobody knows if it is right. So here is the reframe, and it is the move that starts the whole field. Stop asking, what is the rule. Start asking, what did the answer look like last time. Because you have something you have been ignoring: thousands of emails that a human already sorted into spam and not-spam. That pile is not a chore. That pile is the training set.",
}

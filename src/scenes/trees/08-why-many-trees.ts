import type { Scene } from '@graphlearning/flow'
import { VAL } from './_data'
import { BAGGED, BOOTSTRAP_TREES, DEEP_TREE, PAIRWISE_DISAGREEMENT } from './_models'
import { accuracy, classify, countLeaves, forestAccuracy, yLate } from './_tree'

// §08. The case against a single tree, made with the trees rather than about them. Eight bootstrap
// resamples of the same 999 flights produce eight trees that pick FOUR different root splits between
// two columns — which is what §04's five-ten-thousandths-of-a-bit margin means in practice. A margin
// that small is decided by whichever rows happened to be drawn.
//
// The comparison at the bottom is deliberately against the MEAN of the eight rather than against the
// one tree grown on all the data. That tree scores 0.804, which is better than six of the eight and
// makes bagging look like it buys almost nothing — but 0.804 is a draw from the same noisy
// distribution, and comparing an average against a lucky sample is how you talk yourself out of an
// ensemble. The honest baseline is what a single tree does ON AVERAGE.
const accs = BOOTSTRAP_TREES.map((t) => accuracy(t, VAL, yLate))
const mean = accs.reduce((a, b) => a + b) / accs.length
// The eight of them voting — the whole of bagging, at n = 8.
const voteEight = (f: (typeof VAL)[number]) =>
  BOOTSTRAP_TREES.reduce((a, t) => a + classify(t, f), 0) / BOOTSTRAP_TREES.length
const eightAcc = VAL.filter((f) => (voteEight(f) >= 0.5 ? 1 : 0) === f.late).length / VAL.length

export const whyManyTrees: Scene = {
  id: 'why-many-trees',
  title: 'The same data, resampled, gives a different tree',
  flow: 'TB',
  nodes: [
    {
      id: 'eight',
      kind: 'table',
      label: 'Eight trees, eight bootstrap resamples of the same 999 flights',
      sub: 'a bootstrap sample is 999 rows drawn WITH replacement — about a third of the originals are missing from each',
      pattern: 'user',
      headers: ['tree', 'split it chose at the root', 'leaves', 'held-out accuracy'],
      values: BOOTSTRAP_TREES.map((t, i) => [
        `#${i + 1}`,
        t.split ? `${t.split.column.label}  ${t.split.column.fmt(t.split.threshold)}` : '—',
        String(countLeaves(t)),
        accuracy(t, VAL, yLate).toFixed(3),
      ]),
    },
    {
      id: 'vote',
      kind: 'table',
      label: 'Wildly different trees, and averaging them beats every one',
      sub: `any two of those eight disagree on ${(PAIRWISE_DISAGREEMENT * 100).toFixed(1)}% of held-out flights — that spread is variance, and it is what a vote cancels`,
      pattern: 'network',
      headers: ['', 'held-out accuracy'],
      values: [
        ['one tree, on average over the eight', mean.toFixed(3)],
        ['the best of the eight (you cannot know which)', Math.max(...accs).toFixed(3)],
        ['all eight voting', eightAcc.toFixed(3)],
        ['80 of them voting — bagging', forestAccuracy(BAGGED, VAL, yLate).toFixed(3)],
        ['(for reference: one tree on all 999 rows)', accuracy(DEEP_TREE, VAL, yLate).toFixed(3)],
      ],
    },
  ],
  edges: [{ source: 'eight', target: 'vote', label: 'so take a vote' }],
}
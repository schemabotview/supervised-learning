import type { Scene } from '@graphlearning/flow'
import { COLUMNS, TRAIN } from './_data'
import { candidatesOn, entropyImpurity, yLate } from './_tree'

// §02. The search, with the scoring function still in a box marked "better?" — §03 and §04 open it.
// Putting the procedure first is deliberate: the algorithm is astonishingly dumb, and seeing how
// dumb it is before seeing the clever bit is what makes the clever bit look small rather than
// magical.
//
// The candidate counts are the real ones. The number that does the work here is 766: `depHour` is
// continuous, so a reader expects infinitely many thresholds, and there are 766 — because anything
// between two observed values splits the rows identically. That is the fact that makes an
// exhaustive search affordable, and it is worth a table of its own.
const counts = COLUMNS.map((c) => ({ c, n: candidatesOn(TRAIN, c, yLate, entropyImpurity).length }))
const total = counts.reduce((a, x) => a + x.n, 0)

export const howASplitIsChosen: Scene = {
  id: 'how-a-split-is-chosen',
  title: 'Try everything, keep the best, never look back',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      hug: true,
      filename: 'the entire algorithm, at one node',
      label: [
        'best = None',
        'for column in columns:                 # all 6',
        '    for t in midpoints(column):        # every gap between values',
        '        left  = rows[column <= t]',
        '        right = rows[column >  t]',
        '        if better(left, right) > best: # <- §03 and §04',
        '            best = (column, t)',
        '',
        'split on best, then do the same thing again',
        'on each half, and stop when told to.',
      ].join('\n'),
    },
    {
      id: 'space',
      kind: 'table',
      label: `${total.toLocaleString('en-GB')} candidate splits at the root — and that is the whole search space`,
      sub: 'a continuous column does NOT have infinitely many splits: anything between two observed values cuts the rows identically',
      pattern: 'user',
      headers: ['column', 'distinct values', 'splits worth trying', 'why that many'],
      values: counts.map(({ c, n }) => [
        c.label,
        String(n + 1),
        String(n),
        c.binary ? 'yes or no — one cut' : 'one midpoint per gap',
      ]),
    },
  ],
  edges: [{ source: 'loop', target: 'space', label: 'how big is that?' }],
}

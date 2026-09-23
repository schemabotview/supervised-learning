import type { Scene, SceneNode } from '@graphlearning/flow'
import { VAL, hhmm, type Flight } from './_data'
import { SMALL_TREE, pathOf, predict } from './_tree'

// §01. The model itself, before any of the machinery that produced it. A tree is the one model in
// this repo you can execute by hand, and the whole section is the reader walking a row down it.
//
// The numbers on the nodes are the FITTED tree's — a depth-2 tree grown on the 999 training flights
// — not a drawing. Two things in it are worth the reader's attention and neither was arranged:
// the deepest leaf is 96% late and the shallowest is 6%, so the thing genuinely separates; and the
// two middle leaves land at 42% and 41% by completely different routes, which is a real finding
// about this airport rather than a coincidence the author needed.
const root = SMALL_TREE
const [L, R] = [root.left!, root.right!]
const pctLate = (v: number) => `${Math.round(v * 100)}% late`
const leaf = (id: string, node: typeof root, pattern: 'user' | 'warn' | 'storage'): SceneNode => ({
  id,
  label: pctLate(node.value),
  sub: `${node.n} flights`,
  pattern,
  icon: node.value >= 0.5 ? 'clock' : 'circlecheck',
})

// Three real validation flights, chosen to land in three different leaves.
const pick = (f: (x: Flight) => boolean) => VAL.find(f) as Flight
const examples = [
  pick((f) => f.depHour < 12 && f.priorLegLate === 0 && f.minutes < 10),
  pick((f) => f.depHour > 15 && f.priorLegLate === 0),
  pick((f) => f.depHour > 16 && f.priorLegLate === 1),
]

export const theTreeModel: Scene = {
  id: 'the-tree-model',
  title: 'A model you can run in your head',
  flow: 'TB',
  nodes: [
    {
      id: 'tree',
      label: 'One fitted tree',
      sub: `grown on 999 flights · every number below is the tree's, not the author's`,
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'q-hour', label: 'Before 13:48?', sub: 'scheduled departure', pattern: 'network', icon: 'clock' },
        { id: 'q-am', label: 'Inbound late?', sub: 'the aircraft before', pattern: 'network', icon: 'repeat' },
        { id: 'q-pm', label: 'Inbound late?', sub: 'the aircraft before', pattern: 'network', icon: 'repeat' },
        leaf('l-am-ok', L.left!, 'storage'),
        leaf('l-am-late', L.right!, 'user'),
        leaf('l-pm-ok', R.left!, 'user'),
        leaf('l-pm-late', R.right!, 'warn'),
      ],
      edges: [
        { source: 'q-hour', target: 'q-am', label: 'yes' },
        { source: 'q-hour', target: 'q-pm', label: 'no' },
        { source: 'q-am', target: 'l-am-ok', label: 'no' },
        { source: 'q-am', target: 'l-am-late', label: 'yes' },
        { source: 'q-pm', target: 'l-pm-ok', label: 'no' },
        { source: 'q-pm', target: 'l-pm-late', label: 'yes' },
      ],
    },
    {
      id: 'walk',
      kind: 'table',
      label: 'Three held-out flights, walked down it by hand',
      sub: 'no arithmetic anywhere — you compare, you turn left or right, you read the leaf',
      pattern: 'user',
      headers: ['scheduled', 'inbound late?', 'path', 'the tree says', 'what happened'],
      values: examples.map((f) => [
        hhmm(f.depHour),
        f.priorLegLate ? 'yes' : 'no',
        pathOf(SMALL_TREE, f)
          .map((n) => `${Math.round(n.value * 100)}%`)
          .join(' → '),
        pctLate(predict(SMALL_TREE, f)),
        `${f.minutes > 0 ? '+' : ''}${f.minutes} min`,
      ]),
    },
  ],
  edges: [{ source: 'tree', target: 'walk', label: 'reading it' }],
}

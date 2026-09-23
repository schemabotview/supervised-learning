import type { Scene } from '@graphlearning/flow'

// §01. The whole discipline in one contrast: who writes the rule. The top band is ordinary
// programming — a person decides the logic and the machine executes it. The bottom band is machine
// learning — a person supplies examples and the machine decides the logic. Same inputs, same
// outputs, and the arrow of authorship reversed. Everything in the next seven courses is detail on
// the lower band.
export const rulesVsFit: Scene = {
  id: 'rules-vs-fit',
  title: 'Two ways to end up with a program',
  flow: 'TB',
  nodes: [
    {
      id: 'classic',
      label: 'Classical programming',
      sub: 'a person writes the rule',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'c-rules', label: 'Rules', sub: 'written by hand', pattern: 'user', icon: 'scroll' },
        { id: 'c-data', label: 'Data', sub: 'the input', pattern: 'storage', icon: 'database' },
        { id: 'c-out', label: 'Answers', sub: 'computed', pattern: 'service', icon: 'gears' },
      ],
      edges: [
        { source: 'c-rules', target: 'c-out' },
        { source: 'c-data', target: 'c-out' },
      ],
    },
    {
      id: 'ml',
      label: 'Machine learning',
      sub: 'the rule is fitted',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'm-data', label: 'Data', sub: 'the input', pattern: 'storage', icon: 'database' },
        { id: 'm-ans', label: 'Answers', sub: 'the labels', pattern: 'storage', icon: 'circlecheck' },
        { id: 'm-fit', label: 'Learning', sub: 'search the rules', pattern: 'service', icon: 'gears' },
        { id: 'm-rules', label: 'Rules', sub: 'found, not written', pattern: 'user', icon: 'scroll' },
      ],
      edges: [
        { source: 'm-data', target: 'm-fit' },
        { source: 'm-ans', target: 'm-fit' },
        { source: 'm-fit', target: 'm-rules' },
      ],
    },
  ],
  edges: [{ source: 'classic', target: 'ml', label: 'turn the arrow around' }],
}

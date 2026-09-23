import type { Scene } from '@graphlearning/flow'

// §09. Everything the previous eight sections were about is one box of six. The grid is laid out
// row-major and carries no internal edges on purpose: a six-node cycle drawn with arrows either
// needs a back-edge (which the longest-path layout cannot place) or sprawls into a band too wide to
// read. The sixth card IS the return arrow.
//
// The second group is the part that cannot be learned from a validation split, and all three are
// specific to this problem rather than generic ops advice: adversaries read your decisions, a
// blocked transaction never produces a label, and a scoring call that misses its budget is a
// declined sale regardless of what it would have said.
export const theFullCycle: Scene = {
  id: 'the-full-cycle',
  title: 'The model is about a fifth of the project',
  flow: 'TB',
  nodes: [
    {
      id: 'cycle',
      label: 'The full cycle',
      sub: 'left to right, top row then bottom — and then round again, for as long as the product exists',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-scope', label: 'Scope it', sub: 'which decision changes?', pattern: 'user', icon: 'scroll' },
        { id: 'c-data', label: 'Get data', sub: 'define the label first', pattern: 'storage', icon: 'database' },
        { id: 'c-train', label: 'Train', sub: 'the four-box loop', pattern: 'network', icon: 'gears' },
        { id: 'c-deploy', label: 'Deploy', sub: 'behind an API, in 50ms', pattern: 'service', icon: 'cpu' },
        { id: 'c-watch', label: 'Monitor', sub: 'the inputs, not just y', pattern: 'service', icon: 'gauge' },
        { id: 'c-again', label: 'Back to scope', sub: 'a model is never done', pattern: 'user', icon: 'repeat' },
      ],
    },
    {
      id: 'after',
      label: 'Only ever visible in production',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-drift', label: 'They adapt', sub: 'the attack reads your rule', pattern: 'warn', icon: 'waves' },
        { id: 'a-loop', label: 'No label', sub: 'a blocked row never resolves', pattern: 'warn', icon: 'lock' },
        { id: 'a-latency', label: 'Too slow', sub: '50ms, or the sale is gone', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'cycle', target: 'after', label: 'no split shows these' }],
}

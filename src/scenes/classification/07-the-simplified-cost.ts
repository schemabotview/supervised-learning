import type { Scene } from '@graphlearning/flow'

// §07. The algebraic trick that turns two branches into one expression. It is a small thing and it
// matters more than it looks: the one-line form is what makes the cost differentiable as a single
// expression, which is what §08 needs, and it is what every library actually implements.
export const theSimplifiedCost: Scene = {
  id: 'the-simplified-cost',
  title: 'Two branches, one line',
  flow: 'TB',
  nodes: [
    {
      id: 'branches',
      kind: 'code',
      hug: true,
      filename: 'the same thing, as a conditional',
      label: [
        'if y == 1:',
        '    loss = -log(f)',
        'else:            # y == 0',
        '    loss = -log(1 - f)',
      ].join('\n'),
    },
    {
      id: 'one',
      kind: 'code',
      hug: true,
      filename: 'and with y used as the switch',
      label: [
        'loss = -( y * log(f) + (1 - y) * log(1 - f) )',
        '',
        '# y = 1  ->  -( 1*log(f) + 0*log(1-f) )  =  -log(f)',
        '# y = 0  ->  -( 0*log(f) + 1*log(1-f) )  =  -log(1-f)',
        '#',
        '# y is 0 or 1, so one term is always switched off.',
        '# No branch -> one differentiable expression.',
        '',
        'J = loss.mean()',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'branches', target: 'one', label: 'y switches a term off' }],
}

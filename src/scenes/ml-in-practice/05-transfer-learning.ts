import type { Scene } from '@graphlearning/flow'

// §05. The one fix on the menu that does not need any of your data. Kept deliberately structural —
// no architecture, no layer counts — because the mechanism belongs to ../deep-learning and the
// DECISION belongs here: what you must have for borrowing to be legal, and the case where it is
// simply not available.
//
// The last card is the honest one and the reason this section sits inside a fraud course rather
// than floating free. There is no pretrained model of card transactions: the fraud table's columns
// mean nothing outside this issuer, so transfer learning does not touch the main model at all. It
// applies to the team's one TEXT sub-problem — classifying the free-text merchant descriptor with
// 900 labelled examples — and that distinction is what stops the technique being cargo-culted.
export const transferLearning: Scene = {
  id: 'transfer-learning',
  title: 'Borrowing a model somebody else already trained',
  flow: 'TB',
  nodes: [
    {
      id: 'recipe',
      label: 'The recipe',
      sub: 'step one already happened, on hardware you do not own, months ago',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'r-pre', label: 'Pretrain', sub: 'someone else · huge corpus', pattern: 'external', icon: 'boxes' },
        { id: 'r-keep', label: 'Keep the body', sub: 'drop the output layer', pattern: 'network', icon: 'layers' },
        { id: 'r-tune', label: 'Fine-tune', sub: 'on your 900 rows', pattern: 'user', icon: 'sliders' },
      ],
      edges: [
        { source: 'r-pre', target: 'r-keep', label: 'download it' },
        { source: 'r-keep', target: 'r-tune', label: 'your labels' },
      ],
    },
    {
      id: 'rules',
      label: 'What has to be true',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-same', label: 'Same input type', sub: 'text to text, image to image', pattern: 'service', icon: 'table' },
        { id: 'k-generic', label: 'Generic first', sub: 'edges before eyelids', pattern: 'service', icon: 'layers' },
        { id: 'k-small', label: 'Small target set', sub: 'hundreds — not millions', pattern: 'service', icon: 'database' },
        { id: 'k-tabular', label: 'Not your table', sub: 'no pretrained card ledger', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'recipe', target: 'rules', label: 'before you reach for it' }],
}

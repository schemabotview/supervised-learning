import type { Scene } from '@graphlearning/flow'

// §02. The menu, with the licence attached to each item. This is deliberately a lookup and not a
// figure: the whole value is that the middle column SORTS the six fixes into two groups that point
// in opposite directions, so there is no move that is safe to make without a diagnosis first.
//
// `generalization` §09 gave the same asymmetry as a diagnosis table read from the two error gaps.
// This one is the inverse lookup — you arrive with a thing you want to try, and it tells you which
// measurement would have to be true for it to help.
export const decidingWhatToTry: Scene = {
  id: 'deciding-what-to-try',
  title: 'Six things to try, and what licenses each',
  flow: 'TB',
  nodes: [
    {
      id: 'menu',
      kind: 'table',
      label: 'The menu',
      sub: 'every fix helps exactly one of the two failure modes — and hurts the other',
      pattern: 'user',
      headers: ['if you are about to try…', 'it only helps', 'which needs to be true'],
      values: [
        ['collect more training examples', 'high variance', 'J_val ≫ J_train'],
        ['use fewer features', 'high variance', 'J_val ≫ J_train'],
        ['increase λ', 'high variance', 'J_val ≫ J_train'],
        ['find additional features', 'high bias', 'J_train ≈ J_val, both high'],
        ['add polynomial features', 'high bias', 'J_train ≈ J_val, both high'],
        ['decrease λ', 'high bias', 'J_train ≈ J_val, both high'],
      ],
    },
    {
      id: 'traps',
      label: 'What goes wrong anyway',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-guess', label: 'Guessing', sub: 'the halves pull opposite ways', pattern: 'warn', icon: 'scale' },
        { id: 't-both', label: 'Two at a time', sub: 'now neither one is measured', pattern: 'warn', icon: 'sliders' },
      ],
    },
  ],
  edges: [{ source: 'menu', target: 'traps', label: 'the two traps' }],
}

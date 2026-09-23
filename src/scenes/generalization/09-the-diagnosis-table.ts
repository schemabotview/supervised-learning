import type { Scene } from '@graphlearning/flow'

// §09. The course as one lookup. It is a table rather than a figure on purpose: this is the thing a
// reader comes back to six months later, mid-project, and it has to be scannable rather than
// beautiful. The asymmetry in the last column is the lesson — the two diagnoses do not share a
// single fix, so guessing costs you a week either way.
export const theDiagnosisTable: Scene = {
  id: 'the-diagnosis-table',
  title: 'Two numbers in, one decision out',
  flow: 'TB',
  nodes: [
    {
      id: 'diag',
      kind: 'table',
      label: 'read J_train against the baseline, then J_val against J_train',
      sub: 'the two gaps, and what each one licenses',
      pattern: 'user',
      headers: ['baseline → J_train', 'J_train → J_val', 'diagnosis', 'what actually helps'],
      values: [
        ['large', 'small', 'high bias', 'more features · higher degree · LOWER λ'],
        ['small', 'large', 'high variance', 'more data · fewer features · RAISE λ'],
        ['large', 'large', 'both at once', 'fix the bias first, then re-read'],
        ['small', 'small', 'done', 'stop tuning · read the test set once'],
      ],
    },
    {
      id: 'traps',
      label: 'The two that cost weeks',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-data', label: 'More data for bias', sub: 'a flat curve stays flat', pattern: 'warn', icon: 'database' },
        { id: 't-test', label: 'Tuning on test', sub: 'it stops being an estimate', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'diag', target: 'traps', label: 'the two wrong moves' }],
}

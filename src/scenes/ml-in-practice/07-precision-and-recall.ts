import type { Scene } from '@graphlearning/flow'
import { confusion, precision, recall, f1, accuracy, VAL, FRAUD_COUNT, LEGIT_COUNT, pct } from './_data'

// §07. Two numbers, and the reason there have to be two. The table is the argument: each of the
// three degenerate classifiers scores PERFECTLY on one column while being worthless, and none of
// them can hold F1 up, because a harmonic mean is dragged to whichever of its inputs is smaller.
//
// The three cheats are computed, not invented. "Flag the single highest-scoring row" needs the top
// row to actually be fraudulent for precision to be 1.00 — it is (score 0.999) — and the check is
// done here rather than assumed, because if a future reseed changed it the frame would quietly lie.
const c = confusion(0.5)
const m = VAL.length
const top = VAL.reduce((a, b) => (b.s3 > a.s3 ? b : a))
const one = { tp: top.y === 1 ? 1 : 0, fp: top.y === 1 ? 0 : 1, fn: FRAUD_COUNT - (top.y === 1 ? 1 : 0), tn: LEGIT_COUNT - (top.y === 1 ? 0 : 1) }
const never = { tp: 0, fp: 0, fn: FRAUD_COUNT, tn: LEGIT_COUNT }
const always = { tp: FRAUD_COUNT, fp: LEGIT_COUNT, fn: 0, tn: 0 }
// Two decimals everywhere EXCEPT below 0.1, where two would round the whole argument away: the
// always-fraud cheat has a precision of 0.005, and `0.01` in that cell both contradicts the
// narration and makes a catastrophic number look merely poor. Accuracy carries three places for the
// same reason — 99.500 against 99.505 against 99.645 is the point, and two places collapses them.
const fmt = (x: number) => (Number.isNaN(x) ? '—' : x.toFixed(x !== 0 && x < 0.1 ? 3 : 2))
const line = (name: string, k: typeof c) => [name, fmt(precision(k)), fmt(recall(k)), fmt(f1(k)), pct(accuracy(k), 3)]

export const precisionAndRecall: Scene = {
  id: 'precision-and-recall',
  title: 'Two numbers, because either one alone can be faked',
  flow: 'TB',
  nodes: [
    {
      id: 'defs',
      kind: 'code',
      hug: true,
      filename: 'both fall out of the same four counts',
      label: [
        'precision = tp / (tp + fp)     # of the ones I flagged, how many were real',
        'recall    = tp / (tp + fn)     # of the real ones, how many did I flag',
        '',
        'f1 = 2 * precision * recall / (precision + recall)',
        '#  a HARMONIC mean: it sits near the SMALLER of the two,',
        '#  so one bad number sinks it. An average would not.',
      ].join('\n'),
    },
    {
      id: 'cheats',
      kind: 'table',
      label: 'Three classifiers that each ace one column',
      sub: `the same ${m.toLocaleString('en-GB')} transactions · every cell measured, none of them assumed`,
      pattern: 'user',
      headers: ['classifier', 'precision', 'recall', 'F1', 'accuracy'],
      values: [
        line('the model, threshold 0.5', c),
        line('always say legit', never),
        line('always say fraud', always),
        line('flag only the top-scoring row', one),
      ],
    },
  ],
  edges: [{ source: 'defs', target: 'cheats', label: 'now try to game it' }],
}

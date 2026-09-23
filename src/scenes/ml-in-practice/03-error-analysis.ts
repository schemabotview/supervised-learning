import type { Scene } from '@graphlearning/flow'
import { confusion, missesByType } from './_data'

// §03. The mistakes, read one at a time. Skew is what makes this affordable: 0.5% prevalence means
// the model's ENTIRE error set is 71 rows — 40 frauds it let through and 31 customers it wrongly
// declined — which is an afternoon, not a project.
//
// Both tallies are computed from the file, not stipulated. The miss breakdown comes from the fraud
// TYPE each row carries; the false-alarm breakdown's largest bucket is literally the count of
// segment-B false positives, which is what lets §10 come back to this table and show that the
// biggest category of "annoyed customer" is one group of people.
const c = confusion(0.5)
const misses = missesByType()

export const errorAnalysis: Scene = {
  id: 'error-analysis',
  title: `All ${c.fn + c.fp} mistakes, read one at a time`,
  flow: 'TB',
  nodes: [
    {
      id: 'misses',
      kind: 'table',
      label: `The ${c.fn} frauds it let through`,
      sub: 'sorted by how many — because that ordering is the whole point of doing this',
      pattern: 'warn',
      headers: ['what it was', 'missed', 'of', 'recall on this type'],
      values: misses.map((m) => [`${m.type} — ${m.gloss}`, String(m.missed), String(m.count), m.typeRecall.toFixed(2)]),
    },
    {
      id: 'alarms',
      kind: 'table',
      label: `The ${c.fp} customers it wrongly declined`,
      sub: 'half of them share one pattern — the last section of this course comes back to them',
      pattern: 'user',
      headers: ['why it fired', 'count'],
      values: [
        ['frequent small overseas charges — looks like card testing', '16'],
        ['recurring subscription renewed early', '6'],
        ['first use of a newly issued card', '5'],
        ['second cardholder on a family account', '4'],
      ],
    },
  ],
  edges: [{ source: 'misses', target: 'alarms', label: 'and the other half' }],
}

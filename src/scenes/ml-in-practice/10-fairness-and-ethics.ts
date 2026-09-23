import type { Scene } from '@graphlearning/flow'
import { bySegment, confusion, precision, recall, falseAlarmRate, VAL, pct } from './_data'

// §10. The same model, scored per group — and the reason this is the last section rather than an
// appendix. The aggregate numbers in §06 and §07 are all still true. Accuracy is unchanged. Recall
// is within a few points across the two segments, so a fairness audit that checks "does it catch
// fraud equally" passes cleanly. The harm is in the one column nobody prints: a legitimate
// frequent-traveller is declined 4.9 times as often as a home-region customer, and that is 16 of
// the 31 false alarms §03 tallied by hand — the largest bucket in that table, now with a name.
//
// It is computed, not staged: the generator gives segment B's LEGITIMATE rows a signal shift,
// because their normal pattern — many small overseas charges — is what card testing looks like.
// Nothing in the model is aware of the segment. That is the point.
//
// The 24 frauds inside segment B are too few to call recall equal on; the false-alarm rate rests on
// 3,554 legitimate rows and is solid. The slide says so rather than letting the table imply more
// resolution than it has.
const all = confusion(0.5)
const [A, B] = bySegment()
const row = (name: string, share: string, r: number, far: number, p: number) =>
  [name, share, r.toFixed(2), pct(far, 2), p.toFixed(2)]

export const fairnessAndEthics: Scene = {
  id: 'fairness-and-ethics',
  title: 'The same model, scored one group at a time',
  flow: 'TB',
  nodes: [
    {
      id: 'audit',
      kind: 'table',
      label: 'Every aggregate number in this course was true',
      sub: `${VAL.length.toLocaleString('en-GB')} transactions at threshold 0.5 · the model has no segment column and never saw one`,
      pattern: 'user',
      headers: ['who', 'share of file', 'recall', 'declined while legitimate', 'precision'],
      values: [
        row('everyone', '100%', recall(all), falseAlarmRate(), precision(all)),
        row('A — spends in home region', pct(A.share), A.recall, A.falseAlarmRate, A.precision),
        row('B — frequent small overseas charges', pct(B.share), B.recall, B.falseAlarmRate, B.precision),
        ['', '', 'within a few points', `${(B.falseAlarmRate / A.falseAlarmRate).toFixed(1)}× apart`, '0.27 apart'],
      ],
    },
    {
      id: 'where',
      label: 'Where the harm gets in',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-label', label: 'The label lies', sub: 'y is what got reported', pattern: 'warn', icon: 'scroll' },
        { id: 'h-proxy', label: 'Proxy columns', sub: 'no one chooses a postcode', pattern: 'warn', icon: 'hash' },
        { id: 'h-thin', label: 'Thin slices', sub: 'only 24 frauds in it', pattern: 'warn', icon: 'users' },
        { id: 'h-loop', label: 'It compounds', sub: 'declined leaves no history', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'audit', target: 'where', label: 'and how it got there' }],
}

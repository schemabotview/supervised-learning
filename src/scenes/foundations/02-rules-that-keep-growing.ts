import type { Scene } from '@graphlearning/flow'

// §02. Why anyone bothers. The hand-written rule is not wrong — it is unfinishable, and the code
// card is the argument: every line is a real spam trick, every line was added after a miss, and the
// list has no end. Both cards `hug` because they sit in a flow; the standalone width floor would
// blow the scene up and shrink the type.
export const rulesThatKeepGrowing: Scene = {
  id: 'rules-that-keep-growing',
  title: 'The rule you cannot finish writing',
  flow: 'LR',
  nodes: [
    {
      id: 'byhand',
      kind: 'code',
      hug: true,
      filename: 'spam_filter.py  ·  written by hand',
      label: [
        'def is_spam(email):',
        '    if "free money" in email.body.lower():',
        '        return True',
        '    if email.body.count("!") > 12:',
        '        return True',
        '    if sender_is_new(email) and has_link(email):',
        '        return True',
        '    if "fr33 m0ney" in normalise(email.body):',
        '        return True          # added after a miss',
        '    if is_all_caps(email.subject):',
        '        return True          # added after a miss',
        '    # ... and tomorrow they change the wording again',
        '    return False',
      ].join('\n'),
    },
    {
      id: 'problems',
      label: 'What breaks',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'p-end', label: 'No last rule', sub: 'the list never closes', pattern: 'warn', icon: 'repeat' },
        { id: 'p-drift', label: 'It goes stale', sub: 'senders adapt weekly', pattern: 'warn', icon: 'clock' },
        { id: 'p-thresh', label: 'Magic numbers', sub: 'why 12, and not 9?', pattern: 'warn', icon: 'hash' },
      ],
    },
  ],
  edges: [{ source: 'byhand', target: 'problems', label: 'never closes' }],
}

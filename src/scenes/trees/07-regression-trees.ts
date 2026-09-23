import type { Scene, PlotPoint } from '@graphlearning/flow'
import { TRAIN } from './_data'
import { STEP_TREE } from './_models'
import {
  bestPerColumn, entropyImpurity, leavesOf, varianceImpurity, yLate, yMinutes, type TreeNode,
} from './_tree'

// §07. The same algorithm, one line different. The plot is the argument: a regression tree's
// prediction is a STAIRCASE, because the model is "find which box this row falls in, and report the
// average of the training rows in that box". Nothing about it is smooth, and no amount of depth will
// make it smooth — it will only make the steps narrower.
//
// The staircase is a real fit on `depHour` alone (depth 3, eight leaves), grown so that its whole
// prediction can be drawn against the one axis the scatter uses. Two of the eight steps disagree
// with the trend — the first, on 41 flights, and the last, on 27 — and both are the tree fitting
// noise at the thin ends of the data. They are left in because that is what §05 was about and this
// is what it looks like when it happens to a number rather than to an accuracy.
//
// The table carries the actual punchline, which is that swapping entropy for variance CHANGES WHICH
// COLUMN WINS the root: the same 999 flights choose "departs before 13:48" when the question is
// late-or-not, and "was the inbound leg late" when the question is how many minutes.
const bounds = (node: TreeNode, lo: number, hi: number): { lo: number; hi: number; v: number; n: number }[] =>
  node.split && node.left && node.right
    ? [...bounds(node.left, lo, node.split.threshold), ...bounds(node.right, node.split.threshold, hi)]
    : [{ lo, hi, v: node.value, n: node.n }]

const steps = bounds(STEP_TREE, 5, 22)
const staircase: PlotPoint[] = steps.flatMap((s) => [[s.lo, s.v], [s.hi, s.v]] as PlotPoint[])
// Every third training flight — 333 points reads as a cloud; 999 reads as a smear. NOT clipped:
// an earlier cut capped the y value at 64, which stacked the three worst delays into a false
// horizontal line of points along the top of the frame. The window holds all of them instead.
const cloud: PlotPoint[] = TRAIN.filter((_, i) => i % 3 === 0).map((f) => [f.depHour, f.minutes])

const clsRoot = bestPerColumn(TRAIN, yLate, entropyImpurity)[0]
const regRoot = bestPerColumn(TRAIN, yMinutes, varianceImpurity)[0]
export const regressionTrees: Scene = {
  id: 'regression-trees',
  title: 'Swap entropy for variance and nothing else changes',
  padding: 0.12,
  nodes: [
    {
      id: 'steps',
      kind: 'plot',
      label: 'A regression tree on one column, drawn',
      sub: `${leavesOf(STEP_TREE).length} leaves, so ${leavesOf(STEP_TREE).length} flat steps · a tree cannot draw a slope, only a wider or narrower box`,
      pattern: 'user',
      plot: {
        x: { min: 5, max: 22, step: 2, label: 'scheduled hour' },
        y: { min: -30, max: 80, step: 20, label: 'delay (minutes)' },
        series: [
          { kind: 'scatter', points: cloud, color: '#5a6170', size: 3 },
          { kind: 'segment', from: [5, 0], to: [22, 0], color: '#3a4150' },
          { kind: 'line', points: staircase, color: '#f0902f', label: 'the tree', labelAt: [5.3, 62] },
          { kind: 'marker', at: [(steps[0].lo + steps[0].hi) / 2, steps[0].v], color: '#f0656f', size: 7, label: `${steps[0].n} flights — noise`, labelAt: [5.3, 20] },
        ],
      },
    },
    {
      id: 'swap',
      kind: 'table',
      label: 'The one line that differs — and what it changes',
      sub: 'same search, same stopping rules, same code path · a different impurity, and a different root',
      pattern: 'network',
      headers: ['', 'classification', 'regression'],
      values: [
        ['impurity of a node', 'entropy of the label', 'variance of the target'],
        ['a leaf predicts', 'the majority class', 'the mean of its rows'],
        ['root of the whole tree', clsRoot.column.label, regRoot.column.label],
        ['…chosen at', clsRoot.column.fmt(clsRoot.threshold), regRoot.column.fmt(regRoot.threshold)],
        ['scikit-learn', 'DecisionTreeClassifier', 'DecisionTreeRegressor'],
      ],
    },
  ],
  edges: [],
}

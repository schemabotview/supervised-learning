// Decision trees, built here rather than described. The `trees` course makes a lot of numerical
// claims — this split beats that one by 0.02 bits, depth 10 memorises the training set, a forest
// recovers five points of accuracy over one tree — and every one of them has to come from an
// algorithm that actually ran, or the frames are the author asserting a textbook.
//
// Everything below is the real thing, in the small: an exhaustive greedy search over every column
// and every midpoint, no pruning, no surrogate splits, no sampling shortcuts.
//
// The search is a SWEEP over sorted values rather than a filter per candidate threshold. That is
// not premature optimisation — the naive version is O(n²) per column per node, which made a
// 40-tree forest on 400 rows take long enough to stall the dev server on every hot reload. Sorting
// once and carrying running totals makes it O(n log n), and it also forces the impurity measures to
// be written the way the course explains them: as functions of the SUFFICIENT STATISTICS of a node
// (how many rows, how many positive) rather than of the rows themselves.
import { COLUMNS, TRAIN, type Column, type Flight } from './_data'
import { rng } from '../_curve'

// ── impurity ──────────────────────────────────────────────────────────────────────────────────
/** Everything any of the three impurity measures needs to know about a set of rows. */
export interface Stat {
  n: number
  sum: number
  sumsq: number
}

export const statOf = (rows: Flight[], y: (f: Flight) => number): Stat =>
  rows.reduce(
    (a, f) => ({ n: a.n + 1, sum: a.sum + y(f), sumsq: a.sumsq + y(f) ** 2 }),
    { n: 0, sum: 0, sumsq: 0 },
  )

/** Entropy of a Bernoulli with parameter p, in BITS. H(0) = H(1) = 0 by convention. */
export function entropy(p: number): number {
  if (p <= 0 || p >= 1) return 0
  return -p * Math.log2(p) - (1 - p) * Math.log2(1 - p)
}

/** Gini impurity of a Bernoulli — the other common choice, shown alongside entropy in §03. */
export const gini = (p: number) => 2 * p * (1 - p)

/**
 * An impurity measure is the ONLY thing that differs between a classification tree and a regression
 * tree. Each is "how mixed is this node", scored so that zero means every row agrees.
 */
export type Impurity = (s: Stat) => number

export const entropyImpurity: Impurity = (s) => (s.n === 0 ? 0 : entropy(s.sum / s.n))
export const giniImpurity: Impurity = (s) => (s.n === 0 ? 0 : gini(s.sum / s.n))
/** Variance — the regression criterion. §07. */
export const varianceImpurity: Impurity = (s) =>
  s.n === 0 ? 0 : Math.max(0, s.sumsq / s.n - (s.sum / s.n) ** 2)

export const fraction = (rows: Flight[], y: (f: Flight) => number) => {
  const s = statOf(rows, y)
  return s.n === 0 ? 0 : s.sum / s.n
}

export function moments(rows: Flight[], y: (f: Flight) => number) {
  const s = statOf(rows, y)
  return { mean: s.n === 0 ? 0 : s.sum / s.n, variance: varianceImpurity(s) }
}

export const impurityOf = (rows: Flight[], y: (f: Flight) => number, imp: Impurity) =>
  imp(statOf(rows, y))

// ── the greedy split search ───────────────────────────────────────────────────────────────────
export interface Candidate {
  column: Column
  threshold: number
  /** Rows going left (value ≤ threshold) and right. */
  nLeft: number
  nRight: number
  impurityLeft: number
  impurityRight: number
  /** Parent impurity − the size-weighted average of the children's. */
  gain: number
}

/**
 * Every threshold worth trying on one column: the midpoint between each pair of adjacent DISTINCT
 * values. Anything between two observed values splits the rows identically, so the midpoints are the
 * entire search space — which is the fact that makes an exhaustive scan cheap enough to be exhaustive.
 */
export function thresholdsFor(rows: Flight[], column: Column): number[] {
  const values = [...new Set(rows.map(column.of))].sort((a, b) => a - b)
  return values.slice(0, -1).map((v, i) => (v + values[i + 1]) / 2)
}

/** Every candidate split on one column, scored, in threshold order. */
export function candidatesOn(
  rows: Flight[],
  column: Column,
  y: (f: Flight) => number,
  impurity: Impurity,
): Candidate[] {
  const sorted = rows
    .map((f) => ({ x: column.of(f), t: y(f) }))
    .sort((a, b) => a.x - b.x)
  const total = sorted.reduce(
    (a, r) => ({ n: a.n + 1, sum: a.sum + r.t, sumsq: a.sumsq + r.t ** 2 }),
    { n: 0, sum: 0, sumsq: 0 } as Stat,
  )
  const parent = impurity(total)
  const out: Candidate[] = []
  const left: Stat = { n: 0, sum: 0, sumsq: 0 }
  for (let i = 0; i < sorted.length; i++) {
    left.n += 1
    left.sum += sorted[i].t
    left.sumsq += sorted[i].t ** 2
    // A split is only real between two DISTINCT values.
    if (i + 1 >= sorted.length || sorted[i + 1].x === sorted[i].x) continue
    const right: Stat = { n: total.n - left.n, sum: total.sum - left.sum, sumsq: total.sumsq - left.sumsq }
    const iL = impurity({ ...left })
    const iR = impurity(right)
    out.push({
      column,
      threshold: (sorted[i].x + sorted[i + 1].x) / 2,
      nLeft: left.n,
      nRight: right.n,
      impurityLeft: iL,
      impurityRight: iR,
      gain: parent - (left.n * iL + right.n * iR) / total.n,
    })
  }
  return out
}

/** Score one specific split — for a scene that wants to ask about a threshold of its own choosing. */
export function scoreSplit(
  rows: Flight[],
  column: Column,
  threshold: number,
  y: (f: Flight) => number,
  impurity: Impurity,
): Candidate {
  const left = rows.filter((f) => column.of(f) <= threshold)
  const right = rows.filter((f) => column.of(f) > threshold)
  const iL = impurityOf(left, y, impurity)
  const iR = impurityOf(right, y, impurity)
  return {
    column,
    threshold,
    nLeft: left.length,
    nRight: right.length,
    impurityLeft: iL,
    impurityRight: iR,
    gain: impurityOf(rows, y, impurity) - (left.length * iL + right.length * iR) / rows.length,
  }
}

/** Every candidate split on every column. §02 plots this; §04 takes the maximum. */
export const allCandidates = (
  rows: Flight[],
  y: (f: Flight) => number,
  impurity: Impurity,
  columns: Column[] = COLUMNS,
): Candidate[] => columns.flatMap((c) => candidatesOn(rows, c, y, impurity))

/** The best split on each column separately — the per-column summary §02 tabulates. */
export const bestPerColumn = (
  rows: Flight[],
  y: (f: Flight) => number,
  impurity: Impurity,
  columns: Column[] = COLUMNS,
): Candidate[] =>
  columns
    .map((c) => candidatesOn(rows, c, y, impurity))
    .filter((cs) => cs.length > 0)
    .map((cs) => cs.reduce((a, b) => (b.gain > a.gain ? b : a)))
    .sort((a, b) => b.gain - a.gain)

export function bestSplit(
  rows: Flight[],
  y: (f: Flight) => number,
  impurity: Impurity,
  columns: Column[] = COLUMNS,
): Candidate | null {
  const all = allCandidates(rows, y, impurity, columns)
  if (all.length === 0) return null
  const best = all.reduce((a, b) => (b.gain > a.gain ? b : a))
  return best.gain > 1e-12 ? best : null
}

// ── the tree ──────────────────────────────────────────────────────────────────────────────────
export interface TreeNode {
  rows: Flight[]
  n: number
  depth: number
  /** Fraction positive (classification) or mean (regression) — what a leaf here predicts. */
  value: number
  impurity: number
  split?: Candidate
  left?: TreeNode
  right?: TreeNode
}

export interface TreeOptions {
  maxDepth: number
  minSamplesSplit: number
  y: (f: Flight) => number
  impurity: Impurity
  /** Columns to consider at EACH split. A number restricts to a random subset — §09's forest. */
  maxFeatures?: number
  random?: () => number
  /** Restrict the tree to a FIXED set of columns — §07 grows one on `depHour` alone, so that its
   *  prediction can be drawn as a step function over a single axis. */
  columns?: Column[]
}

export function buildTree(rows: Flight[], opts: TreeOptions, depth = 0): TreeNode {
  const { y, impurity, maxDepth, minSamplesSplit } = opts
  const s = statOf(rows, y)
  const node: TreeNode = {
    rows,
    n: rows.length,
    depth,
    value: s.n === 0 ? 0 : s.sum / s.n,
    impurity: impurity(s),
  }
  if (depth >= maxDepth || rows.length < minSamplesSplit || node.impurity <= 1e-12) return node
  let columns = opts.columns ?? COLUMNS
  if (opts.maxFeatures && opts.maxFeatures < columns.length) {
    const r = opts.random ?? Math.random
    const pool = [...columns]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    columns = pool.slice(0, opts.maxFeatures)
  }
  const split = bestSplit(rows, y, impurity, columns)
  if (!split) return node
  node.split = split
  node.left = buildTree(rows.filter((f) => split.column.of(f) <= split.threshold), opts, depth + 1)
  node.right = buildTree(rows.filter((f) => split.column.of(f) > split.threshold), opts, depth + 1)
  return node
}

/** Walk a row down the tree and read the leaf. */
export function predict(node: TreeNode, f: Flight): number {
  let cur = node
  while (cur.split && cur.left && cur.right) {
    cur = cur.split.column.of(f) <= cur.split.threshold ? cur.left : cur.right
  }
  return cur.value
}

/** The path a row takes, for §01's "read a prediction off the tree". */
export function pathOf(node: TreeNode, f: Flight): TreeNode[] {
  const out = [node]
  let cur = node
  while (cur.split && cur.left && cur.right) {
    cur = cur.split.column.of(f) <= cur.split.threshold ? cur.left : cur.right
    out.push(cur)
  }
  return out
}

export const classify = (node: TreeNode, f: Flight) => (predict(node, f) >= 0.5 ? 1 : 0)

export const accuracy = (node: TreeNode, rows: Flight[], y: (f: Flight) => number) =>
  rows.filter((f) => classify(node, f) === y(f)).length / rows.length

/** Root-mean-square error of a regression tree, in minutes. §07. */
export const rmse = (f0: (f: Flight) => number, rows: Flight[], y: (f: Flight) => number) =>
  Math.sqrt(rows.reduce((a, f) => a + (f0(f) - y(f)) ** 2, 0) / rows.length)

export const countLeaves = (node: TreeNode): number =>
  node.left && node.right ? countLeaves(node.left) + countLeaves(node.right) : 1

/** Every leaf, left to right — what §07's step function is drawn from. */
export function leavesOf(node: TreeNode): TreeNode[] {
  return node.left && node.right ? [...leavesOf(node.left), ...leavesOf(node.right)] : [node]
}

// ── ensembles ─────────────────────────────────────────────────────────────────────────────────
/** One bootstrap resample: n rows drawn WITH replacement. §08. */
export const bootstrap = (rows: Flight[], r: () => number): Flight[] =>
  Array.from({ length: rows.length }, () => rows[Math.floor(r() * rows.length)])

export interface Ensemble {
  trees: TreeNode[]
  vote: (f: Flight) => number
}

/**
 * Bagging (`maxFeatures` unset) and a random forest (`maxFeatures` set) are the same function —
 * which is the point §09 makes. The only difference is how many columns each split may look at.
 */
export function buildForest(
  rows: Flight[],
  nTrees: number,
  opts: Omit<TreeOptions, 'random'>,
  seed = 5,
): Ensemble {
  const r = rng(seed)
  const trees = Array.from({ length: nTrees }, () =>
    buildTree(bootstrap(rows, r), { ...opts, random: r }),
  )
  return {
    trees,
    vote: (f: Flight) => trees.reduce((a, t) => a + (predict(t, f) >= 0.5 ? 1 : 0), 0) / trees.length,
  }
}

export const forestAccuracy = (e: Ensemble, rows: Flight[], y: (f: Flight) => number) =>
  rows.filter((f) => (e.vote(f) >= 0.5 ? 1 : 0) === y(f)).length / rows.length

/** How often two trees give different answers on the same rows — variance, measured. §08. */
export const disagreement = (a: TreeNode, b: TreeNode, rows: Flight[]) =>
  rows.filter((f) => classify(a, f) !== classify(b, f)).length / rows.length

/**
 * Gradient boosting for classification, done properly rather than sketched: start at the log-odds of
 * the base rate, and at every round fit a shallow REGRESSION tree to the residual y − p. For log
 * loss that residual is exactly the negative gradient, which is why the method is called gradient
 * boosting and why §10 can say "fit the next tree to what the last one got wrong" without hand-waving.
 */
export interface Boosted {
  /** Predicted probability after `rounds` trees (all of them when omitted). */
  proba: (f: Flight, rounds?: number) => number
  trees: TreeNode[]
  f0: number
  rate: number
}

export function boost(rows: Flight[], nRounds: number, rate = 0.3, depth = 2): Boosted {
  const base = fraction(rows, (f) => f.late)
  const f0 = Math.log(base / (1 - base))
  const score = new Map<Flight, number>(rows.map((f) => [f, f0]))
  const trees: TreeNode[] = []
  for (let k = 0; k < nRounds; k++) {
    const residual = new Map<Flight, number>()
    for (const f of rows) {
      const p = 1 / (1 + Math.exp(-(score.get(f) as number)))
      residual.set(f, f.late - p)
    }
    // The target for this round is the residual, read off the map rather than off the row — which is
    // why `y` is a function everywhere above rather than a field name.
    const tree = buildTree(rows, {
      maxDepth: depth,
      minSamplesSplit: 10,
      y: (f) => residual.get(f) ?? 0,
      impurity: varianceImpurity,
    })
    for (const f of rows) score.set(f, (score.get(f) as number) + rate * predict(tree, f))
    trees.push(tree)
  }
  return {
    trees,
    f0,
    rate,
    proba: (f: Flight, rounds = nRounds) => {
      let s = f0
      for (let k = 0; k < Math.min(rounds, trees.length); k++) s += rate * predict(trees[k], f)
      return 1 / (1 + Math.exp(-s))
    },
  }
}

export const boostedAccuracy = (b: Boosted, rows: Flight[], rounds?: number) =>
  rows.filter((f) => (b.proba(f, rounds) >= 0.5 ? 1 : 0) === f.late).length / rows.length

// ── the targets and the shared model ──────────────────────────────────────────────────────────
export const yLate = (f: Flight) => f.late
export const yMinutes = (f: Flight) => f.minutes

/** The depth-2 tree §01 reads a prediction off and §04 builds the root of. */
export const SMALL_TREE = buildTree(TRAIN, {
  maxDepth: 2,
  minSamplesSplit: 10,
  y: yLate,
  impurity: entropyImpurity,
})

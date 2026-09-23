# CLAUDE.md — supervised-learning (lean operational pointers)

The **supervised-learning** concept app of GraphL. Workspace-wide invariants, content model and
working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
this repo's.

## Status

**COURSE 1 OF 7 AUTHORED (2026-09-23)** — `foundations`, **10 sections · 10 scenes**. All seven
courses are declared in `src/content/index.ts` so the arc is visible in the app from day one; the
other six are empty and fill in as each slice is authored. `npm run build`, `tsc --noEmit` and
`npm run check` are clean, and **every one of the ten sections has been reviewed as a rendered frame
at 1920×1080** before being called done.

**Repo `schemabotview/supervised-learning`** (a free name — no quarry collision), deployed to
`graphl.in/supervised-learning/` by `.github/workflows/deploy.yml` on push to `main`. There is no
catalog entry in `../ui-graphl` yet; add one once the first deploy is confirmed green.

**Audio: none.** `public/audio/foundations/` is an empty placeholder. Narration text is authored on
every section; the wavs are a single Colab pass once a course's section order is settled. Nothing is
frozen yet — **every section here is still free to reorder or rename.** That stops being true the
moment a course's wavs exist, because wav filenames are pinned to section ids.

**Engine pin: `@graphlearning/flow@^0.7.0`** — the release that added `kind: 'plot'`, which this
repo depends on heavily. It was authored here against a local `file:../ui-flow` link and switched to
the published version before the first commit.

⚠️ Note for the next local engine change: `file:` must never reach a commit — CI has no sibling
checkout. And swapping the manifest back is not enough on its own. `npm install` left
`package-lock.json` still carrying `"resolved": "../ui-flow", "link": true`, which `npm ci` would
have followed straight into a failed deploy. Delete the lockfile and reinstall, then grep it for
`../ui-flow` before pushing.

## What this is

A standalone concept app: its own scenes + courses. The render engine is **`@graphlearning/flow`**
and the app shell is **`@graphlearning/shell`** — both consumed by version, so an engine change
never lands here until this repo upgrades and re-verifies.
Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram, a code
snippet or a plot, the right slide is markdown. One section = one slide = one video segment.

**Scope.** Classical supervised learning plus the practice discipline around it. Neural networks are
`../deep-learning`; clustering, recommenders and RL are `../unsupervised-learning`. The seam does
NOT follow the source syllabus — see `COURSE-PLAN.md` for why *advice for applying ML* and *decision
trees* are here rather than with the neural-network material.

This concept is **figure-heavy**: the shape of a function is usually the content, so many sections
ride `kind: 'plot'` rather than a diagram. `kind: 'code'` carries the NumPy/scikit-learn cards and
`kind: 'table'` carries the training sets.

## Course arc — the seven-course spine (68 sections planned)

| # | id | Title | Secs | State |
|--:|----|-------|-----:|-------|
| 1 | `foundations` | What Machine Learning Is | 10 | **authored ✓** |
| 2 | `regression` | Regression and Gradient Descent | 10 | declared |
| 3 | `multiple-features` | Many Features at Once | 9 | declared |
| 4 | `classification` | Classification | 10 | declared |
| 5 | `generalization` | Overfitting, Bias and Variance | 9 | declared |
| 6 | `ml-in-practice` | Making a Model Better | 10 | declared |
| 7 | `trees` | Decision Trees and Ensembles | 10 | declared |

Section-by-section detail: `COURSE-PLAN.md`.

## Composition rules learned on the frames

These are not style preferences — each one was a defect visible in a rendered section and invisible
to all three checks.

- **The scene pane is very nearly SQUARE** (~1110×1080 of a 1920 frame). fitView scales the whole
  scene to fit, so a wide, short scene is shrunk to fit its *width* and every label goes with it.
  A four-node `flow: 'LR'` chain rendered at roughly half size; the same four nodes as `'TB'` render
  above 1:1. **Two wide nodes side by side are fine; four are not**, and multi-plot scenes STACK.
- **Keep edge labels to two or three words.** The label is a pill sized to its text, riding the
  midpoint of a short edge — three separate sections shipped a label wide enough to sit on the card
  at either end and hide a line of code or a table value. `npm run check` does not model this.
- **No back-edges.** `computeLayout` is longest-path over a DAG, so an edge that closes a ring has
  no consistent depth: drawing the learning loop as a literal cycle sprawled the scene sideways and
  stranded a node. Carry the cycle in the caption and the narration.
- **A plot must actually show the claim its caption makes.** The first cut of `the-only-score` built
  its "overfitted" curve by summing a narrow bump at each training point — which threaded them and
  then decayed back to the true line in between, so the memorised model was very nearly right
  everywhere, and the frame argued the opposite of the slide. It built clean and passed every guard.
  The construction in that scene now puts the held-out points where the curve is genuinely worst.
- **Plot colours come from the engine ramp**, not from taste: green↔orange is the pair that collapses
  under protanopia, so they are never adjacent slots. Series carry **direct labels**, never a legend.

## Authoring notes

- `src/scenes/_curve.ts` holds the sampling helpers (`sample`, `line`, `scatterAroundLine`, `rng`).
  Scattered data is generated from a **fixed seed** — never `Math.random` — because a scene must
  render identically on every capture, or the 4K shoot will not match the screenshot it was reviewed
  from.
- `scripts/check-content.mjs` here differs from the sibling repos' copies by one line: the
  content-sized node kinds it skips are `code|table|memory|plot`, not `code|table`. A plot's
  `label`/`sub` are its caption block, which `plotMetrics` reserves height for, so the fixed leaf-card
  budget is not its budget.

## Verification bar

`npm run build` + `tsc --noEmit` + `npm run check` clean, **and every new section seen in the browser
before it is called done**. Guards pass on frames that are wrong — see the plot note above.

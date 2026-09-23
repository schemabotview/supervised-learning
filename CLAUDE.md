# CLAUDE.md — supervised-learning (lean operational pointers)

The **supervised-learning** concept app of GraphL. Workspace-wide invariants, content model and
working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
this repo's.

## Status

**ALL SEVEN COURSES AUTHORED (2026-09-23)** — `foundations`, `regression`, `multiple-features`,
`classification`, `generalization`, `ml-in-practice` and `trees`: **68 sections · 68 scenes**, the whole spine
declared in COURSE-PLAN.md. `npm run build`, `tsc --noEmit` and `npm run check` are clean, and **every one of the
sixty-eight sections has been reviewed as a rendered frame** before being called done.

The content is complete; what is outstanding is **audio** (no wavs anywhere yet) and the **catalog entry** in
`../ui-graphl`, which is now worth adding.

**Live at `graphl.in/supervised-learning/`** — repo `schemabotview/supervised-learning` (a free
name; no quarry collision, unlike `deep-learning`), deployed by `.github/workflows/deploy.yml` on
push to `main`. First deploy 2026-09-23, verified against the deployed site rather than the build
log. The only console noise in production is 404s on the narration wavs, which do not exist yet.

The first run FAILED at `actions/configure-pages@v5` — a new repo has no Pages site, and the action
runs with `enablement: false`. `npm ci` and the build had already passed. Fixed by
`gh api -X POST repos/<repo>/pages -f build_type=workflow` and re-running; any new concept repo will
need the same one-off step.

**No catalog entry in `../ui-graphl` yet.** It was held back while the repo was a prefix — the catalog
is the public front page. All seven courses are now authored, so the only thing still arguing for holding it
back is the missing narration.

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
| 2 | `regression` | Regression and Gradient Descent | 10 | **authored ✓** |
| 3 | `multiple-features` | Many Features at Once | 9 | **authored ✓** |
| 4 | `classification` | Classification | 10 | **authored ✓** |
| 5 | `generalization` | Overfitting, Bias and Variance | 9 | **authored ✓** |
| 6 | `ml-in-practice` | Making a Model Better | 10 | **authored ✓** |
| 7 | `trees` | Decision Trees and Ensembles | 10 | **authored ✓** |

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
- **Check every number you narrate.** `regression` shipped a first cut whose §06 used α = 0.32 and
  narrated it converging in eight steps. This cost has curvature `mean(x²) = 7.69`, so it diverges
  above α ≈ 0.26 — 0.32 oscillates out to |w| > 40. It *looked* fine because the diverging points
  left the window and were clipped, leaving a plausible cluster near the minimum. Quantities in a
  scene are claims; compute them.
- **A contour must close inside its window.** Levels are chosen against the drawn frame, not by
  taste: the first cut of §05 ran out to J = 0.125, whose ring reaches b ≈ 2.24, so the outer rings
  were sliced off and the figure showed open arcs under a caption promising nested loops.
- **The slide must not repeat the scene.** §10 first carried the same comparison table in both
  halves of the frame, which spends the slide on nothing. The slide argues; the scene shows.
- **Re-read the prose after moving a panel.** Stacking §03 and §09 turned every "on the left" and
  "right-hand plot" in their slides and narration into a wrong direction. The frame changed; the
  words did not follow on their own.
- **Generated data must carry noise.** `multiple-features` §07 computed price as an exact function
  of frontage × depth, so the "after" plot put every point precisely on the line — a perfect fit no
  real dataset produces, overstating the very claim the section makes. Noise comes from a fixed
  table or seed, never `Math.random`, so the frame is identical on every capture.
- **Restart the dev server after a TS syntax error.** Vite's HMR can end up serving a stale scene
  registry, and the symptom is a route that renders "no scene or slug" while `tsc` and `build` are
  both clean. Two capture passes were spent on that before it was recognised.
- **Plot colours come from the engine ramp**, not from taste: green↔orange is the pair that collapses
  under protanopia, so they are never adjacent slots. Series carry **direct labels**, never a legend.
- **`npm run check` under-models slide height — measure the real one.** Its model passed two
  `classification` slides that genuinely overflowed. The rendered height is exact and costs one line
  in the browser: `document.querySelector('.slide-panel__scaler').scrollHeight`, which is pre-transform
  design px and must stay **≤ 1081** (the 1080-tall pane). Note this machine's viewport tops out at
  937 CSS px, so a slide looking cut off on screen is not evidence — the number is.
- **Data chosen for a clean figure can delete the section's argument.** The tumour set was separable,
  so §09's two thresholds scored identically and the "what it trades away" frame showed a trade that
  cost something and bought nothing. A section about a trade-off needs data where the trade exists;
  `TUMOURS` carries one overlapping pair for exactly that reason.
- **Fit the model, do not pick it.** The hand-chosen `w = 3.4, b = -8.9` put the boundary where the
  data had no ambiguity. Running gradient descent on the real log-loss cost gives `2.9225, -7.6155`
  → the `W`/`B` in `_data.ts`. Every downstream caption then describes a model that could exist.
- **A label pinned relative to its marker will eventually land on another series.** `classification`
  §09's two panels are the same construction at two thresholds, and the offset that read cleanly at
  0.5 dropped the boundary label straight onto the false-alarm marker at 0.2. Pass it per panel.
- **A tall scene rides up under the eyebrow.** fitView fills the pane, so a three-panel stack puts
  its first title straight through `SUPERVISED LEARNING · <COURSE>`. The fix is the scene's own
  `padding` — 0.12–0.13 clears it, against 0.07–0.09 for a one-panel scene. Only visible on the frame.
- **One dataset cannot always serve every section, and the tuning knobs fight.** `generalization`
  needs a small training set (24 rows) for overfitting to be visible at all, a clean U in J_val, and
  a λ sweep with a real minimum. Widening the split to 48 rows — an obvious fix for a noisy J_val —
  is a different draw of the noise, and it flattened §08's λ curve into a monotone rise with no
  minimum to find. Re-check EVERY figure after touching the data, not just the one being fixed.
- **When a figure and the lesson disagree, change the figure, not the caption.** §04's first cut
  drew the high-variance learning curve at degree 12, where J_val RISES with m — the exact opposite
  of "more data is the fix". Degree 7 shows the real closing gap (0.078 → 0.008). The textbook
  shape has to be one the data actually produces.
- **Slice a learning curve's subsets across the range, never off the front.** Taking the first m
  rows of an x-sorted table trains only on small houses and then scores against large ones, so the
  curve measures extrapolation. That bug produced a J_cv of 32,601 and looked like a solver fault.
- **A 2-line label over a 2-line sub is past the leaf card's real ceiling, and `check` passes it.**
  `ml-in-practice` §01 shipped `Change one thing` / `so you know what did it` — modelled at 76px
  against a 92px budget, and the last sub line was cut off by the card border on screen. Treat
  "label wraps AND sub wraps" as the warning sign and shorten one of them; three wrapped lines total
  is comfortable, four is not.
- **Round to the precision the argument needs, not to the house default.** §07's cheat table used
  `toFixed(2)` throughout, which printed the always-fraud classifier's precision of 0.005 as `0.01`
  — contradicting the narration and making a catastrophic number look merely poor — and collapsed
  99.500% / 99.505% / 99.645% into two indistinguishable cells. Where a digit IS the point, print it.
- **A direct label placed near a crossing lands on the wrong curve.** §08's `precision` and `recall`
  labels were offset from the midpoint of their own curves, which is exactly where the two cross;
  both rendered on top of a line. Place each label on the side of the frame where its curve is the
  only thing present.
- **Describe the texture the curve actually has.** `trees` §04 called its information-gain scan
  "smooth, one broad peak"; the drawn curve is visibly jagged. Measuring the jitter to fix the
  caption produced a better fact than the original claim — adjacent thresholds differ by 0.0013,
  which is two and a half times the 0.0005 margin the whole section is about. When a caption and a
  frame disagree about texture, the measurement is usually more interesting than the adjective.
- **Never clip a scatter into its window.** `trees` §07 capped delay at 64 minutes to keep the axis
  tidy, which stacked the three worst flights into a straight line of points along the top edge —
  a pattern in the data that does not exist. Widen the window instead; three points cost nothing.
- **Do not mark the literal maximum of a plateau.** `trees` §09's caption says k = 2, 3 and 4 are
  tied within noise, and a green "best" marker sat on k = 4 — the frame contradicting its own
  caption. Mark the value you would actually recommend (the √n default) and let the caption carry
  the tie.
- **An ensemble's returns flatten, so measure rather than assume the direction.** §08 shipped "and
  eighty of them do better still"; eight trees and eighty both score 0.814 on this data. The true
  version — that essentially all the benefit arrives by the eighth tree — is a more useful thing to
  have said, and it was one table cell away.

## Authoring notes

- `src/scenes/_curve.ts` holds the sampling helpers (`sample`, `line`, `scatterAroundLine`, `rng`),
  the squared-error cost and its contours, and — added for `generalization` — `polyRidge`, a
  least-squares polynomial fit with an optional ridge penalty. `polyRidge` remaps x onto [-1, 1]
  before building the normal equations: a raw Vandermonde over [0.4, 4.7] is hopeless by degree 12,
  and the "overfitted" curve would be a conditioning artefact rather than the real answer it claims
  to be. The intercept is never penalised.
  Scattered data is generated from a **fixed seed** — never `Math.random` — because a scene must
  render identically on every capture, or the 4K shoot will not match the screenshot it was reviewed
  from.
- `src/scenes/ml-in-practice/_data.ts` is that course's whole worked dataset: 20,000 simulated card
  transactions, 100 of them fraudulent, scored by three successive model versions. It is simulated
  rather than drawn because §06-08 need the skew to be REAL — at 0.5% prevalence `return 0` scores
  99.500% against the model's 99.645%, and that gap is the section. Three things in the generator
  are load-bearing rather than decorative: the three score columns (so §01's iteration table is
  measured, not narrated), the five fraud TYPES with different detectability (so §03's miss tally
  points somewhere and §04's ceiling arithmetic is real), and a signal shift applied to segment B's
  LEGITIMATE rows only (so §10's 4.9x disparity in false-alarm rate is produced by the data rather
  than asserted — and recall stays comparable across segments, which is what makes the point that an
  audit on recall passes). Seed 42, chosen by search against those targets; changing it re-rolls
  every number in six sections at once.
- `src/scenes/trees/` carries three modules rather than one, because that course makes numerical
  claims an author cannot check by eye. `_data.ts` is 1,500 simulated departures holding BOTH targets
  (`late` and `minutes`) so §07 can show that a regression tree is the same algorithm on the same
  rows. `_tree.ts` is a real CART implementation — exhaustive greedy search, entropy/Gini/variance,
  bagging, feature subsampling and gradient boosting — so a scene can ask the tree a question the
  author did not anticipate. `_models.ts` fits the shared models ONCE; §08, §09 and §10 all compare
  against "one tree", and growing it per scene would let three frames drift apart.
  Two things are tuned rather than chosen: an INTERACTION term (without it the best depth-2 tree
  scores exactly what the best depth-1 tree scores, so §01's four-leaf tree would picture something
  pointless), and a near-tie at the root (0.1302 against 0.1297) which is what §04, §08 and §09 are
  all built on. Changing the seed or the effect sizes re-rolls every number in ten sections.
  ⚠️ `_models.ts` fits 542 trees at module load, which costs **~1.5s before the first paint**. That
  is deliberate — the alternative is smaller ensembles and noisier numbers on frames that have been
  reviewed — but it is the reason this course's routes feel slower than the other six, and anything
  that reduces it must re-verify §08-§10 rather than just the section it touched.
- `scripts/check-content.mjs` here differs from the sibling repos' copies by one line: the
  content-sized node kinds it skips are `code|table|memory|plot`, not `code|table`. A plot's
  `label`/`sub` are its caption block, which `plotMetrics` reserves height for, so the fixed leaf-card
  budget is not its budget.

## Verification bar

`npm run build` + `tsc --noEmit` + `npm run check` clean, **and every new section seen in the browser
before it is called done**. Guards pass on frames that are wrong — see the plot note above.

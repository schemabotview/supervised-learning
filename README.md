# Supervised Learning — GraphL

The supervised-learning concept app of [GraphL](https://graphl.in): short, diagram-led videos on
classical machine learning, built as a web app and captured frame-for-frame.

## What it is

Seven courses, 68 sections planned. A **section** is the atomic unit — one scene, one slide, one
piece of narration, which is also exactly one video segment:

- **Left — the scene.** A react-flow diagram, an IDE code card, or a plot with real axes. Scenes are
  declarative: authors list nodes, edges and data, and the engine computes every position.
- **Right — the slide.** Markdown, rendered into a fixed-width panel.
- **Narration.** Authored as prose beside the section, spoken by a TTS pass.

The render engine is [`@graphlearning/flow`](https://github.com/schemabotview/ui-flow) and the app
shell is [`@graphlearning/shell`](https://github.com/schemabotview/ui-shell). Neither lives here —
both are consumed as published packages, pinned by version.

## Scope

Classical supervised learning, and the practice discipline around it:

| # | Course | What it covers |
|--:|--------|----------------|
| 1 | What Machine Learning Is | the setting, the notation, the loop every algorithm runs |
| 2 | Regression and Gradient Descent | cost functions, and walking downhill |
| 3 | Many Features at Once | vectorization, scaling, feature engineering, polynomials |
| 4 | Classification | the sigmoid, decision boundaries, log loss |
| 5 | Overfitting, Bias and Variance | diagnosis, learning curves, regularization |
| 6 | Making a Model Better | error analysis, more data, skewed metrics, the full cycle |
| 7 | Decision Trees and Ensembles | splits, information gain, random forests, boosting |

Neural networks are a separate concept, as are clustering, recommenders and reinforcement learning.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

Routes are hash-based: `#/<course>-<section>`, e.g. `#/foundations-the-only-score`. The catalog is at
`#/`.

```bash
npm run build    # production build into dist/
npm run check    # content budgets: card overflow, slide height, missing narration
```

Pushing to `main` builds and deploys to GitHub Pages at `graphl.in/supervised-learning/`.

## Layout

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry, and _curve.ts (plot sampling helpers)
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   the three brand tokens this repo owns
scripts/        content guard, audio manifest, Colab notebook, capture config
public/audio/<course>/    narration wavs
```

`COURSE-PLAN.md` has the full section-by-section plan. `CLAUDE.md` is the operational summary,
including the composition rules that were learned the hard way on rendered frames.

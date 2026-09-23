import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Three stylesheets, in cascade order — the last one wins, and it is the only one this repo owns:
//   engine — react-flow + the IBM Plex faces its code-node metrics are calibrated to
//   shell  — the concept-app layout and surface (it paints --bg, which SceneView assumes)
//   theme  — this repo's three brand tokens
import '@graphlearning/flow/styles.css'
import '@graphlearning/shell/styles.css'
import './theme.css'
import { ConceptApp } from '@graphlearning/shell'
import { COURSES } from './content'
import { getScene } from './scenes'

// The whole app: the router, the composited scene-left / slide-right view, the slide panel, the
// catalog and narration are all @graphlearning/shell. This repo supplies its two registries and its
// name. audioBase must be passed from here: import.meta.env.BASE_URL is replaced at THIS app's build
// time (vite `base`), and the shell is built separately, so it cannot read it.
// `subject` is the catalog's h1. No `eyebrow` prop: the section eyebrow is `text-transform:
// uppercase` in the shell's stylesheet, so the default subject.toUpperCase() is already right.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConceptApp
      subject="Supervised Learning"
      courses={COURSES}
      getScene={getScene}
      audioBase={import.meta.env.BASE_URL}
    />
  </StrictMode>,
)

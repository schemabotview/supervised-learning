import type { Scene } from '@graphlearning/flow'
import { line, sample, scatterAroundLine } from '../_curve'

// §09. The first hard lesson, stated before any model is fitted so it cannot be learned the
// expensive way. Two curves on ONE set of training points: the red one threads every one of them
// and scores zero error; the green line does not. Then the held-out points arrive — sampled from
// the same process, never shown to either — and the ranking inverts.
//
// THE CURVE HAS TO ACTUALLY MISS THEM. The first cut summed a narrow bump at each training point,
// which hit all of them and then decayed back to the true line in between — so the "overfitted"
// model was very nearly the right answer everywhere it mattered, and the frame quietly contradicted
// the slide. That is the failure this repo's working agreement is about: three green checks on a
// picture that argues the opposite of its caption. The construction below is built so the claim is
// visible instead of asserted:
//
//   · scatterAroundLine spaces its x's EVENLY, so the training points sit at x0 + k·h.
//   · sin(π(x − x0)/h) is therefore exactly ZERO at every training point and at its extreme halfway
//     between them. Adding it leaves the fit through the data untouched and swings hard in the gaps.
//   · the held-out points are then placed at those midpoints — where the red curve is at its worst
//     and the straight line is still right.
const N = 11
const FROM = 0.5
const TO = 4.6
const H = (TO - FROM) / N // the training spacing; also the sine's half-period
const X0 = FROM + H / 2 // the first training x
const W = 0.42
const B = 1.1

const train = scatterAroundLine(N, W, B, FROM, TO, 0.3, 3)

// Held out at the midpoints — the gaps the training set says nothing about.
const held = train.slice(0, N - 1).map(([x], i) => {
  const xm = x + H / 2
  const jitter = [0.08, -0.11, 0.06, -0.07, 0.1, -0.05, 0.09, -0.1, 0.04, -0.08][i] ?? 0
  return [Number(xm.toFixed(3)), Number((W * xm + B + jitter).toFixed(3))] as [number, number]
})

const wiggle = sample(FROM - H / 2, TO + H / 2, 400, (x) => {
  const threaded = train.reduce(
    (acc, [xi, yi]) => acc + (yi - (W * xi + B)) * Math.exp(-((x - xi) ** 2) / 0.012),
    W * x + B,
  )
  return threaded + 0.62 * Math.sin((Math.PI * (x - X0)) / H)
})

export const theOnlyScore: Scene = {
  id: 'the-only-score',
  title: 'Zero error on the training set proves nothing',
  padding: 0.14,
  nodes: [
    {
      id: 'overfit',
      kind: 'plot',
      label: 'Two models, one training set',
      sub: 'the red curve scores zero on blue — and misses every purple point',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'x' },
        y: { min: 0, max: 4, step: 1, label: 'y' },
        series: [
          { kind: 'line', points: wiggle, color: '#f0656f', label: 'memorised', labelAt: [1.25, 3.5] },
          { kind: 'line', points: line(W, B, 0, 5), color: '#37b877', label: 'learned', labelAt: [3.55, 1.02] },
          { kind: 'scatter', points: train, color: '#4f8ff7', label: 'training', labelAt: [0.18, 3.62] },
          { kind: 'scatter', points: held, color: '#c98bff', label: 'held out', labelAt: [0.18, 3.26] },
        ],
      },
    },
  ],
  edges: [],
}

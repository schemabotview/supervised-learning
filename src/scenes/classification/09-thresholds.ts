import type { Scene, PlotSeries, PlotSpec } from '@graphlearning/flow'
import { sample } from '../_curve'
import { TUMOURS, benign, malignant, model, boundaryAt } from './_data'

// §09. 0.5 is a default, not a law. The same fitted model with two thresholds drawn on it, and the
// point is that moving the rule changes WHICH KIND of mistake you make — it cannot reduce both.
// The counts are the real counts on the real data: at 0.5 the 2.2 cm malignant tumour is missed and
// the 3.0 cm benign one is a false alarm; drop to 0.2 and the miss is caught at the price of a
// second false alarm. That trade is the ONLY reason the dataset carries an overlapping pair — on
// separable data every threshold between 0.2 and 0.8 scores identically and the section has no
// argument to make.
// `cutLabelAt` is explicit because the two panels have empty space in different places: at 0.2 the
// boundary rule lands right on the false-alarm marker, so its label goes left of the rule instead.
const panel = (threshold: number, called: PlotSeries[], cutLabelAt: [number, number]): PlotSpec => {
  const cut = boundaryAt(threshold)
  return {
    x: { min: 0, max: 6, step: 1, label: 'tumour size (cm)' },
    y: { min: -0.12, max: 1.18, step: 0.25, label: 'P(y = 1)' },
    series: [
      { kind: 'line', points: sample(0, 6, 260, model), color: '#c98bff' },
      { kind: 'segment', from: [0, threshold], to: [6, threshold], color: '#6b7686', label: `${threshold}`, labelAt: [5.15, threshold + 0.07] },
      { kind: 'segment', from: [cut, -0.12], to: [cut, 1.18], color: '#f0902f' },
      { kind: 'scatter', points: benign(TUMOURS), color: '#4f8ff7' },
      { kind: 'scatter', points: malignant(TUMOURS), color: '#f0656f' },
      { kind: 'marker', at: [cut, threshold], color: '#f0902f', label: `${cut.toFixed(2)} cm`, labelAt: cutLabelAt },
      ...called,
    ],
  }
}

export const thresholds: Scene = {
  id: 'thresholds',
  title: '0.5 is a default, not a law',
  padding: 0.09,
  nodes: [
    {
      id: 'half',
      kind: 'plot',
      label: 'Threshold 0.5 — call it malignant when it is more likely than not',
      sub: 'boundary at 2.62 cm · 6 of 7 malignant caught, one MISSED · 1 false alarm',
      pattern: 'user',
      plot: panel(0.5, [
        { kind: 'marker', at: [2.2, 1], color: '#f0656f', size: 11, label: 'missed', labelAt: [1.1, 0.87] },
      ], [2.76, 0.31]),
    },
    {
      id: 'low',
      kind: 'plot',
      label: 'Threshold 0.2 — biased towards catching it',
      sub: 'boundary slides LEFT to 2.14 cm · all 7 caught, none missed · but 2 false alarms',
      pattern: 'network',
      plot: panel(0.2, [
        { kind: 'marker', at: [2.2, 1], color: '#37b877', size: 11, label: 'now caught', labelAt: [0.8, 0.87] },
        { kind: 'marker', at: [2.4, 0], color: '#f0902f', size: 11, label: 'new false alarm', labelAt: [2.6, 0.12] },
      ], [0.72, 0.29]),
    },
  ],
  edges: [],
}

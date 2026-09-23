import { foundations } from './foundations'
import { regression } from './regression'
import { multipleFeatures } from './multiple-features'
import { classification } from './classification'
import { generalization } from './generalization'
import { mlInPractice } from './ml-in-practice'
import { trees } from './trees'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. All seven courses are declared up front so the whole arc is visible in the app from day
// one; each fills with sections as its slice is authored.
//
// The seven-course spine (68 sections planned — see COURSE-PLAN.md):
//   1 foundations · 2 regression · 3 multiple-features · 4 classification
//   5 generalization · 6 ml-in-practice · 7 trees
//
// SCOPE. This repo is CLASSICAL supervised learning plus the practice discipline around it. Neural
// networks are ../deep-learning; clustering, recommenders and RL are ../unsupervised-learning. The
// seam is deliberate and does NOT follow the source syllabus: "advice for applying ML" and
// "decision trees" are weeks 3 and 4 of the Advanced Learning Algorithms course, but neither is
// about neural networks — bias/variance and error analysis are how you debug ANY learner, and a
// tree is the other classical model. Putting them here is what makes all three repos coherent.
//
// The house rule: NOTHING cross-references a neighbour by course number. That is what lets the repo
// ship as a PREFIX — courses 1-4 can go live while 5-7 are still being authored, and a later
// reorder costs nothing until the wavs exist. After a course's audio is generated, its section
// ORDER is frozen: the wav filenames are pinned to the section ids.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [regression.id]: regression,
  [multipleFeatures.id]: multipleFeatures,
  [classification.id]: classification,
  [generalization.id]: generalization,
  [mlInPractice.id]: mlInPractice,
  [trees.id]: trees,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}

import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { regressionScenes } from './regression'
import { multipleFeaturesScenes } from './multiple-features'
import { classificationScenes } from './classification'
import { generalizationScenes } from './generalization'
import { mlInPracticeScenes } from './ml-in-practice'
import { treesScenes } from './trees'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses fill in as they're authored, one slice at a time.
const ALL: Scene[] = [
  ...foundationsScenes,
  ...regressionScenes,
  ...multipleFeaturesScenes,
  ...classificationScenes,
  ...generalizationScenes,
  ...mlInPracticeScenes,
  ...treesScenes,
]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}

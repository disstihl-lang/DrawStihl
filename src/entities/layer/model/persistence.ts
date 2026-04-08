import type { LayerId, LayerState } from './types'

export const APP_STORAGE_KEY = 'drawstihl_scene_v1'

export type PersistedScene = {
  ref: LayerState
  user: LayerState
  activeLayer: LayerId | null
  isLinked: boolean
}

export type PersistedUI = {
  drawerOpen: boolean
}

export type AppSnapshot = {
  scene: PersistedScene
  ui: PersistedUI
}

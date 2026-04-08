export type LayerId = 'ref' | 'user'

export type LayerState = {
  x: number
  y: number
  scale: number
  rotation: number
  opacity: number
  contrast: number
  brightness: number
  visible: boolean
  src: string | null
}

export type SceneState = {
  ref: LayerState
  user: LayerState
  activeLayer: LayerId | null
  isLinked: boolean
  isUserVisible: boolean
  gridVisible: boolean
}

export type SliderType = 'opacity' | 'contrast' | 'brightness'

export type UIState = {
  drawerOpen: boolean
  previewSlider: SliderType | null
}

export type ShapeType = 'square' | 'circle' | 'line' | 'triangle'

export type ShapeEntity = {
  id: string
  type: ShapeType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  selected: boolean
}

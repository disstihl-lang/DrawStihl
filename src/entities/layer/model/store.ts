import { create } from 'zustand'
import type {
  LayerId,
  LayerState,
  SceneState,
  SliderType,
  UIState,
  ShapeEntity,
} from './types'

type AppState = {
  scene: SceneState
  ui: UIState

  // Задел для будущего редактора фигур
  shapes: ShapeEntity[]
  selectedShapeId: string | null

  setActiveLayer: (layer: LayerId | null) => void
  setLinkedMode: (value: boolean) => void
  updateLayer: (layer: LayerId, patch: Partial<LayerState>) => void
  updateActiveOrLinked: (patch: Partial<LayerState>) => void
  setPreviewSlider: (type: SliderType | null) => void
  setDrawerOpen: (open: boolean) => void
  setLayerSource: (layer: LayerId, src: string | null) => void
}

const makeInitialLayer = (): LayerState => ({
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  opacity: 1,
  contrast: 1,
  brightness: 1,
  visible: true,
  src: null,
})

export const useAppStore = create<AppState>((set, get) => ({
  scene: {
    ref: makeInitialLayer(),
    user: makeInitialLayer(),
    activeLayer: 'ref',
    isLinked: false,
  },
  ui: {
    drawerOpen: true,
    previewSlider: null,
  },

  shapes: [],
  selectedShapeId: null,

  setActiveLayer: (layer) =>
    set((state) => ({
      scene: { ...state.scene, activeLayer: layer },
    })),

  setLinkedMode: (value) =>
    set((state) => ({
      scene: { ...state.scene, isLinked: value },
    })),

  updateLayer: (layer, patch) =>
    set((state) => ({
      scene: {
        ...state.scene,
        [layer]: { ...state.scene[layer], ...patch },
      },
    })),

  updateActiveOrLinked: (patch) => {
    const { scene } = get()

    if (scene.isLinked) {
      set((state) => ({
        scene: {
          ...state.scene,
          ref: { ...state.scene.ref, ...patch },
          user: { ...state.scene.user, ...patch },
        },
      }))
      return
    }

    if (!scene.activeLayer) return

    set((state) => ({
      scene: {
        ...state.scene,
        [scene.activeLayer]: { ...state.scene[scene.activeLayer], ...patch },
      },
    }))
  },

  setPreviewSlider: (type) =>
    set((state) => ({
      ui: { ...state.ui, previewSlider: type },
    })),

  setDrawerOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, drawerOpen: open },
    })),

  setLayerSource: (layer, src) =>
    set((state) => ({
      scene: {
        ...state.scene,
        [layer]: { ...state.scene[layer], src, visible: !!src },
      },
    })),
}))

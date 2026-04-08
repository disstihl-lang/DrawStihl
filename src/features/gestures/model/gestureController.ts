import type { LayerId, LayerState, SceneState } from '../../../entities/layer/model/types'
import { clampScale } from '../../../entities/layer/lib/transform'

export type DragMemo = { x: number; y: number }

export type PinchMemo = {
  scale: number
  rotation: number
  baseDistance: number
  baseAngle: number
}

const getTargets = (scene: SceneState): LayerId[] =>
  scene.isLinked ? ['ref', 'user'] : scene.activeLayer ? [scene.activeLayer] : []

export const createDragMemo = (layer: LayerState): DragMemo => ({
  x: layer.x,
  y: layer.y,
})

export const buildDragPatch = (
  start: DragMemo,
  movementX: number,
  movementY: number,
): Pick<LayerState, 'x' | 'y'> => ({
  x: start.x + movementX,
  y: start.y + movementY,
})

export const createPinchMemo = (layer: LayerState, distance: number, angle: number): PinchMemo => ({
  scale: layer.scale,
  rotation: layer.rotation,
  baseDistance: distance || 1,
  baseAngle: angle,
})

export const buildPinchPatch = (
  start: PinchMemo,
  distance: number,
  angle: number,
): Pick<LayerState, 'scale' | 'rotation'> => {
  const scaleFactor = (distance || 1) / start.baseDistance

  return {
    scale: clampScale(start.scale * scaleFactor),
    rotation: start.rotation + (angle - start.baseAngle),
  }
}

export const applyPatchToTargets = (
  scene: SceneState,
  updateLayer: (layer: LayerId, patch: Partial<LayerState>) => void,
  patch: Partial<LayerState>,
): boolean => {
  const targets = getTargets(scene)
  if (targets.length === 0) return false

  targets.forEach((layerId) => updateLayer(layerId, patch))
  return true
}

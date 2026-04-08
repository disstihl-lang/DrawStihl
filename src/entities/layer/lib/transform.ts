import type { CSSProperties } from 'react'
import type { LayerState } from '../model/types'

export const MIN_LAYER_SCALE = 0.1
export const MAX_LAYER_SCALE = 20

export const clampScale = (scale: number): number =>
  Math.min(MAX_LAYER_SCALE, Math.max(MIN_LAYER_SCALE, scale))

export const applyDrag = (layer: LayerState, dx: number, dy: number): Pick<LayerState, 'x' | 'y'> => ({
  x: layer.x + dx,
  y: layer.y + dy,
})

export const applyPinch = (
  layer: LayerState,
  scaleFactor: number,
  rotationDelta: number,
): Pick<LayerState, 'scale' | 'rotation'> => ({
  scale: clampScale(layer.scale * scaleFactor),
  rotation: layer.rotation + rotationDelta,
})

export const buildLayerStyle = (layer: LayerState): CSSProperties => ({
  transform: `translate(${layer.x}px, ${layer.y}px) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
  filter: `contrast(${layer.contrast}) brightness(${layer.brightness})`,
  opacity: layer.opacity,
})

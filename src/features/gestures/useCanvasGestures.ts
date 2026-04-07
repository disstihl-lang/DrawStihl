import { RefObject } from 'react'
import { useGesture } from '@use-gesture/react'
import { useAppStore } from '../../entities/layer/model/store'

export const useCanvasGestures = (targetRef: RefObject<HTMLElement>) => {
  const updateLayer = useAppStore((s) => s.updateLayer)
  const scene = useAppStore((s) => s.scene)

  useGesture(
    {
      onDrag: ({ first, movement: [mx, my], memo }) => {
        const layerId = scene.activeLayer
        if (!layerId) return memo

        const layer = scene[layerId]
        const start = first || !memo ? { x: layer.x, y: layer.y } : memo
        const nextPatch = { x: start.x + mx, y: start.y + my }

        if (scene.isLinked) {
          updateLayer('ref', nextPatch)
          updateLayer('user', nextPatch)
        } else {
          updateLayer(layerId, nextPatch)
        }

        return start
      },

      onPinch: ({ first, offset: [distance, angle], memo }) => {
        const layerId = scene.activeLayer
        if (!layerId) return memo

        const layer = scene[layerId]
        const start =
          first || !memo
            ? {
                scale: layer.scale,
                rotation: layer.rotation,
                baseDistance: distance || 1,
                baseAngle: angle,
              }
            : memo

        const scaleFactor = (distance || 1) / start.baseDistance
        const nextScale = Math.max(0.1, start.scale * scaleFactor)
        const nextRotation = start.rotation + (angle - start.baseAngle)
        const nextPatch = { scale: nextScale, rotation: nextRotation }

        if (scene.isLinked) {
          updateLayer('ref', nextPatch)
          updateLayer('user', nextPatch)
        } else {
          updateLayer(layerId, nextPatch)
        }

        return start
      },
    },
    {
      target: targetRef,
      drag: { pointer: { touch: true }, preventDefault: true },
      pinch: { preventDefault: true },
      eventOptions: { passive: false },
    },
  )
}

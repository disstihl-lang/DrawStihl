import { RefObject } from 'react'
import { useGesture } from '@use-gesture/react'
import { useAppStore } from '../../entities/layer/model/store'
import { clampScale } from '../../entities/layer/lib/transform'

export const useCanvasGestures = (targetRef: RefObject<HTMLElement>) => {
  useGesture(
    {
      onDrag: ({ first, movement: [mx, my], memo }) => {
        const { scene, updateLayer } = useAppStore.getState()
        const activeLayerId = scene.activeLayer
        if (!activeLayerId) return memo

        const activeLayer = scene[activeLayerId]
        const start = first || !memo ? createDragMemo(activeLayer) : (memo as DragMemo)
        const patch = buildDragPatch(start, mx, my)

        applyPatchToTargets(scene, updateLayer, patch)
        return start
      },

      onPinch: ({ first, offset: [distance, angle], memo }) => {
        const { scene, updateLayer } = useAppStore.getState()
        const activeLayerId = scene.activeLayer
        if (!activeLayerId) return memo

        const activeLayer = scene[activeLayerId]
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
        const nextScale = clampScale(start.scale * scaleFactor)
        const nextRotation = start.rotation + (angle - start.baseAngle)
        const nextPatch = { scale: nextScale, rotation: nextRotation }

        const patch = buildPinchPatch(start, distance, angle)

        applyPatchToTargets(scene, updateLayer, patch)
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

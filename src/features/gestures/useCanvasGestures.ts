import { RefObject } from 'react'
import { useGesture } from '@use-gesture/react'
import { useAppStore } from '../../entities/layer/model/store'
import {
  applyPatchToTargets,
  buildDragPatch,
  buildPinchPatch,
  createDragMemo,
  createPinchMemo,
  type DragMemo,
  type PinchMemo,
} from './model/gestureController'

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
            ? createPinchMemo(activeLayer, distance, angle)
            : (memo as PinchMemo)

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

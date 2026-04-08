import type { AppSnapshot } from '../../entities/layer/model/persistence'
import { APP_STORAGE_KEY } from '../../entities/layer/model/persistence'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

const isLayerState = (value: unknown): boolean => {
  if (!isRecord(value)) return false

  return (
    isNumber(value.x) &&
    isNumber(value.y) &&
    isNumber(value.scale) &&
    isNumber(value.rotation) &&
    isNumber(value.opacity) &&
    isNumber(value.contrast) &&
    isNumber(value.brightness) &&
    isBoolean(value.visible) &&
    (typeof value.src === 'string' || value.src === null)
  )
}

const isSnapshot = (value: unknown): value is AppSnapshot => {
  if (!isRecord(value) || !isRecord(value.scene) || !isRecord(value.ui)) return false

  const { scene, ui } = value

  return (
    isLayerState(scene.ref) &&
    isLayerState(scene.user) &&
    (scene.activeLayer === 'ref' || scene.activeLayer === 'user' || scene.activeLayer === null) &&
    isBoolean(scene.isLinked) &&
    isBoolean(ui.drawerOpen)
  )
}

export const readSnapshot = (): AppSnapshot | null => {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isSnapshot(parsed)) return null

    return parsed
  } catch {
    return null
  }
}

export const writeSnapshot = (snapshot: AppSnapshot): void => {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // no-op: storage quota / private mode restrictions
  }
}

import { useRef } from 'react'
import { useAppStore } from '../../entities/layer/model/store'
import { Layer } from '../../entities/layer/ui/Layer'
import { useCanvasGestures } from '../../features/gestures/useCanvasGestures'
import styles from './canvas.module.css'

export const Canvas = () => {
  const zoneRef = useRef<HTMLDivElement>(null)
  const scene = useAppStore((s) => s.scene)
  const setActiveLayer = useAppStore((s) => s.setActiveLayer)

  useCanvasGestures(zoneRef)

  const activateRefLayer = () => setActiveLayer('ref')
  const activateUserLayer = () => setActiveLayer('user')

  return (
    <div className={styles.canvasRoot} ref={zoneRef}>
      <Layer layer={scene.ref} alt="Reference layer" />
      <Layer layer={scene.user} alt="User layer" />

      <div className={styles.layerSwitch}>
        <button onClick={activateRefLayer} className={scene.activeLayer === 'ref' ? styles.active : ''}>
          REF
        </button>
        <button onClick={activateUserLayer} className={scene.activeLayer === 'user' ? styles.active : ''}>
          USER
        </button>
      </div>
    </div>
  )
}

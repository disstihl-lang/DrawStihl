import type { CSSProperties } from 'react'
import type { LayerState } from '../model/types'
import styles from '../../../widgets/canvas/canvas.module.css'

type Props = {
  layer: LayerState
  alt: string
}

export const Layer = ({ layer, alt }: Props) => {
  if (!layer.src || !layer.visible) return null

  const style: CSSProperties = {
    transform: `translate(${layer.x}px, ${layer.y}px) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
    filter: `contrast(${layer.contrast}) brightness(${layer.brightness})`,
    opacity: layer.opacity,
  }

  return <img className={styles.layer} src={layer.src} alt={alt} style={style} draggable={false} />
}

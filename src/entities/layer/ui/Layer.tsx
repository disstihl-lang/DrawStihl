import { buildLayerStyle } from '../lib/transform'
import type { LayerState } from '../model/types'
import styles from '../../../widgets/canvas/canvas.module.css'

type Props = {
  layer: LayerState
  alt: string
}

export const Layer = ({ layer, alt }: Props) => {
  if (!layer.src || !layer.visible) return null

  return <img className={styles.layer} src={layer.src} alt={alt} style={buildLayerStyle(layer)} draggable={false} />
}

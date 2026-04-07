import type { ChangeEvent } from 'react'
import type { LayerId } from '../../entities/layer/model/types'
import { useAppStore } from '../../entities/layer/model/store'

export const useImageUpload = () => {
  const setLayerSource = useAppStore((s) => s.setLayerSource)

  const onFileChange = (layer: LayerId) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const src = URL.createObjectURL(file)
    setLayerSource(layer, src)
  }

  return { onFileChange }
}

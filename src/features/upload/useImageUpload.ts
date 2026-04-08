import type { ChangeEvent } from 'react'
import type { LayerId } from '../../entities/layer/model/types'
import { useAppStore } from '../../entities/layer/model/store'
import { imageService } from '../../shared/services/imageService'

export const useImageUpload = () => {
  const setLayerSource = useAppStore((s) => s.setLayerSource)

  const onFileChange = (layer: LayerId) => async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const file = input.files?.[0]
    if (!file) return

    try {
      const src = await imageService.prepareFile(file)
      setLayerSource(layer, src)
    } catch (error) {
      console.error('Image upload failed', error)
    } finally {
      input.value = ''
    }
  }

  return { onFileChange }
}

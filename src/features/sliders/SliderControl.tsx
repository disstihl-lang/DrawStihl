import type { ChangeEvent } from 'react'
import { useAppStore } from '../../entities/layer/model/store'
import type { SliderType } from '../../entities/layer/model/types'
import styles from './sliderControl.module.css'

type Props = {
  type: SliderType
}

const ranges: Record<SliderType, { min: number; max: number; step: number; label: string }> = {
  opacity: { min: 0, max: 1, step: 0.01, label: 'Opacity' },
  contrast: { min: 0.2, max: 3, step: 0.01, label: 'Contrast' },
  brightness: { min: 0.2, max: 3, step: 0.01, label: 'Brightness' },
}

export const SliderControl = ({ type }: Props) => {
  const scene = useAppStore((s) => s.scene)
  const previewSlider = useAppStore((s) => s.ui.previewSlider)
  const updateActiveOrLinked = useAppStore((s) => s.updateActiveOrLinked)
  const setPreviewSlider = useAppStore((s) => s.setPreviewSlider)

  const activeLayer = scene.activeLayer ? scene[scene.activeLayer] : null
  const value = activeLayer ? activeLayer[type] : 1
  const cfg = ranges[type]
  const isActive = previewSlider === type

  const onPointerDown = () => setPreviewSlider(type)
  const onPointerUp = () => setPreviewSlider(null)
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    updateActiveOrLinked({ [type]: Number(event.target.value) })

  return (
    <div className={`${styles.sliderControl} ${isActive ? styles.activeSlider : ''}`}>
      <label>{cfg.label}</label>
      <input
        type="range"
        min={cfg.min}
        max={cfg.max}
        step={cfg.step}
        value={value}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onChange={onChange}
      />
    </div>
  )
}

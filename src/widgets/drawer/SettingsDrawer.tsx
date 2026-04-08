import type { ChangeEvent } from 'react'
import { useAppStore } from '../../entities/layer/model/store'
import { SliderControl } from '../../features/sliders/SliderControl'
import styles from './settingsDrawer.module.css'
import { clsx } from '../../shared/lib/clsx'

export const SettingsDrawer = () => {
  const drawerOpen = useAppStore((s) => s.ui.drawerOpen)
  const previewSlider = useAppStore((s) => s.ui.previewSlider)
  const scene = useAppStore((s) => s.scene)
  const setDrawerOpen = useAppStore((s) => s.setDrawerOpen)
  const setLinkedMode = useAppStore((s) => s.setLinkedMode)
  const toggleGrid = useAppStore((s) => s.toggleGrid)
  const toggleUserVisibility = useAppStore((s) => s.toggleUserVisibility)
  const resetAll = useAppStore((s) => s.resetAll)

  const isPreview = previewSlider !== null

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const onLinkedModeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setLinkedMode(event.target.checked)

  return (
    <aside className={clsx(styles.drawer, drawerOpen && styles.open, isPreview && styles.previewMode)}>
      <button className={styles.toggle} onClick={toggleDrawer}>
        ⚙
      </button>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Settings</h3>
        </div>

        <div className={styles.checkboxRow}>
          <label htmlFor="linked-mode">Linked mode</label>
          <input id="linked-mode" type="checkbox" checked={scene.isLinked} onChange={onLinkedModeChange} />
        </div>

        <div className={styles.checkboxRow}>
          <button type="button" onClick={toggleGrid}>
            {scene.gridVisible ? 'Hide grid' : 'Show grid'}
          </button>
          <button type="button" onClick={toggleUserVisibility}>
            {scene.isUserVisible ? 'Hide user layer' : 'Show user layer'}
          </button>
        </div>

        <div className={styles.checkboxRow}>
          <button type="button" onClick={resetAll}>
            Reset all
          </button>
        </div>

        <SliderControl type="opacity" />
        <SliderControl type="contrast" />
        <SliderControl type="brightness" />
      </div>
    </aside>
  )
}

import { Canvas } from '../widgets/canvas/Canvas'
import { SettingsDrawer } from '../widgets/drawer/SettingsDrawer'
import { useImageUpload } from '../features/upload/useImageUpload'
import styles from './app.module.css'

export const App = () => {
  const { onFileChange } = useImageUpload()

  return (
    <div className={styles.app}>
      <Canvas />
      <SettingsDrawer />

      <div className={styles.uploadPanel}>
        <label>
          REF
          <input type="file" accept="image/*" onChange={onFileChange('ref')} />
        </label>
        <label>
          USER
          <input type="file" accept="image/*" onChange={onFileChange('user')} />
        </label>
      </div>
    </div>
  )
}

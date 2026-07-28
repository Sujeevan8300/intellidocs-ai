import { Button } from 'antd'
import styles from '../../styles/settings.module.css'

interface SaveBarProps {
  visible: boolean
  saving: boolean
  onSave: () => void
  onDiscard: () => void
}

export function SaveBar({ visible, saving, onSave, onDiscard }: SaveBarProps) {
  if (!visible) return null

  return (
    <div className={styles.saveBar} role="status" aria-live="polite">
      <span className={styles.saveBarText}>You have unsaved changes.</span>
      <div className={styles.saveBarActions}>
        <Button onClick={onDiscard} disabled={saving}>Discard</Button>
        <Button type="primary" loading={saving} onClick={onSave}>Save Changes</Button>
      </div>
    </div>
  )
}

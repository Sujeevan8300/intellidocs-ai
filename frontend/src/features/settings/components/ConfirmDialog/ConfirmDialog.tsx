import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from '../../styles/settings.module.css'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', loading, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onCancel}
      destroyOnHidden
      centered
      width={400}
    >
      <div className={styles.confirmDialogContent}>
        <ExclamationCircleOutlined className={styles.confirmDialogIcon} />
        <h3 className={styles.confirmDialogTitle}>{title}</h3>
        <p className={styles.confirmDialogDesc}>{description}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24 }}>
          <Button onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button type="primary" danger loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  )
}

import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from '../../styles/profileMenu.module.css'

interface LogoutDialogProps {
  open: boolean
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  loading,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      className={styles.logoutDialog}
      destroyOnClose
    >
      <div style={{ textAlign: 'center' }}>
        <ExclamationCircleOutlined
          style={{ fontSize: 40, color: '#f59e0b', marginBottom: 16 }}
        />
      </div>
      <h3 className={styles.logoutDialogTitle}>Sign Out</h3>
      <p className={styles.logoutDialogDesc}>
        Are you sure you want to sign out? You will need to log in again
        to access your account.
      </p>
      <div className={styles.logoutDialogActions}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            background: '#fff',
            color: '#475569',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#ef4444',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    </Modal>
  )
}

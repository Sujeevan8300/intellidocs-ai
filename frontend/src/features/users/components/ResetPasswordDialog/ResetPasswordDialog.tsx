import { useEffect, useRef } from 'react'
import { Modal, notification } from 'antd'
import { KeyOutlined } from '@ant-design/icons'
import type { User } from '../../types/User'

interface ResetPasswordDialogProps {
  open: boolean
  user: User | null
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export function ResetPasswordDialog({ open, user, onConfirm, onCancel, loading }: ResetPasswordDialogProps) {
  const prevLoading = useRef(loading)

  useEffect(() => {
    if (prevLoading.current && !loading && open) {
      notification.success({
        message: 'Password Reset Successful',
        description: `A password reset email has been sent to ${user?.email ?? 'the user'}.`,
        className: 'usr-reset-success',
      })
      onCancel()
    }
    prevLoading.current = loading
  }, [loading, open, onCancel, user])

  return (
    <Modal
      open={open}
      title="Reset Password"
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Reset Password"
      cancelText="Cancel"
      className="usr-reset-dialog"
      aria-label="Confirm password reset"
    >
      <div className="usr-reset-dialog-content">
        <KeyOutlined
          style={{ fontSize: 24, color: '#1677ff', marginBottom: 12 }}
        />
        <p>
          Send a password reset email to{' '}
          <strong>{user ? `${user.firstName} ${user.lastName}` : 'this user'}</strong>?
        </p>
        <p>
          The user will receive an email at <strong>{user?.email ?? ''}</strong> with
          instructions to create a new password.
        </p>
      </div>
    </Modal>
  )
}

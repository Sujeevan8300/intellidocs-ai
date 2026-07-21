import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { User } from '../../types/User'

interface DeleteUserDialogProps {
  open: boolean
  user: User | null
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export function DeleteUserDialog({ open, user, onConfirm, onCancel, loading }: DeleteUserDialogProps) {
  return (
    <Modal
      open={open}
      title="Deactivate User"
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Deactivate"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      className="usr-delete-dialog"
      aria-label="Confirm user deactivation"
    >
      <div className="usr-delete-dialog-content">
        <ExclamationCircleOutlined
          style={{ fontSize: 24, color: '#faad14', marginBottom: 12 }}
        />
        <p>
          Are you sure you want to deactivate{' '}
          <strong>{user ? `${user.firstName} ${user.lastName}` : 'this user'}</strong>?
        </p>
        <p>
          This will soft-delete the user and they will no longer be able to access the system.
          This action can be reversed by an administrator.
        </p>
      </div>
    </Modal>
  )
}

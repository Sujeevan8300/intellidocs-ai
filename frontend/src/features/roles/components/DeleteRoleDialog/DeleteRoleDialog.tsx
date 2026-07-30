import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface DeleteRoleDialogProps {
  open: boolean
  roleName: string
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteRoleDialog({ open, roleName, loading, onConfirm, onCancel }: DeleteRoleDialogProps) {
  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onCancel}
      centered
      width={400}
      destroyOnHidden
    >
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <ExclamationCircleOutlined style={{ fontSize: 48, color: '#ef4444', marginBottom: 16 }} />
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222137', margin: '0 0 8px' }}>Delete Role</h3>
        <p style={{ fontSize: 13, color: '#6b6880', margin: '0 0 20px' }}>
          Are you sure you want to delete <strong>{roleName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '8px 20px', border: '1px solid #d9d7e8', borderRadius: 8, background: '#fff', color: '#43415a', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} disabled={loading} style={{ padding: '8px 20px', border: 'none', borderRadius: 8, background: '#ef4444', color: '#fff', fontSize: 13, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>{loading ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>
    </Modal>
  )
}

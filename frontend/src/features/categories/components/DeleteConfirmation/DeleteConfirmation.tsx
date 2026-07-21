import { Modal, Button } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

interface DeleteConfirmationProps {
  open: boolean
  categoryName: string
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmation({
  open,
  categoryName,
  loading,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={420}
      className="cat-delete-modal"
      closable={!loading}
      maskClosable={!loading}
    >
      <div className="cat-delete-content">
        <div className="cat-delete-icon">
          <ExclamationCircleFilled />
        </div>
        <h3 className="cat-delete-title">Delete Category?</h3>
        <p className="cat-delete-body">
          Are you sure you want to delete{' '}
          <strong>"{categoryName}"</strong>?{' '}
          This action cannot be undone.
        </p>
        <div className="cat-delete-actions">
          <Button
            id="delete-cancel-btn"
            onClick={onCancel}
            disabled={loading}
            size="large"
            block
          >
            Cancel
          </Button>
          <Button
            id="delete-confirm-btn"
            type="primary"
            danger
            onClick={onConfirm}
            loading={loading}
            size="large"
            block
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

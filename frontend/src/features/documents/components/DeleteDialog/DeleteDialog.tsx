import { Modal, Button } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

interface DeleteDialogProps {
  open: boolean
  documentName: string
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteDialog({ open, documentName, loading, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={420}
      className="doc-delete-modal"
      closable={!loading}
      maskClosable={!loading}
    >
      <div className="doc-delete-content">
        <div className="doc-delete-icon">
          <ExclamationCircleFilled />
        </div>
        <h3 className="doc-delete-title">Delete Document?</h3>
        <p className="doc-delete-body">
          Are you sure you want to delete <strong>"{documentName}"</strong>?
          This will permanently remove the document and its AI embeddings.
        </p>
        <div className="doc-delete-actions">
          <Button id="delete-cancel-btn" onClick={onCancel} disabled={loading} size="large" block>
            Cancel
          </Button>
          <Button id="delete-confirm-btn" type="primary" danger onClick={onConfirm} loading={loading} size="large" block>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

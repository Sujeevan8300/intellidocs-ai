import { FileAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface EmptyStateProps {
  onCreateClick?: () => void
  title?: string
  description?: string
}

export function EmptyState({
  onCreateClick,
  title = 'No documents available',
  description = 'Upload your first document to start building your AI Knowledge Base.',
}: EmptyStateProps) {
  return (
    <div className="doc-empty-state">
      <div className="doc-empty-icon">
        <FileAddOutlined />
      </div>
      <h3 className="doc-empty-title">{title}</h3>
      <p className="doc-empty-description">{description}</p>
      {onCreateClick && (
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={onCreateClick}
          id="empty-upload-btn"
        >
          Upload Document
        </Button>
      )}
    </div>
  )
}

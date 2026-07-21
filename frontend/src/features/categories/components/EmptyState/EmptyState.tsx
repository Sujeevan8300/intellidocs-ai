import { FolderOpenOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface EmptyStateProps {
  onCreateClick?: () => void
  canCreate?: boolean
  title?: string
  description?: string
}

export function EmptyState({
  onCreateClick,
  canCreate = false,
  title = 'No Categories Found',
  description = 'Get started by creating your first knowledge category to organize your documents.',
}: EmptyStateProps) {
  return (
    <div className="cat-empty-state">
      <div className="cat-empty-icon">
        <FolderOpenOutlined />
      </div>
      <h3 className="cat-empty-title">{title}</h3>
      <p className="cat-empty-description">{description}</p>
      {canCreate && onCreateClick && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreateClick}
          id="empty-state-create-btn"
        >
          Create Category
        </Button>
      )}
    </div>
  )
}

import { UserAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="usr-empty-state">
      <div className="usr-empty-icon">
        <UserAddOutlined />
      </div>
      <h3 className="usr-empty-title">No users found</h3>
      <p className="usr-empty-description">
        Get started by adding your first user to the system.
      </p>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        onClick={onCreateClick}
        aria-label="Add User"
      >
        Add User
      </Button>
    </div>
  )
}

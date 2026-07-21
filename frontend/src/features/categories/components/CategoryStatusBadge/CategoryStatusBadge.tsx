import { Tag } from 'antd'
import { CategoryStatus } from '../../types/Category'

interface CategoryStatusBadgeProps {
  status: CategoryStatus
}

export function CategoryStatusBadge({ status }: CategoryStatusBadgeProps) {
  const isActive = status === CategoryStatus.ACTIVE
  return (
    <Tag
      className={`cat-status-badge cat-status-badge--${isActive ? 'active' : 'inactive'}`}
      bordered={false}
    >
      <span className="cat-status-dot" />
      {isActive ? 'Active' : 'Inactive'}
    </Tag>
  )
}

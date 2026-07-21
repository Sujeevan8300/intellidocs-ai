import { Tag } from 'antd'
import type { UserStatus } from '../../types/User'

interface UserStatusBadgeProps {
  status: UserStatus
}

const statusConfig: Record<UserStatus, { color: string; label: string }> = {
  ACTIVE: { color: 'green', label: 'Active' },
  INACTIVE: { color: 'default', label: 'Inactive' },
  LOCKED: { color: 'red', label: 'Locked' },
  PENDING: { color: 'orange', label: 'Pending' },
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Tag color={config.color} className="usr-status-badge" role="status" aria-label={`Status: ${config.label}`}>
      {config.label}
    </Tag>
  )
}

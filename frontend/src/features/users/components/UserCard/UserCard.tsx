import { Tooltip, Button, Dropdown, Tag } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, MoreOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserStatusBadge } from '../UserStatusBadge/UserStatusBadge'
import type { User } from '../../types/User'

interface UserCardProps {
  user: User
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onToggleStatus: (id: number) => void
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function UserCard({ user, onView, onEdit, onDelete, onToggleStatus }: UserCardProps) {
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete',
      danger: true,
      onClick: () => onDelete(user),
    },
    {
      key: 'toggle',
      icon: user.status === 'ACTIVE' ? <StopOutlined /> : <CheckCircleOutlined />,
      label: user.status === 'ACTIVE' ? 'Deactivate' : 'Activate',
      onClick: () => onToggleStatus(user.id),
    },
  ]

  return (
    <div className="usr-card" id={`usr-card-${user.id}`}>
      <div className="usr-card__header" onClick={() => onView(user)}>
        <div className="usr-card__avatar">
          <UserAvatar user={user} size="large" />
        </div>
        <div className="usr-card__header-info">
          <div className="usr-card__name">{user.firstName} {user.lastName}</div>
          <div className="usr-card__email">{user.email}</div>
        </div>
        <div className="usr-card__header-actions">
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
            <Button type="text" size="small" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
          </Dropdown>
        </div>
      </div>

      <div className="usr-card__body" onClick={() => onView(user)}>
        <div className="usr-card__meta-row">
          <span className="usr-card__label">Department</span>
          <span className="usr-card__value">{user.department}</span>
        </div>
        <div className="usr-card__meta-row">
          <span className="usr-card__label">Role</span>
          <Tag color={user.role === 'Super Admin' ? 'purple' : user.role === 'Knowledge Manager' ? 'blue' : 'default'}>
            {user.role}
          </Tag>
        </div>
        <div className="usr-card__meta-row">
          <span className="usr-card__label">Status</span>
          <UserStatusBadge status={user.status} />
        </div>
        <div className="usr-card__meta-row">
          <span className="usr-card__label">Login</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: user.online ? '#52c41a' : '#d9d9d9',
                display: 'inline-block',
              }}
            />
            {user.online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="usr-card__footer">
        <span className="usr-card__last-login">Last login: {formatDate(user.lastLogin)}</span>
        <div className="usr-card__actions">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} size="small" onClick={() => onView(user)} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} size="small" onClick={() => onEdit(user)} /></Tooltip>
        </div>
      </div>
    </div>
  )
}

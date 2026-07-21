import { Drawer, Descriptions, Tabs, Button, Tag } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserStatusBadge } from '../UserStatusBadge/UserStatusBadge'
import type { User } from '../../types/User'

interface UserProfileDrawerProps {
  open: boolean
  user: User | null
  onClose: () => void
  onEdit: (user: User) => void
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const tabItems = [
  {
    key: 'activity',
    label: 'Activity',
    children: (
      <div className="usr-profile-tab-content" style={{ padding: '16px 0', color: '#8c8c8c', textAlign: 'center' }}>
        Activity log will appear here.
      </div>
    ),
  },
  {
    key: 'documents',
    label: 'Documents',
    children: (
      <div className="usr-profile-tab-content" style={{ padding: '16px 0', color: '#8c8c8c', textAlign: 'center' }}>
        Assigned documents will appear here.
      </div>
    ),
  },
  {
    key: 'audit',
    label: 'Audit Logs',
    children: (
      <div className="usr-profile-tab-content" style={{ padding: '16px 0', color: '#8c8c8c', textAlign: 'center' }}>
        Audit trail will appear here.
      </div>
    ),
  },
]

export function UserProfileDrawer({ open, user, onClose, onEdit }: UserProfileDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={520}
      title={null}
      className="usr-profile-drawer"
      destroyOnHidden
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onClose}>Close</Button>
          {user && (
            <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(user)}>
              Edit
            </Button>
          )}
        </div>
      }
    >
      {user && (
        <>
          <div className="usr-profile-drawer__header" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <UserAvatar user={user} size="large" />
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
              <div style={{ color: '#8c8c8c' }}>{user.employeeId}</div>
            </div>
          </div>

          <Descriptions column={1} bordered size="small" className="usr-profile-drawer__details">
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone || '—'}</Descriptions.Item>
            <Descriptions.Item label="Department">{user.department}</Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={user.role === 'Super Admin' ? 'purple' : user.role === 'Knowledge Manager' ? 'blue' : 'default'}>
                {user.role}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status"><UserStatusBadge status={user.status} /></Descriptions.Item>
            <Descriptions.Item label="Login Status">
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
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">{formatDate(user.lastLogin)}</Descriptions.Item>
            <Descriptions.Item label="Login Count">{user.loginCount}</Descriptions.Item>
            <Descriptions.Item label="Created">{formatDate(user.createdAt)}</Descriptions.Item>
            <Descriptions.Item label="Updated">{formatDate(user.updatedAt)}</Descriptions.Item>
            {user.notes && <Descriptions.Item label="Notes">{user.notes}</Descriptions.Item>}
          </Descriptions>

          <Tabs items={tabItems} style={{ marginTop: 24 }} />
        </>
      )}
    </Drawer>
  )
}

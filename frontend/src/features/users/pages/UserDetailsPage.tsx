import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Descriptions, Tag, Tabs, Avatar, notification } from 'antd'
import { ArrowLeftOutlined, EditOutlined, KeyOutlined, LockOutlined, StopOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../../store'
import { fetchUserById, activateUser, deactivateUser, lockUser, unlockUser, resetPassword } from '../slices/userSlice'
import { UserStatusBadge } from '../components/UserStatusBadge/UserStatusBadge'
import { PageSkeleton } from '../components/LoadingSkeleton/LoadingSkeleton'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedUser, loading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    if (id) dispatch(fetchUserById(Number(id)))
  }, [id, dispatch])

  const handleEdit = useCallback(() => {
    if (selectedUser) {
      notification.info({ message: 'Edit mode', description: 'Edit functionality will open the user form.', placement: 'topRight' })
    }
  }, [selectedUser])

  const handleToggleStatus = useCallback(async () => {
    if (!selectedUser) return
    const action = selectedUser.status === 'ACTIVE' ? deactivateUser : activateUser
    const result = await dispatch(action(selectedUser.id))
    if (action.fulfilled.match(result)) {
      notification.success({
        message: selectedUser.status === 'ACTIVE' ? 'User deactivated' : 'User activated',
        description: `${selectedUser.firstName} ${selectedUser.lastName} has been ${selectedUser.status === 'ACTIVE' ? 'deactivated' : 'activated'}.`,
        placement: 'topRight',
      })
    }
  }, [dispatch, selectedUser])

  const handleLock = useCallback(async () => {
    if (!selectedUser) return
    const action = selectedUser.status === 'LOCKED' ? unlockUser : lockUser
    const result = await dispatch(action(selectedUser.id))
    if (action.fulfilled.match(result)) {
      notification.success({
        message: selectedUser.status === 'LOCKED' ? 'User unlocked' : 'User locked',
        description: `${selectedUser.firstName} ${selectedUser.lastName} has been ${selectedUser.status === 'LOCKED' ? 'unlocked' : 'locked'}.`,
        placement: 'topRight',
      })
    }
  }, [dispatch, selectedUser])

  const handleResetPassword = useCallback(async () => {
    if (!selectedUser) return
    const result = await dispatch(resetPassword(selectedUser.id))
    if (resetPassword.fulfilled.match(result)) {
      notification.success({ message: 'Password reset email sent', description: `A reset link has been sent to ${selectedUser.email}.`, placement: 'topRight' })
    }
  }, [dispatch, selectedUser])

  if (loading) {
    return (
      <div className="usr-page">
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/users')}>Back</Button>
        <PageSkeleton />
      </div>
    )
  }

  if (error || !selectedUser) {
    return (
      <div className="usr-page">
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/users')}>Back</Button>
        <div className="usr-page-error">
          <p>User not found.</p>
        </div>
      </div>
    )
  }

  const user = selectedUser

  const tabItems = [
    {
      key: 'activity',
      label: 'Activity',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Activity log will appear here.
        </div>
      ),
    },
    {
      key: 'documents',
      label: 'Documents',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Assigned documents will appear here.
        </div>
      ),
    },
    {
      key: 'audit',
      label: 'Audit Logs',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Audit trail will appear here.
        </div>
      ),
    },
  ]

  return (
    <div className="usr-page">
      <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/users')} className="usr-back-btn">Back to Users</Button>

      <div className="usr-detail-header">
        <div className="usr-detail-avatar">
          {user.avatar ? (
            <Avatar src={user.avatar} size={72} />
          ) : (
            <Avatar size={72} icon={<UserOutlined />} />
          )}
        </div>
        <div className="usr-detail-meta">
          <div className="usr-detail-eyebrow">User Details</div>
          <h1 className="usr-detail-name">{user.firstName} {user.lastName}</h1>
          <div className="usr-detail-tags">
            <Tag>{user.employeeId}</Tag>
            <UserStatusBadge status={user.status} />
            <Tag color={user.role === 'Super Admin' ? 'purple' : user.role === 'Knowledge Manager' ? 'blue' : 'default'}>{user.role}</Tag>
          </div>
        </div>
        <div className="usr-detail-actions">
          <Button icon={<EditOutlined />} onClick={handleEdit}>Edit</Button>
          <Button icon={<KeyOutlined />} onClick={handleResetPassword}>Reset Password</Button>
          <Button icon={user.status === 'LOCKED' ? <CheckCircleOutlined /> : <LockOutlined />} onClick={handleLock}>
            {user.status === 'LOCKED' ? 'Unlock' : 'Lock'}
          </Button>
          <Button icon={<StopOutlined />} danger={user.status === 'ACTIVE'} onClick={handleToggleStatus}>
            {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>

      <div className="usr-detail-grid">
        <Card title="Information" className="usr-detail-card">
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
            <Descriptions.Item label="Employee ID">{user.employeeId}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone || '—'}</Descriptions.Item>
            <Descriptions.Item label="Department">{user.department}</Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={user.role === 'Super Admin' ? 'purple' : user.role === 'Knowledge Manager' ? 'blue' : 'default'}>{user.role}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status"><UserStatusBadge status={user.status} /></Descriptions.Item>
            <Descriptions.Item label="Login Status">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: user.online ? '#52c41a' : '#d9d9d9', display: 'inline-block' }} />
                {user.online ? 'Online' : 'Offline'}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">{formatDate(user.lastLogin)}</Descriptions.Item>
            <Descriptions.Item label="Login Count">{user.loginCount}</Descriptions.Item>
            <Descriptions.Item label="Created">{formatDate(user.createdAt)}</Descriptions.Item>
            <Descriptions.Item label="Updated">{formatDate(user.updatedAt)}</Descriptions.Item>
            {user.notes && <Descriptions.Item label="Notes" span={2}>{user.notes}</Descriptions.Item>}
          </Descriptions>
        </Card>

        <Card className="usr-detail-card">
          <Tabs items={tabItems} />
        </Card>
      </div>
    </div>
  )
}

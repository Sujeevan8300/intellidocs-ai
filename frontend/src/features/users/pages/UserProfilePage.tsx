import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Descriptions, Tag, Avatar, Tabs, notification } from 'antd'
import { EditOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../../store'
import { updateUser, resetPassword } from '../slices/userSlice'
import { UserStatusBadge } from '../components/UserStatusBadge/UserStatusBadge'
import { UserForm } from '../components/UserForm/UserForm'
import { useUserForm } from '../hooks/useUserForm'
import type { User } from '../types/User'
import type { UpdateUserRequest } from '../types/UserRequest'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function UserProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, submitting } = useSelector((state: RootState) => state.users)
  const currentUser: User | undefined = users[0]

  const [editOpen, setEditOpen] = useState(false)

  const { form } = useUserForm({
    mode: 'edit',
    initialData: currentUser,
  })

  const handleEdit = useCallback(() => {
    if (currentUser) {
      form.reset({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        employeeId: currentUser.employeeId,
        email: currentUser.email,
        phone: currentUser.phone,
        department: currentUser.department,
        role: currentUser.role,
        status: currentUser.status,
        avatar: currentUser.avatar,
        notes: currentUser.notes,
      })
      setEditOpen(true)
    }
  }, [currentUser, form])

  const handleFormSubmit = useCallback(async (data: Record<string, unknown>) => {
    if (!currentUser) return
    const result = await dispatch(updateUser({ id: currentUser.id, request: data as unknown as UpdateUserRequest }))
    if (updateUser.fulfilled.match(result)) {
      notification.success({ message: 'Profile updated', description: 'Your profile has been updated.', placement: 'topRight' })
      setEditOpen(false)
    } else {
      notification.error({ message: 'Failed to update profile', description: String(result.payload), placement: 'topRight' })
    }
  }, [dispatch, currentUser])

  const handleResetPassword = useCallback(async () => {
    if (!currentUser) return
    const result = await dispatch(resetPassword(currentUser.id))
    if (resetPassword.fulfilled.match(result)) {
      notification.success({ message: 'Password reset email sent', description: `A reset link has been sent to ${currentUser.email}.`, placement: 'topRight' })
    }
  }, [dispatch, currentUser])

  if (!currentUser) {
    return (
      <div className="usr-page">
        <div className="usr-page-error">
          <p>No user profile available.</p>
        </div>
      </div>
    )
  }

  const user = currentUser

  const tabItems = [
    {
      key: 'activity',
      label: 'Activity',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Your activity log will appear here.
        </div>
      ),
    },
    {
      key: 'documents',
      label: 'Documents',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Your assigned documents will appear here.
        </div>
      ),
    },
    {
      key: 'audit',
      label: 'Audit Logs',
      children: (
        <div style={{ padding: '24px 0', color: '#8c8c8c', textAlign: 'center' }}>
          Your audit trail will appear here.
        </div>
      ),
    },
  ]

  return (
    <div className="usr-page">
      <div className="usr-page-header">
        <div className="usr-page-header-left">
          <h1 className="usr-page-title">My Profile</h1>
          <p className="usr-page-subtitle">View and manage your profile</p>
        </div>
      </div>

      <div className="usr-detail-header">
        <div className="usr-detail-avatar">
          {user.avatar ? (
            <Avatar src={user.avatar} size={72} />
          ) : (
            <Avatar size={72} icon={<UserOutlined />} />
          )}
        </div>
        <div className="usr-detail-meta">
          <div className="usr-detail-name">{user.firstName} {user.lastName}</div>
          <div className="usr-detail-tags">
            <Tag>{user.employeeId}</Tag>
            <UserStatusBadge status={user.status} />
            <Tag color={user.role === 'Super Admin' ? 'purple' : user.role === 'Knowledge Manager' ? 'blue' : 'default'}>{user.role}</Tag>
          </div>
        </div>
        <div className="usr-detail-actions">
          <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>Edit Profile</Button>
          <Button icon={<KeyOutlined />} onClick={handleResetPassword}>Reset Password</Button>
        </div>
      </div>

      <div className="usr-detail-grid">
        <Card title="Personal Information" className="usr-detail-card">
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
            <Descriptions.Item label="Last Login">{formatDate(user.lastLogin)}</Descriptions.Item>
            <Descriptions.Item label="Login Count">{user.loginCount}</Descriptions.Item>
            {user.notes && <Descriptions.Item label="Notes" span={2}>{user.notes}</Descriptions.Item>}
          </Descriptions>
        </Card>

        <Card className="usr-detail-card">
          <Tabs items={tabItems} />
        </Card>
      </div>

      {editOpen && (
        <div className="usr-page-modal-overlay">
          <Card title="Edit Profile" className="usr-page-modal" extra={<Button onClick={() => setEditOpen(false)}>Close</Button>}>
            <UserForm
              form={form}
              onSubmit={handleFormSubmit}
              submitting={submitting}
              onCancel={() => setEditOpen(false)}
              mode="edit"
            />
          </Card>
        </div>
      )}
    </div>
  )
}

import { Table, Button, Tooltip, Tag, Checkbox } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  LockOutlined,
  KeyOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserStatusBadge } from '../UserStatusBadge/UserStatusBadge'
import { EmptyState } from '../EmptyState/EmptyState'
import type { User } from '../../types/User'
import type { UserStatus } from '../../types/User'

interface UserTableProps {
  users: User[]
  loading: boolean
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: () => void
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onToggleStatus: (id: number) => void
  onLock: (user: User) => void
  onResetPassword: (user: User) => void
  onUploadClick: () => void
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function UserTable({
  users,
  loading,
  selectedIds,
  onSelect,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onLock,
  onResetPassword,
  onUploadClick,
  currentPage,
  pageSize,
  total,
  onPageChange,
}: UserTableProps) {
  const columns: ColumnsType<User> = [
    {
      title: '',
      key: 'checkbox',
      width: 40,
      render: (_: unknown, record: User) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={() => onSelect(record.id)}
          id={`select-user-${record.id}`}
        />
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: User) => (
        <div className="usr-table-name" onClick={() => onView(record)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserAvatar user={record} size="small" />
          <div>
            <div className="usr-table-name-text" style={{ fontWeight: 600 }}>{record.firstName} {record.lastName}</div>
          </div>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <span className="usr-table-secondary">{email}</span>,
      width: 200,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (id: string) => <span className="usr-table-secondary">{id}</span>,
      width: 120,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (dept: string) => <span className="usr-table-secondary">{dept}</span>,
      width: 120,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'Super Admin' ? 'purple' : role === 'Knowledge Manager' ? 'blue' : 'default'}>
          {role}
        </Tag>
      ),
      width: 160,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => <UserStatusBadge status={status} />,
      width: 100,
    },
    {
      title: 'Login Status',
      key: 'loginStatus',
      render: (_: unknown, record: User) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: record.online ? '#52c41a' : '#d9d9d9',
              display: 'inline-block',
            }}
          />
          {record.online ? 'Online' : 'Offline'}
        </span>
      ),
      width: 110,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => <span className="usr-table-secondary">{formatDate(date)}</span>,
      width: 120,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span className="usr-table-secondary">{formatDate(date)}</span>,
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (_: unknown, record: User) => (
        <div className="usr-table-actions" style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} size="small" onClick={() => onView(record)} id={`view-${record.id}`} /></Tooltip>
          <Tooltip title="Edit"><Button type="text" icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} id={`edit-${record.id}`} /></Tooltip>
          <Tooltip title={record.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}>
            <Button
              type="text"
              size="small"
              icon={record.status === 'ACTIVE' ? <StopOutlined /> : <CheckCircleOutlined />}
              onClick={() => onToggleStatus(record.id)}
              danger={record.status === 'ACTIVE'}
              id={`toggle-${record.id}`}
            />
          </Tooltip>
          <Tooltip title={record.status === 'LOCKED' ? 'Unlock' : 'Lock'}>
            <Button type="text" icon={<LockOutlined />} size="small" onClick={() => onLock(record)} id={`lock-${record.id}`} />
          </Tooltip>
          <Tooltip title="Reset Password"><Button type="text" icon={<KeyOutlined />} size="small" onClick={() => onResetPassword(record)} id={`reset-pwd-${record.id}`} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} size="small" danger onClick={() => onDelete(record)} id={`delete-${record.id}`} /></Tooltip>
        </div>
      ),
    },
  ]

  if (!loading && users.length === 0) {
    return <EmptyState onCreateClick={onUploadClick} />
  }

  return (
    <Table<User>
      dataSource={users}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        showTotal: (t, range) => `${range[0]}–${range[1]} of ${t} users`,
        showSizeChanger: false,
        onChange: onPageChange,
        className: 'usr-pagination',
      }}
      rowSelection={{
        selectedRowKeys: selectedIds,
        onChange: () => {
          onSelectAll()
        },
      }}
      scroll={{ x: 1500 }}
      className="usr-table"
      onRow={(record) => ({ onDoubleClick: () => onView(record) })}
    />
  )
}

import { Table, Tag, Badge, Space, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import type { Role } from '../../types/Role'

interface RoleTableProps {
  roles: Role[]
  loading: boolean
  onEdit: (role: Role) => void
  onDelete: (id: number) => void
  onClone: (role: Role) => void
  onSelect: (id: number) => void
  selectedId: number | null
}

export function RoleTable({ roles, loading, onEdit, onDelete, onClone, onSelect, selectedId }: RoleTableProps) {
  const columns: ColumnsType<Role> = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: 180, render: (v: string, r: Role) => <a onClick={() => onSelect(r.id)} style={{ fontWeight: 600, color: '#222137' }}>{v}</a> },
    { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: 'Users', dataIndex: 'usersCount', key: 'usersCount', width: 80, align: 'center' },
    {
      title: 'Privileges', key: 'privileges', width: 120, align: 'center',
      render: (_, r) => <Tag color="purple">{r.privileges.length} permissions</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status', width: 100,
      render: (v: string) => v === 'ACTIVE' ? <Badge status="success" text="Active" /> : <Badge status="default" text="Inactive" />,
    },
    {
      title: 'Actions', key: 'actions', width: 140,
      render: (_, r) => (
        <Space size={0}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); onEdit(r) }} />
          <Button type="text" size="small" icon={<CopyOutlined />} onClick={(e) => { e.stopPropagation(); onClone(r) }} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); onDelete(r.id) }} />
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={roles}
      columns={columns}
      rowKey="id"
      loading={loading}
      size="middle"
      pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (t) => `${t} roles` }}
      onRow={(r) => ({
        onClick: () => onSelect(r.id),
        style: { cursor: 'pointer', background: selectedId === r.id ? '#f5f3ff' : undefined },
      })}
      scroll={{ x: 750 }}
    />
  )
}

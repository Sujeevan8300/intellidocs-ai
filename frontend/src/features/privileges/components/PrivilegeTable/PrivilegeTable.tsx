import { Table, Tag, Badge } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Privilege } from '../../types/Privilege'

interface PrivilegeTableProps {
  privileges: Privilege[]
  loading: boolean
  selectedId: number | null
  onSelect: (p: Privilege) => void
}

export function PrivilegeTable({ privileges, loading, selectedId, onSelect }: PrivilegeTableProps) {
  const columns: ColumnsType<Privilege> = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: 220, render: (v: string) => <code style={{ fontSize: 12 }}>{v}</code> },
    { title: 'Module', dataIndex: 'module', key: 'module', width: 140, render: (v: string) => <Tag>{v}</Tag> },
    { title: 'Action', dataIndex: 'action', key: 'action', width: 120 },
    { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: 'Status', dataIndex: 'status', key: 'status', width: 100,
      render: (v: string) => v === 'ACTIVE'
        ? <Badge status="success" text="Active" />
        : <Badge status="default" text="Inactive" />,
    },
  ]

  return (
    <Table
      dataSource={privileges}
      columns={columns}
      rowKey="id"
      loading={loading}
      size="middle"
      pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (t) => `${t} privileges` }}
      onRow={(r) => ({
        onClick: () => onSelect(r),
        style: { cursor: 'pointer', background: selectedId === r.id ? '#f5f3ff' : undefined },
      })}
      scroll={{ x: 700 }}
    />
  )
}

import { Descriptions, Tag, Badge, Button, Popconfirm } from 'antd'
import type { Privilege } from '../../types/Privilege'

interface PrivilegeDetailsProps {
  privilege: Privilege
  onDelete: (id: number) => void
}

export function PrivilegeDetails({ privilege, onDelete }: PrivilegeDetailsProps) {
  return (
    <div>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Name"><code style={{ fontSize: 12 }}>{privilege.name}</code></Descriptions.Item>
        <Descriptions.Item label="Module"><Tag>{privilege.module}</Tag></Descriptions.Item>
        <Descriptions.Item label="Action">{privilege.action}</Descriptions.Item>
        <Descriptions.Item label="Description">{privilege.description}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {privilege.status === 'ACTIVE' ? <Badge status="success" text="Active" /> : <Badge status="default" text="Inactive" />}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{privilege.id}</Descriptions.Item>
      </Descriptions>
      <Popconfirm title="Delete this privilege?" description="This cannot be undone." onConfirm={() => onDelete(privilege.id)} okText="Delete" okButtonProps={{ danger: true }}>
        <Button danger size="small" style={{ marginTop: 12 }}>Delete Privilege</Button>
      </Popconfirm>
    </div>
  )
}

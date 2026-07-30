import { Form, Input, Select } from 'antd'
import type { FormInstance } from 'antd'

interface RoleFormProps {
  form: FormInstance
  onSubmit: (values: { name: string; description: string; status: 'ACTIVE' | 'INACTIVE' }) => void
}

export function RoleForm({ form, onSubmit }: RoleFormProps) {
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} style={{ maxWidth: 500 }}>
      <Form.Item label="Role Name" name="name" rules={[
        { required: true, message: 'Role name is required' },
        { min: 2, message: 'At least 2 characters' },
        { pattern: /^[a-zA-Z0-9 ]+$/, message: 'Only letters, numbers, and spaces' },
      ]}>
        <Input placeholder="e.g. Content Manager" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[
        { required: true, message: 'Description is required' },
        { min: 10, message: 'At least 10 characters' },
      ]}>
        <Input.TextArea rows={3} placeholder="Describe the role's purpose and scope" />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Select options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]} />
      </Form.Item>
    </Form>
  )
}

import { Form, Input, Select } from 'antd'
import { PRIVILEGE_MODULES } from '../../mocks/privileges'

interface PrivilegeFormProps {
  loading: boolean
  onSubmit: (values: { name: string; module: string; action: string; description: string; status: 'ACTIVE' | 'INACTIVE' }) => void
  onCancel: () => void
}

export function PrivilegeForm({ loading, onSubmit, onCancel }: PrivilegeFormProps) {
  const [form] = Form.useForm()
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Permission name is required' }]}>
        <Input placeholder="e.g. DOCUMENT_VIEW" />
      </Form.Item>
      <Form.Item label="Module" name="module" rules={[{ required: true }]}>
        <Select placeholder="Select module" options={PRIVILEGE_MODULES.map(m => ({ label: m, value: m }))} />
      </Form.Item>
      <Form.Item label="Action" name="action" rules={[{ required: true, message: 'Action description is required' }]}>
        <Input placeholder="e.g. View, Create, Delete" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Description is required' }]}>
        <Input.TextArea rows={2} placeholder="Describe this permission" />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]} initialValue="ACTIVE">
        <Select options={[{ label: 'Active', value: 'ACTIVE' }, { label: 'Inactive', value: 'INACTIVE' }]} />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
        <button onClick={onCancel} style={{ padding: '6px 16px', border: '1px solid #d9d7e8', borderRadius: 8, background: '#fff', color: '#43415a', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={loading} style={{ padding: '6px 16px', border: 'none', borderRadius: 8, background: '#6366f1', color: '#fff', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>{loading ? 'Creating...' : 'Create Privilege'}</button>
      </div>
    </Form>
  )
}

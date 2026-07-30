import { useState, useCallback } from 'react'
import { Card, Select, Input, Modal, notification, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { usePrivileges } from '../hooks/usePrivileges'
import { PrivilegeTable } from '../components/PrivilegeTable/PrivilegeTable'
import { PrivilegeForm } from '../components/PrivilegeForm/PrivilegeForm'
import { PrivilegeDetails } from '../components/PrivilegeDetails/PrivilegeDetails'
import type { Privilege, CreatePrivilegeRequest } from '../types/Privilege'
import { PRIVILEGE_MODULES } from '../mocks/privileges'

export function PrivilegesPage() {
  const { privileges, loading, filters, setFilters, createPrivilege, deletePrivilege } = usePrivileges()
  const [selected, setSelected] = useState<Privilege | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = useCallback(async (data: CreatePrivilegeRequest) => {
    setSubmitting(true)
    try {
      await createPrivilege(data)
      notification.success({ message: 'Privilege created', description: `${data.name} has been created.`, placement: 'topRight' })
      setCreateOpen(false)
    } catch { notification.error({ message: 'Failed to create privilege', placement: 'topRight' }) }
    setSubmitting(false)
  }, [createPrivilege])

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deletePrivilege(id)
      notification.success({ message: 'Privilege deleted', placement: 'topRight' })
      setSelected(null)
    } catch { notification.error({ message: 'Failed to delete privilege', placement: 'topRight' }) }
  }, [deletePrivilege])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#222137' }}>Privileges</h2>
          <p style={{ margin: '4px 0 0', color: '#8b899c', fontSize: 13 }}>Manage granular application permissions</p>
        </div>
        <button onClick={() => setCreateOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: 'none', borderRadius: 8, background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <PlusOutlined /> Create Privilege
        </button>
      </div>

      <Row gutter={20}>
        <Col span={selected ? 16 : 24}>
          <Card styles={{ body: { padding: 0 } }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0eff4', display: 'flex', gap: 12 }}>
              <Select
                placeholder="All modules"
                allowClear
                style={{ width: 180 }}
                value={filters.module || undefined}
                onChange={(v) => setFilters({ module: v ?? '' })}
                options={PRIVILEGE_MODULES.map(m => ({ label: m, value: m }))}
              />
              <Input.Search
                placeholder="Search permissions..."
                style={{ width: 240 }}
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                allowClear
              />
            </div>
            <PrivilegeTable
              privileges={privileges}
              loading={loading}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </Card>
        </Col>
        {selected && (
          <Col span={8}>
            <Card title={<span style={{ fontSize: 13 }}>Permission Details</span>} extra={<a onClick={() => setSelected(null)} style={{ fontSize: 12, cursor: 'pointer' }}>Close</a>}>
              <PrivilegeDetails privilege={selected} onDelete={handleDelete} />
            </Card>
          </Col>
        )}
      </Row>

      <Modal open={createOpen} title="Create Privilege" footer={null} onCancel={() => setCreateOpen(false)} destroyOnHidden width={520}>
        <PrivilegeForm loading={submitting} onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} />
      </Modal>
    </div>
  )
}

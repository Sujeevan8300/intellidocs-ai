import { useState, useCallback } from 'react'
import { Card, Row, Col, Modal, notification, Form, Tag, Badge, Button, Input, Space, Descriptions } from 'antd'
import { PlusOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons'
import { useRoles } from '../hooks/useRoles'
import { RoleTable } from '../components/RoleTable/RoleTable'
import { RoleForm } from '../components/RoleForm/RoleForm'
import { PermissionMatrix } from '../components/PermissionMatrix/PermissionMatrix'
import { DeleteRoleDialog } from '../components/DeleteRoleDialog/DeleteRoleDialog'
import type { Role, CreateRoleRequest } from '../types/Role'

export function RolesPage() {
  const { roles, selectedRole, loading, createRole, updateRole, deleteRole, assignPrivileges, cloneRole, selectRole, clearSelected } = useRoles()
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [cloneOpen, setCloneOpen] = useState(false)
  const [cloneName, setCloneName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [privilegeOverride, setPrivilegeOverride] = useState<string[] | null>(null)
  const [isMatrixDirty, setIsMatrixDirty] = useState(false)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  const handleCreateSubmit = useCallback(async (values: { name: string; description: string; status: 'ACTIVE' | 'INACTIVE' }) => {
    setSubmitting(true)
    try {
      await createRole({ ...values, privileges: [] } as CreateRoleRequest)
      notification.success({ message: 'Role created', description: `${values.name} has been created.`, placement: 'topRight' })
      setCreateOpen(false)
      createForm.resetFields()
    } catch { notification.error({ message: 'Failed to create role', placement: 'topRight' }) }
    setSubmitting(false)
  }, [createRole, createForm])

  const handleEdit = useCallback((role: Role) => {
    selectRole(role.id)
    setEditOpen(true)
    setTimeout(() => {
      editForm.setFieldsValue({ name: role.name, description: role.description, status: role.status })
      setPrivilegeOverride(null)
      setIsMatrixDirty(false)
    }, 100)
  }, [selectRole, editForm])

  const handleEditSubmit = useCallback(async (values: { name: string; description: string; status: 'ACTIVE' | 'INACTIVE' }) => {
    if (!selectedRole) return
    setSubmitting(true)
    try {
      await updateRole(selectedRole.id, values)
      if (privilegeOverride && isMatrixDirty) await assignPrivileges(selectedRole.id, privilegeOverride)
      notification.success({ message: 'Role updated', description: `${values.name} has been updated.`, placement: 'topRight' })
      setEditOpen(false)
    } catch { notification.error({ message: 'Failed to update role', placement: 'topRight' }) }
    setSubmitting(false)
  }, [selectedRole, updateRole, assignPrivileges, privilegeOverride, isMatrixDirty])

  const handleDeleteClick = useCallback((id: number) => {
    setDeleteTarget(id)
    setDeleteOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return
    setSubmitting(true)
    try {
      await deleteRole(deleteTarget)
      notification.success({ message: 'Role deleted', placement: 'topRight' })
      setDeleteOpen(false)
      setDeleteTarget(null)
      if (selectedRole?.id === deleteTarget) clearSelected()
    } catch { notification.error({ message: 'Failed to delete role', placement: 'topRight' }) }
    setSubmitting(false)
  }, [deleteTarget, deleteRole, selectedRole, clearSelected])

  const handleCloneClick = useCallback((role: Role) => {
    setCloneName(`${role.name} (Copy)`)
    setCloneOpen(true)
    setDeleteTarget(role.id)
  }, [])

  const handleCloneConfirm = useCallback(async () => {
    if (!deleteTarget || !cloneName.trim()) return
    setSubmitting(true)
    try {
      await cloneRole(deleteTarget, cloneName.trim())
      notification.success({ message: 'Role cloned', description: `${cloneName} has been created.`, placement: 'topRight' })
      setCloneOpen(false)
    } catch { notification.error({ message: 'Failed to clone role', placement: 'topRight' }) }
    setSubmitting(false)
  }, [deleteTarget, cloneName, cloneRole])

  const handlePrivilegeChange = useCallback((privs: string[]) => {
    setPrivilegeOverride(privs)
    setIsMatrixDirty(true)
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#222137' }}>Roles</h2>
          <p style={{ margin: '4px 0 0', color: '#8b899c', fontSize: 13 }}>Manage user roles and their permissions</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setCreateOpen(true); createForm.resetFields() }}>Create Role</Button>
      </div>

      <Row gutter={20}>
        <Col span={selectedRole ? 16 : 24}>
          <Card styles={{ body: { padding: 0 } }}>
            <RoleTable
              roles={roles}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onClone={handleCloneClick}
              onSelect={(id) => selectRole(id)}
              selectedId={selectedRole?.id ?? null}
            />
          </Card>
        </Col>
        {selectedRole && (
          <Col span={8}>
            <Card
              title={<span style={{ fontSize: 13 }}>Role Details</span>}
              extra={<a onClick={clearSelected} style={{ fontSize: 12, cursor: 'pointer' }}>Close</a>}
            >
              <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
                <Descriptions.Item label="Name"><strong>{selectedRole.name}</strong></Descriptions.Item>
                <Descriptions.Item label="Description">{selectedRole.description}</Descriptions.Item>
                <Descriptions.Item label="Users">{selectedRole.usersCount}</Descriptions.Item>
                <Descriptions.Item label="Privileges">
                  <Tag color="purple">{selectedRole.privileges.length} permissions</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {selectedRole.status === 'ACTIVE' ? <Badge status="success" text="Active" /> : <Badge status="default" text="Inactive" />}
                </Descriptions.Item>
                <Descriptions.Item label="Created">{selectedRole.createdAt}</Descriptions.Item>
              </Descriptions>

              <Space>
                <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(selectedRole)}>Edit</Button>
                <Button size="small" icon={<CopyOutlined />} onClick={() => handleCloneClick(selectedRole)}>Clone</Button>
              </Space>

              <div style={{ marginTop: 16 }}>
                <strong style={{ fontSize: 12, color: '#43415a' }}>ASSIGNED PRIVILEGES</strong>
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {selectedRole.privileges.map(p => <code key={p} style={{ fontSize: 10, padding: '2px 6px', background: '#f5f3ff', borderRadius: 4, color: '#5b4ae4' }}>{p}</code>)}
                </div>
              </div>
            </Card>
          </Col>
        )}
      </Row>

      <Modal open={createOpen} title="Create Role" footer={null} onCancel={() => setCreateOpen(false)} destroyOnHidden width={520}>
        <RoleForm form={createForm} onSubmit={handleCreateSubmit} />
      </Modal>

      <Modal open={editOpen} title="Edit Role" footer={null} onCancel={() => setEditOpen(false)} destroyOnHidden width={700}>
        {selectedRole && (
          <>
            <RoleForm form={editForm} onSubmit={handleEditSubmit} />
            <div style={{ marginTop: 24, borderTop: '1px solid #f0eff4', paddingTop: 20 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#222137' }}>Privileges</h4>
              <PermissionMatrix
                selected={privilegeOverride ?? selectedRole.privileges}
                onChange={handlePrivilegeChange}
              />
            </div>
          </>
        )}
      </Modal>

      <DeleteRoleDialog
        open={deleteOpen}
        roleName={roles.find(r => r.id === deleteTarget)?.name ?? ''}
        loading={submitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteOpen(false)}
      />

      <Modal open={cloneOpen} title="Clone Role" onOk={handleCloneConfirm} onCancel={() => setCloneOpen(false)} okText="Clone" confirmLoading={submitting} destroyOnHidden>
        <p>Enter a name for the cloned role:</p>
        <Input value={cloneName} onChange={(e) => setCloneName(e.target.value)} placeholder="Role name" />
      </Modal>
    </div>
  )
}

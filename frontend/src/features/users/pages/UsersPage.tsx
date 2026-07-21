import { useState, useCallback } from 'react'
import { Button, Modal, notification, Select } from 'antd'
import { UserAddOutlined, SortAscendingOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useUsers } from '../hooks/useUsers'
import { useUserFilters } from '../hooks/useUserFilters'
import { useBulkSelection } from '../hooks/useBulkSelection'
import { useUserForm } from '../hooks/useUserForm'
import { SORT_OPTIONS } from '../constants/user.constants'
import { UserTable } from '../components/UserTable/UserTable'
import { UserCard } from '../components/UserCard/UserCard'
import { UserForm } from '../components/UserForm/UserForm'
import { UserProfileDrawer } from '../components/UserProfileDrawer/UserProfileDrawer'
import { DeleteUserDialog } from '../components/DeleteUserDialog/DeleteUserDialog'
import { ResetPasswordDialog } from '../components/ResetPasswordDialog/ResetPasswordDialog'
import { BulkActions } from '../components/BulkActions/BulkActions'
import { StatisticsCards } from '../components/StatisticsCards/StatisticsCards'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { UserFilters } from '../components/UserFilters/UserFilters'
import { PageSkeleton } from '../components/LoadingSkeleton/LoadingSkeleton'
import { createUser, updateUser, deleteUser, activateUser, deactivateUser, lockUser, unlockUser, resetPassword } from '../slices/userSlice'
import type { AppDispatch } from '../../../store'
import type { User } from '../types/User'
import type { UpdateUserRequest } from '../types/UserRequest'
import type { UserFormValues } from '../validators/user.schema'
import { useDispatch } from 'react-redux'

export function UsersPage() {
  const dispatch = useDispatch<AppDispatch>()

  const {
    users,
    loading,
    error,
    total,
    currentPage,
    pageSize,
    searchTerm,
    filters,
    sort,
    viewMode,
    selectedIds,
    submitting,
    setFilters: setSliceFilters,
    setSort,
    setViewMode,
    setCurrentPage,
    setSearchTerm,
    toggleSelectUser,
    selectAllUsers,
    clearSelection,
    refetch,
  } = useUsers()

  const {
    resetAllFilters,
  } = useUserFilters()

  const {
    selectedCount,
    bulkDelete,
    bulkActivate,
    bulkDeactivate,
    submitting: bulkSubmitting,
  } = useBulkSelection()

  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false)
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [resetUser, setResetUser] = useState<User | null>(null)

  const { form: createForm } = useUserForm({ mode: 'create' })
  const { form: editForm } = useUserForm({ mode: 'edit', initialData: editingUser ?? undefined })

  const activeForm = formMode === 'edit' ? editForm : createForm

  const handleCreate = useCallback(() => {
    setFormMode('create')
    setEditingUser(null)
    createForm.reset()
    setFormOpen(true)
  }, [createForm])

  const handleEdit = useCallback((user: User) => {
    setFormMode('edit')
    setEditingUser(user)
    editForm.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
      notes: user.notes,
    })
    setFormOpen(true)
    setProfileDrawerOpen(false)
  }, [editForm])

  const handleFormSubmit = useCallback(async (data: UserFormValues) => {
    if (formMode === 'create') {
      const result = await dispatch(createUser(data))
      if (createUser.fulfilled.match(result)) {
        notification.success({ message: 'User created', description: `${data.firstName} ${data.lastName} has been added.`, placement: 'topRight' })
        setFormOpen(false)
        createForm.reset()
      } else {
        notification.error({ message: 'Failed to create user', description: String(result.payload), placement: 'topRight' })
      }
    } else if (editingUser) {
      const result = await dispatch(updateUser({ id: editingUser.id, request: data as UpdateUserRequest }))
      if (updateUser.fulfilled.match(result)) {
        notification.success({ message: 'User updated', description: `${data.firstName} ${data.lastName} has been updated.`, placement: 'topRight' })
        setFormOpen(false)
        setEditingUser(null)
      } else {
        notification.error({ message: 'Failed to update user', description: String(result.payload), placement: 'topRight' })
      }
    }
  }, [formMode, editingUser, dispatch, createForm])

  const handleDelete = useCallback(async () => {
    if (!deletingUser) return
    const result = await dispatch(deleteUser(deletingUser.id))
    if (deleteUser.fulfilled.match(result)) {
      notification.success({ message: 'User deactivated', description: `${deletingUser.firstName} ${deletingUser.lastName} has been deactivated.`, placement: 'topRight' })
      setDeleteDialogOpen(false)
      setDeletingUser(null)
    } else {
      notification.error({ message: 'Failed to deactivate user', description: String(result.payload), placement: 'topRight' })
    }
  }, [dispatch, deletingUser])

  const handleResetPassword = useCallback(async () => {
    if (!resetUser) return
    const result = await dispatch(resetPassword(resetUser.id))
    if (resetPassword.fulfilled.match(result)) {
      notification.success({ message: 'Password reset email sent', description: `A reset link has been sent to ${resetUser.email}.`, placement: 'topRight' })
      setResetDialogOpen(false)
      setResetUser(null)
    } else {
      notification.error({ message: 'Failed to reset password', description: String(result.payload), placement: 'topRight' })
    }
  }, [dispatch, resetUser])

  const handleToggleStatus = useCallback(async (user: User) => {
    const action = user.status === 'ACTIVE' ? deactivateUser : activateUser
    const result = await dispatch(action(user.id))
    if (action.fulfilled.match(result)) {
      notification.success({
        message: user.status === 'ACTIVE' ? 'User deactivated' : 'User activated',
        description: `${user.firstName} ${user.lastName} has been ${user.status === 'ACTIVE' ? 'deactivated' : 'activated'}.`,
        placement: 'topRight',
      })
    }
  }, [dispatch])

  const handleLock = useCallback(async (user: User) => {
    const action = user.status === 'LOCKED' ? unlockUser : lockUser
    const result = await dispatch(action(user.id))
    if (action.fulfilled.match(result)) {
      notification.success({
        message: user.status === 'LOCKED' ? 'User unlocked' : 'User locked',
        description: `${user.firstName} ${user.lastName} has been ${user.status === 'LOCKED' ? 'unlocked' : 'locked'}.`,
        placement: 'topRight',
      })
    }
  }, [dispatch])

  const handleBulkExport = useCallback(() => {
    notification.info({ message: 'Export started', description: 'Mock export of selected users initiated.', placement: 'topRight' })
  }, [])

  const handleBulkActivate = useCallback(async () => {
    await bulkActivate()
    notification.success({ message: 'Users activated', description: 'Selected users have been activated.', placement: 'topRight' })
  }, [bulkActivate])

  const handleBulkDeactivate = useCallback(async () => {
    await bulkDeactivate()
    notification.success({ message: 'Users deactivated', description: 'Selected users have been deactivated.', placement: 'topRight' })
  }, [bulkDeactivate])

  const handleBulkDelete = useCallback(async () => {
    await bulkDelete()
    notification.success({ message: 'Users deleted', description: 'Selected users have been deactivated.', placement: 'topRight' })
  }, [bulkDelete])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [setCurrentPage])

  const handleSortChange = useCallback((value: string) => {
    setSort({ field: value, order: sort.order })
  }, [setSort, sort.order])

  const handleToggleSortOrder = useCallback(() => {
    setSort({ field: sort.field, order: sort.order === 'asc' ? 'desc' : 'asc' })
  }, [setSort, sort])

  if (error && !loading) {
    return (
      <div className="usr-page">
        <div className="usr-page-error">
          <p>Unable to load users. Please try again.</p>
          <Button onClick={refetch}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="usr-page">
      <div className="usr-page-header">
        <div className="usr-page-header-left">
          <h1 className="usr-page-title">Users</h1>
          <p className="usr-page-subtitle">Manage system users and their access</p>
        </div>
        <div className="usr-page-header-right">
          <Button type="primary" icon={<UserAddOutlined />} onClick={handleCreate} id="usr-add-user-btn">
            Add User
          </Button>
        </div>
      </div>

      <StatisticsCards />

      <div className="usr-toolbar-section">
        <div className="usr-toolbar-row">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="usr-toolbar-controls">
            <Select
              className="usr-sort-select"
              value={sort.field}
              onChange={handleSortChange}
              options={SORT_OPTIONS}
              aria-label="Sort by"
            />
            <Button icon={<SortAscendingOutlined />} onClick={handleToggleSortOrder} aria-label="Toggle sort order" />
            <div className="usr-view-toggle">
              <Button icon={<UnorderedListOutlined />} type={viewMode === 'table' ? 'primary' : 'text'} onClick={() => setViewMode('table')} aria-label="Table view" />
              <Button icon={<AppstoreOutlined />} type={viewMode === 'grid' ? 'primary' : 'text'} onClick={() => setViewMode('grid')} aria-label="Grid view" />
            </div>
          </div>
        </div>
        <UserFilters
          filters={filters}
          onFilterChange={setSliceFilters}
          onReset={resetAllFilters}
        />
      </div>

      <BulkActions
        selectedCount={selectedCount}
        onBulkActivate={handleBulkActivate}
        onBulkDeactivate={handleBulkDeactivate}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        onClearSelection={clearSelection}
        submitting={bulkSubmitting}
      />

      {loading ? (
        <PageSkeleton />
      ) : viewMode === 'table' ? (
        <UserTable
          users={users}
          loading={loading}
          selectedIds={selectedIds}
          onSelect={toggleSelectUser}
          onSelectAll={selectAllUsers}
          onView={(user) => { setProfileUser(user); setProfileDrawerOpen(true) }}
          onEdit={handleEdit}
          onDelete={(user) => { setDeletingUser(user); setDeleteDialogOpen(true) }}
          onToggleStatus={(id) => {
            const user = users.find((u: User) => u.id === id)
            if (user) handleToggleStatus(user)
          }}
          onLock={(user: User) => handleLock(user)}
          onResetPassword={(user) => { setResetUser(user); setResetDialogOpen(true) }}
          onUploadClick={handleCreate}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="usr-grid">
          {users.length === 0 ? (
            <div className="usr-empty-state">
              <p>No users found.</p>
              <Button type="primary" icon={<UserAddOutlined />} onClick={handleCreate}>Add User</Button>
            </div>
          ) : (
            users.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                onView={(u: User) => { setProfileUser(u); setProfileDrawerOpen(true) }}
                onEdit={handleEdit}
                onDelete={(u: User) => { setDeletingUser(u); setDeleteDialogOpen(true) }}
                onToggleStatus={(id) => {
                  const found = users.find((u: User) => u.id === id)
                  if (found) handleToggleStatus(found)
                }}
              />
            ))
          )}
        </div>
      )}

      <Modal
        open={formOpen}
        title={formMode === 'create' ? 'Create User' : 'Edit User'}
        footer={null}
        onCancel={() => { setFormOpen(false); setEditingUser(null) }}
        destroyOnHidden
        width={640}
        className="usr-form-modal"
      >
        <UserForm
          form={activeForm}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          onCancel={() => { setFormOpen(false); setEditingUser(null) }}
          mode={formMode}
        />
      </Modal>

      <UserProfileDrawer
        open={profileDrawerOpen}
        user={profileUser}
        onClose={() => { setProfileDrawerOpen(false); setProfileUser(null) }}
        onEdit={handleEdit}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        user={deletingUser}
        onConfirm={handleDelete}
        onCancel={() => { setDeleteDialogOpen(false); setDeletingUser(null) }}
        loading={submitting}
      />

      <ResetPasswordDialog
        open={resetDialogOpen}
        user={resetUser}
        onConfirm={handleResetPassword}
        onCancel={() => { setResetDialogOpen(false); setResetUser(null) }}
        loading={submitting}
      />
    </div>
  )
}

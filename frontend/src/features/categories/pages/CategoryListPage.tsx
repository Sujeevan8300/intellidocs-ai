import { useState } from 'react'
import { Button, Alert } from 'antd'
import { PlusOutlined, FolderOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import { useCategories } from '../hooks/useCategories'
import { useCategoryActions } from '../hooks/useCategoryActions'
import { CategoryTable } from '../components/CategoryTable/CategoryTable'
import { CategorySearch } from '../components/CategorySearch/CategorySearch'
import { CategoryFilters } from '../components/CategoryFilters/CategoryFilters'
import { CategoryModal } from '../components/CategoryModal/CategoryModal'
import { DeleteConfirmation } from '../components/DeleteConfirmation/DeleteConfirmation'
import { EmptyState } from '../components/EmptyState/EmptyState'
import type { Category } from '../types/Category'
import type { CategoryFormValues } from '../validators/category.schema'

export function CategoryListPage() {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const allCategories = useSelector((state: RootState) => state.categories.categories)

  const {
    categories,
    loading,
    error,
    searchTerm,
    filters,
    handleSearch,
    handleFilterChange,
    handleResetFilters,
    refetch,
  } = useCategories()

  const { handleCreate, handleUpdate, handleDelete, submitting } = useCategoryActions()

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Category | undefined>(undefined)

  // Role-based permissions
  const role = user?.role
  const canCreate = role === 'SUPER_ADMIN' || role === 'KNOWLEDGE_MANAGER'
  const canEdit = role === 'SUPER_ADMIN' || role === 'KNOWLEDGE_MANAGER'
  const canDelete = role === 'SUPER_ADMIN'

  // Handlers
  const openCreateModal = () => {
    setEditingCategory(undefined)
    setModalOpen(true)
  }

  const openEditModal = (category: Category) => {
    setEditingCategory(category)
    setModalOpen(true)
  }

  const handleModalSubmit = async (values: CategoryFormValues) => {
    const request = {
      name: values.name,
      description: values.description ?? '',
      parentId: values.parentId ?? undefined,
      status: values.status,
    }
    const ok = editingCategory
      ? await handleUpdate(editingCategory.id, request)
      : await handleCreate(request)
    if (ok) setModalOpen(false)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    const ok = await handleDelete(deleteTarget.id, deleteTarget.name)
    if (ok) setDeleteTarget(undefined)
  }

  if (error && !loading) {
    return (
      <div className="cat-page">
        <Alert
          type="error"
          message="Unable to load categories"
          description="Please check your connection and try again."
          action={
            <Button size="small" onClick={refetch}>
              Try Again
            </Button>
          }
          showIcon
        />
      </div>
    )
  }

  return (
    <div className="cat-page">
      {/* Page Header */}
      <div className="cat-page-header">
        <div className="cat-page-header-left">
          <div className="cat-page-eyebrow">
            <FolderOutlined /> KNOWLEDGE BASE
          </div>
          <h1 className="cat-page-title">Categories</h1>
          <p className="cat-page-subtitle">
            Organise your documents into structured knowledge categories
          </p>
        </div>
        {canCreate && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
            size="large"
            id="add-category-btn"
            className="cat-add-btn"
          >
            Add Category
          </Button>
        )}
      </div>

      {/* Toolbar */}
      <div className="cat-toolbar">
        <div className="cat-toolbar-search">
          <CategorySearch value={searchTerm} onChange={handleSearch} />
        </div>
        <CategoryFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* Stats row */}
      {!loading && (
        <div className="cat-stats-row">
          <span className="cat-stats-text">
            Showing <strong>{categories.length}</strong> of <strong>{allCategories.length}</strong>{' '}
            categories
          </span>
        </div>
      )}

      {/* Table (or full empty state) */}
      {!loading && allCategories.length === 0 ? (
        <div className="cat-full-empty">
          <EmptyState canCreate={canCreate} onCreateClick={openCreateModal} />
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          loading={loading}
          canCreate={canCreate}
          canEdit={canEdit}
          canDelete={canDelete}
          onView={(cat) => navigate(`/categories/${cat.id}`)}
          onEdit={openEditModal}
          onDelete={(cat) => setDeleteTarget(cat)}
          onCreateClick={openCreateModal}
        />
      )}

      {/* Mobile card grid */}
      <div className="cat-card-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cat-card"
            onClick={() => navigate(`/categories/${cat.id}`)}
            role="button"
            tabIndex={0}
          >
            <div className="cat-card__header">
              <div className="cat-card__icon">
                <FolderOutlined />
              </div>
              <span className={`cat-status-badge cat-status-badge--${cat.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                <span className="cat-status-dot" />
                {cat.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h4 className="cat-card__name">{cat.name}</h4>
            <p className="cat-card__desc">
              {cat.description?.length > 80 ? `${cat.description.slice(0, 80)}…` : cat.description}
            </p>
            <div className="cat-card__footer">
              <span className="cat-card__count">{cat.documentCount} documents</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      <CategoryModal
        open={modalOpen}
        mode={editingCategory ? 'edit' : 'create'}
        initialData={editingCategory}
        categories={allCategories}
        submitting={submitting}
        onSubmit={handleModalSubmit}
        onCancel={() => setModalOpen(false)}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={!!deleteTarget}
        categoryName={deleteTarget?.name ?? ''}
        loading={submitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(undefined)}
      />
    </div>
  )
}

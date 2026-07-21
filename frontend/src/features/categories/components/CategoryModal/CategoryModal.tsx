import { Modal } from 'antd'
import { useEffect } from 'react'
import { CategoryForm } from '../CategoryForm/CategoryForm'
import { useCategoryForm } from '../../hooks/useCategoryForm'
import type { CategoryFormValues } from '../../validators/category.schema'
import type { Category } from '../../types/Category'

interface CategoryModalProps {
  open: boolean
  mode: 'create' | 'edit'
  initialData?: Category
  categories: Category[]
  submitting: boolean
  onSubmit: (values: CategoryFormValues) => void
  onCancel: () => void
}

export function CategoryModal({
  open,
  mode,
  initialData,
  categories,
  submitting,
  onSubmit,
  onCancel,
}: CategoryModalProps) {
  const { form } = useCategoryForm({ initialData })

  // Reset form whenever the modal opens with new data
  useEffect(() => {
    if (open) {
      form.reset({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        parentId: initialData?.parentId ?? null,
        status: initialData?.status ?? ('ACTIVE' as const),
      })
    }
  }, [open, initialData, form])

  const handleCancel = () => {
    form.reset()
    onCancel()
  }

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      width={560}
      title={
        <div className="cat-modal-header">
          <div className="cat-modal-title">
            {mode === 'create' ? 'Create Category' : 'Edit Category'}
          </div>
          <div className="cat-modal-subtitle">
            {mode === 'create'
              ? 'Add a new category to organise your knowledge base'
              : `Editing "${initialData?.name}"`}
          </div>
        </div>
      }
      className="cat-modal"
      destroyOnHidden
      closable={!submitting}
      maskClosable={!submitting}
    >
      <CategoryForm
        form={form}
        onSubmit={onSubmit}
        categories={categories}
        editingId={initialData?.id}
        submitting={submitting}
        onCancel={handleCancel}
      />
    </Modal>
  )
}

import { Form, Input, Select, Button } from 'antd'
import { Controller } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import type { CategoryFormValues } from '../../validators/category.schema'
import { CategoryStatus } from '../../types/Category'
import type { Category } from '../../types/Category'

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormValues>
  onSubmit: (values: CategoryFormValues) => void
  categories: Category[]
  editingId?: number
  submitting: boolean
  onCancel: () => void
}

export function CategoryForm({
  form,
  onSubmit,
  categories,
  editingId,
  submitting,
  onCancel,
}: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const nameValue = watch('name')
  const descValue = watch('description') ?? ''

  const parentOptions = categories
    .filter((c) => c.id !== editingId)
    .map((c) => ({ label: c.name, value: c.id }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cat-form" noValidate>
      {/* Category Name */}
      <Form.Item
        label="Category Name"
        required
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name?.message}
        className="cat-form-item"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="category-name"
              placeholder="e.g. HR Policies"
              maxLength={100}
              showCount
              size="large"
            />
          )}
        />
        {!errors.name && nameValue?.length >= 3 && (
          <div className="cat-form-char-hint">{nameValue.length}/100</div>
        )}
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
        className="cat-form-item"
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              id="category-description"
              placeholder="Describe this category's purpose..."
              maxLength={500}
              showCount
              rows={3}
              size="large"
            />
          )}
        />
        <div className="cat-form-char-hint">{descValue.length}/500</div>
      </Form.Item>

      {/* Parent Category */}
      <Form.Item
        label="Parent Category"
        className="cat-form-item"
        extra="Optional – assign to a parent category to create a hierarchy"
      >
        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id="category-parent"
              placeholder="Select parent category (optional)"
              options={parentOptions}
              allowClear
              size="large"
              onChange={(val) => field.onChange(val ?? null)}
            />
          )}
        />
      </Form.Item>

      {/* Status */}
      <Form.Item
        label="Status"
        required
        validateStatus={errors.status ? 'error' : ''}
        help={errors.status?.message}
        className="cat-form-item"
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id="category-status"
              size="large"
              options={[
                { label: 'Active', value: CategoryStatus.ACTIVE },
                { label: 'Inactive', value: CategoryStatus.INACTIVE },
              ]}
            />
          )}
        />
      </Form.Item>

      {/* Actions */}
      <div className="cat-form-actions">
        <Button onClick={onCancel} disabled={submitting} size="large" id="form-cancel-btn">
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          size="large"
          id="form-submit-btn"
        >
          {editingId ? 'Save Changes' : 'Create Category'}
        </Button>
      </div>
    </form>
  )
}

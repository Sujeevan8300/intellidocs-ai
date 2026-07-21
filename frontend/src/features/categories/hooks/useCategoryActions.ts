import { useSelector, useDispatch } from 'react-redux'
import { App } from 'antd'
import type { RootState, AppDispatch } from '../../../store'
import {
  createCategory as createCategoryThunk,
  updateCategory as updateCategoryThunk,
  deleteCategory as deleteCategoryThunk,
} from '../slices/categorySlice'
import type { CategoryRequest } from '../types/Category'

export function useCategoryActions() {
  const dispatch = useDispatch<AppDispatch>()
  const { notification } = App.useApp()
  const submitting = useSelector((state: RootState) => state.categories.submitting)

  const handleCreate = async (request: CategoryRequest): Promise<boolean> => {
    const result = await dispatch(createCategoryThunk(request))
    if (createCategoryThunk.fulfilled.match(result)) {
      notification.success({
        message: 'Category created',
        description: `"${result.payload.name}" has been added to the knowledge base.`,
        placement: 'topRight',
      })
      return true
    } else {
      notification.error({
        message: 'Failed to create category',
        description: 'Something went wrong. Please try again.',
        placement: 'topRight',
      })
      return false
    }
  }

  const handleUpdate = async (id: number, request: CategoryRequest): Promise<boolean> => {
    const result = await dispatch(updateCategoryThunk({ id, request }))
    if (updateCategoryThunk.fulfilled.match(result)) {
      notification.success({
        message: 'Category updated',
        description: `"${result.payload.name}" has been saved successfully.`,
        placement: 'topRight',
      })
      return true
    } else {
      notification.error({
        message: 'Failed to update category',
        description: 'Something went wrong. Please try again.',
        placement: 'topRight',
      })
      return false
    }
  }

  const handleDelete = async (id: number, name: string): Promise<boolean> => {
    const result = await dispatch(deleteCategoryThunk(id))
    if (deleteCategoryThunk.fulfilled.match(result)) {
      notification.success({
        message: 'Category deleted',
        description: `"${name}" has been removed.`,
        placement: 'topRight',
      })
      return true
    } else {
      notification.error({
        message: 'Failed to delete category',
        description: 'Something went wrong. Please try again.',
        placement: 'topRight',
      })
      return false
    }
  }

  return { handleCreate, handleUpdate, handleDelete, submitting }
}

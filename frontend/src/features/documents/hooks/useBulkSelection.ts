import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { App } from 'antd'
import type { RootState, AppDispatch } from '../../../store'
import {
  toggleSelectDocument,
  selectAllDocuments,
  clearSelection,
  bulkDeleteDocuments,
  bulkUpdateCategory,
} from '../slices/documentSlice'

export function useBulkSelection() {
  const dispatch = useDispatch<AppDispatch>()
  const { notification } = App.useApp()
  const { selectedIds, documents, submitting } = useSelector(
    (state: RootState) => state.documents,
  )

  const isSelected = useCallback(
    (id: number) => selectedIds.includes(id),
    [selectedIds],
  )

  const toggleSelect = useCallback(
    (id: number) => dispatch(toggleSelectDocument(id)),
    [dispatch],
  )

  const selectAll = useCallback(() => {
    const allIds = documents.map((d) => d.id)
    if (selectedIds.length === allIds.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAllDocuments(allIds))
    }
  }, [dispatch, documents, selectedIds])

  const clearAll = useCallback(() => dispatch(clearSelection()), [dispatch])

  const bulkDelete = useCallback(async () => {
    if (selectedIds.length === 0) return
    const result = await dispatch(bulkDeleteDocuments(selectedIds))
    if (bulkDeleteDocuments.fulfilled.match(result)) {
      notification.success({
        message: 'Documents deleted',
        description: `${result.payload.length} documents have been deleted.`,
        placement: 'topRight',
      })
    }
  }, [dispatch, selectedIds, notification])

  const bulkChangeCategory = useCallback(
    async (category: string) => {
      if (selectedIds.length === 0) return
      const result = await dispatch(bulkUpdateCategory({ ids: selectedIds, category }))
      if (bulkUpdateCategory.fulfilled.match(result)) {
        notification.success({
          message: 'Category updated',
          description: `${result.payload.ids.length} documents moved to "${category}".`,
          placement: 'topRight',
        })
      }
    },
    [dispatch, selectedIds, notification],
  )

  return {
    selectedIds,
    selectedCount: selectedIds.length,
    isSelected,
    toggleSelect,
    selectAll,
    clearAll,
    bulkDelete,
    bulkChangeCategory,
    submitting,
  }
}

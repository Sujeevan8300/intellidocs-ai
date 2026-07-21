import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { toggleSelectUser, selectAllUsers, clearSelection, bulkDeleteUsers, bulkActivateUsers, bulkDeactivateUsers } from '../slices/userSlice'

export function useBulkSelection() {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedIds } = useSelector((state: RootState) => state.users)
  const [submitting, setSubmitting] = useState(false)

  const selectedCount = selectedIds.length
  const isSelected = useCallback((id: number) => selectedIds.includes(id), [selectedIds])

  const toggleUser = (id: number) => dispatch(toggleSelectUser(id))
  const selectAll = () => dispatch(selectAllUsers())
  const clear = () => dispatch(clearSelection())

  const bulkDelete = async () => {
    setSubmitting(true)
    try { await dispatch(bulkDeleteUsers(selectedIds)).unwrap() } finally { setSubmitting(false) }
  }
  const bulkActivate = async () => {
    setSubmitting(true)
    try { await dispatch(bulkActivateUsers(selectedIds)).unwrap() } finally { setSubmitting(false) }
  }
  const bulkDeactivate = async () => {
    setSubmitting(true)
    try { await dispatch(bulkDeactivateUsers(selectedIds)).unwrap() } finally { setSubmitting(false) }
  }

  return { selectedIds, selectedCount, isSelected, toggleUser, selectAll, clearSelection: clear, bulkDelete, bulkActivate, bulkDeactivate, submitting }
}

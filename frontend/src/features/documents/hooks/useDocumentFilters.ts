import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { setFilters, resetFilters, setSort, setViewMode } from '../slices/documentSlice'
import type { DocumentFilter, DocumentSort, ViewMode } from '../types/Document'
import { DEFAULT_FILTERS } from '../constants/document.constants'

export function useDocumentFilters() {
  const dispatch = useDispatch<AppDispatch>()
  const { filters, sort, viewMode, searchTerm } = useSelector(
    (state: RootState) => state.documents,
  )

  const hasActiveFilters =
    filters.status !== DEFAULT_FILTERS.status ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.fileType !== DEFAULT_FILTERS.fileType ||
    filters.uploadedBy !== DEFAULT_FILTERS.uploadedBy ||
    filters.dateRange !== DEFAULT_FILTERS.dateRange ||
    filters.favoritesOnly !== DEFAULT_FILTERS.favoritesOnly ||
    filters.aiReadyOnly !== DEFAULT_FILTERS.aiReadyOnly

  const handleFilterChange = (partial: Partial<DocumentFilter>) => dispatch(setFilters(partial))
  const handleResetFilters = () => dispatch(resetFilters())
  const handleSortChange = (s: DocumentSort) => dispatch(setSort(s))
  const handleViewModeChange = (mode: ViewMode) => dispatch(setViewMode(mode))

  return {
    filters,
    sort,
    viewMode,
    searchTerm,
    hasActiveFilters,
    handleFilterChange,
    handleResetFilters,
    handleSortChange,
    handleViewModeChange,
  }
}

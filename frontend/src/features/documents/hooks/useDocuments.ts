import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import {
  fetchDocuments,
  setSearchTerm,
  setFilters,
  resetFilters,
  setSort,
  setPage,
  toggleFavorite,
} from '../slices/documentSlice'
import { filterAndSortDocuments } from '../utils/documentUtils'
import type { DocumentFilter, DocumentSort } from '../types/Document'

export function useDocuments() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    documents,
    loading,
    error,
    searchTerm,
    filters,
    sort,
    currentPage,
    pageSize,
  } = useSelector((state: RootState) => state.documents)

  useEffect(() => {
    if (documents.length === 0 && !loading) {
      dispatch(fetchDocuments())
    }
  }, [dispatch, documents.length, loading])

  const filtered = useMemo(
    () => filterAndSortDocuments(documents, searchTerm, filters, sort),
    [documents, searchTerm, filters, sort],
  )

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSearch = (term: string) => dispatch(setSearchTerm(term))
  const handleFilterChange = (partial: Partial<DocumentFilter>) => dispatch(setFilters(partial))
  const handleResetFilters = () => dispatch(resetFilters())
  const handleSort = (s: DocumentSort) => dispatch(setSort(s))
  const handlePageChange = (page: number) => dispatch(setPage(page))
  const handleToggleFavorite = (id: number) => dispatch(toggleFavorite(id))
  const refetch = () => dispatch(fetchDocuments())

  return {
    documents: paginated,
    allDocuments: filtered,
    totalCount: filtered.length,
    loading,
    error,
    searchTerm,
    filters,
    sort,
    currentPage,
    pageSize,
    totalPages,
    handleSearch,
    handleFilterChange,
    handleResetFilters,
    handleSort,
    handlePageChange,
    handleToggleFavorite,
    refetch,
  }
}

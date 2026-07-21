import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { fetchCategories, setSearchTerm, setFilters, resetFilters } from '../slices/categorySlice'
import { filterCategories } from '../utils/categoryFormatter'
import type { CategoryFilter } from '../types/CategoryFilter'

export function useCategories() {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading, error, searchTerm, filters } = useSelector(
    (state: RootState) => state.categories,
  )

  useEffect(() => {
    if (categories.length === 0 && !loading) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories.length, loading])

  const filteredCategories = filterCategories(categories, searchTerm, filters)

  const handleSearch = (term: string) => dispatch(setSearchTerm(term))
  const handleFilterChange = (partial: Partial<CategoryFilter>) => dispatch(setFilters(partial))
  const handleResetFilters = () => dispatch(resetFilters())
  const refetch = () => dispatch(fetchCategories())

  return {
    categories: filteredCategories,
    totalCount: categories.length,
    loading,
    error,
    searchTerm,
    filters,
    handleSearch,
    handleFilterChange,
    handleResetFilters,
    refetch,
  }
}

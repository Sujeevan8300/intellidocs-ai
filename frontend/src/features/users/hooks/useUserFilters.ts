import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import { setSearchTerm, setFilters, setSort, setViewMode, resetFilters } from '../slices/userSlice'
import type { UserFilter, UserSort, ViewMode } from '../constants/user.constants'

export function useUserFilters() {
  const dispatch = useDispatch<AppDispatch>()
  const { searchTerm, filters, sort, viewMode } = useSelector((state: RootState) => state.users)

  return {
    searchTerm,
    filters,
    sort,
    viewMode,
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term)),
    setFilters: (f: Partial<UserFilter>) => dispatch(setFilters(f)),
    setSort: (s: UserSort) => dispatch(setSort(s)),
    setViewMode: (mode: ViewMode) => dispatch(setViewMode(mode)),
    setStatusFilter: (status: string) => dispatch(setFilters({ status })),
    setRoleFilter: (role: string) => dispatch(setFilters({ role })),
    setDepartmentFilter: (dept: string) => dispatch(setFilters({ department: dept })),
    setLoginStatusFilter: (ls: string) => dispatch(setFilters({ loginStatus: ls })),
    setDateRangeFilter: (dr: string) => dispatch(setFilters({ dateRange: dr })),
    setSortField: (field: string) => dispatch(setSort({ ...sort, field })),
    setSortOrder: (order: 'asc' | 'desc') => dispatch(setSort({ ...sort, order })),
    toggleSortOrder: () => dispatch(setSort({ ...sort, order: sort.order === 'asc' ? 'desc' : 'asc' })),
    resetAllFilters: () => dispatch(resetFilters()),
  }
}

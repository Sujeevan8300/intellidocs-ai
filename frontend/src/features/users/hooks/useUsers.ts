import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store'
import {
  fetchUsers, fetchUserStats,
  setSearchTerm, setFilters, setSort, setViewMode,
  setCurrentPage, setPageSize, toggleSelectUser, selectAllUsers, clearSelection
} from '../slices/userSlice'
import type { UserFilter, UserSort, ViewMode } from '../constants/user.constants'

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers({
      page: state.currentPage,
      pageSize: state.pageSize,
      search: state.searchTerm,
      filters: state.filters,
      sort: state.sort,
    }))
  }, [dispatch, state.currentPage, state.pageSize, state.searchTerm, state.filters, state.sort])

  useEffect(() => {
    dispatch(fetchUserStats())
  }, [dispatch])

  const refetch = useCallback(() => {
    dispatch(fetchUsers({
      page: state.currentPage,
      pageSize: state.pageSize,
      search: state.searchTerm,
      filters: state.filters,
      sort: state.sort,
    }))
  }, [dispatch, state.currentPage, state.pageSize, state.searchTerm, state.filters, state.sort])

  return {
    ...state,
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term)),
    setFilters: (filters: Partial<UserFilter>) => dispatch(setFilters(filters)),
    setSort: (sort: UserSort) => dispatch(setSort(sort)),
    setViewMode: (mode: ViewMode) => dispatch(setViewMode(mode)),
    setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    setPageSize: (size: number) => dispatch(setPageSize(size)),
    toggleSelectUser: (id: number) => dispatch(toggleSelectUser(id)),
    selectAllUsers: () => dispatch(selectAllUsers()),
    clearSelection: () => dispatch(clearSelection()),
    refetch,
  }
}

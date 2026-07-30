import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store'
import { fetchPrivileges, createPrivilege as createPrivilegeThunk, deletePrivilege as deletePrivilegeThunk, setPrivilegeFilters } from '../slices/privilegeSlice'

export function usePrivileges() {
  const dispatch = useDispatch<AppDispatch>()
  const { privileges, loading, filters } = useSelector((s: RootState) => s.privileges)

  useEffect(() => {
    dispatch(fetchPrivileges())
  }, [dispatch])

  const filtered = useMemo(() => {
    let result = privileges
    if (filters.module) result = result.filter(p => p.module === filters.module)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return result
  }, [privileges, filters])

  const setFilters = useCallback((partial: Partial<typeof filters>) => {
    dispatch(setPrivilegeFilters(partial))
  }, [dispatch])

  const createPrivilege = useCallback(async (data: Parameters<typeof createPrivilegeThunk>[0]) => {
    return dispatch(createPrivilegeThunk(data)).unwrap()
  }, [dispatch])

  const deletePrivilege = useCallback(async (id: number) => {
    return dispatch(deletePrivilegeThunk(id)).unwrap()
  }, [dispatch])

  return { privileges: filtered, loading, filters, setFilters, createPrivilege, deletePrivilege, refetch: () => dispatch(fetchPrivileges()) }
}

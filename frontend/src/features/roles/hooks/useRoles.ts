import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store'
import { fetchRoles, createRole as createRoleThunk, updateRole as updateRoleThunk, deleteRole as deleteRoleThunk, assignPrivileges as assignPrivilegesThunk, cloneRole as cloneRoleThunk, selectRole, clearSelected } from '../slices/roleSlice'

export function useRoles() {
  const dispatch = useDispatch<AppDispatch>()
  const { roles, selectedRole, loading } = useSelector((s: RootState) => s.roles)

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const createRole = useCallback((data: Parameters<typeof createRoleThunk>[0]) => dispatch(createRoleThunk(data)).unwrap(), [dispatch])
  const updateRole = useCallback((id: number, data: Parameters<typeof updateRoleThunk>[0]['data']) => dispatch(updateRoleThunk({ id, data })).unwrap(), [dispatch])
  const deleteRole = useCallback((id: number) => dispatch(deleteRoleThunk(id)).unwrap(), [dispatch])
  const assignPrivileges = useCallback((id: number, privileges: string[]) => dispatch(assignPrivilegesThunk({ id, privileges })).unwrap(), [dispatch])
  const cloneRole = useCallback((id: number, name: string) => dispatch(cloneRoleThunk({ id, name })).unwrap(), [dispatch])

  return { roles, selectedRole, loading, createRole, updateRole, deleteRole, assignPrivileges, cloneRole, selectRole: (id: number) => dispatch(selectRole(id)), clearSelected: () => dispatch(clearSelected()) }
}

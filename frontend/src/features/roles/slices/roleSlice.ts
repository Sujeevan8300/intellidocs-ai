import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RoleState } from '../types/Role'
import { roleService } from '../api'

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
}

export const fetchRoles = createAsyncThunk('roles/fetchAll', async () => {
  return roleService.getRoles()
})

export const createRole = createAsyncThunk('roles/create', async (data: import('../types/Role').CreateRoleRequest) => {
  return roleService.createRole(data)
})

export const updateRole = createAsyncThunk('roles/update', async ({ id, data }: { id: number; data: import('../types/Role').UpdateRoleRequest }) => {
  return roleService.updateRole(id, data)
})

export const deleteRole = createAsyncThunk('roles/delete', async (id: number) => {
  await roleService.deleteRole(id)
  return id
})

export const assignPrivileges = createAsyncThunk('roles/assignPrivileges', async ({ id, privileges }: { id: number; privileges: string[] }) => {
  return roleService.assignPrivileges(id, privileges)
})

export const cloneRole = createAsyncThunk('roles/clone', async ({ id, name }: { id: number; name: string }) => {
  return roleService.cloneRole(id, name)
})

const roleSlice = createSlice({
  name: 'roles', initialState,
  reducers: {
    selectRole(state, action: PayloadAction<number>) {
      state.selectedRole = state.roles.find(r => r.id === action.payload) ?? null
    },
    clearSelected(state) {
      state.selectedRole = null
    },
  },
  extraReducers: (b) => {
    const setLoading = (s: RoleState) => { s.loading = true; s.error = null }
    const setError = (s: RoleState, a: { error?: { message?: string } }) => { s.loading = false; s.error = a.error?.message ?? null }

    b.addCase(fetchRoles.pending, setLoading)
    b.addCase(fetchRoles.fulfilled, (s, a) => { s.loading = false; s.roles = a.payload })
    b.addCase(fetchRoles.rejected, setError)

    b.addCase(createRole.fulfilled, (s, a) => { s.roles.push(a.payload) })
    b.addCase(updateRole.fulfilled, (s, a) => {
      const idx = s.roles.findIndex(r => r.id === a.payload.id)
      if (idx !== -1) s.roles[idx] = a.payload
      if (s.selectedRole?.id === a.payload.id) s.selectedRole = a.payload
    })
    b.addCase(deleteRole.fulfilled, (s, a) => { s.roles = s.roles.filter(r => r.id !== a.payload) })
    b.addCase(assignPrivileges.fulfilled, (s, a) => {
      const idx = s.roles.findIndex(r => r.id === a.payload.id)
      if (idx !== -1) s.roles[idx] = a.payload
      if (s.selectedRole?.id === a.payload.id) s.selectedRole = a.payload
    })
    b.addCase(cloneRole.fulfilled, (s, a) => { s.roles.push(a.payload) })
  },
})

export const { selectRole, clearSelected } = roleSlice.actions
export default roleSlice.reducer

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { PrivilegeState } from '../types/Privilege'
import { privilegeService } from '../api'

const initialState: PrivilegeState = {
  privileges: [],
  loading: false,
  error: null,
  filters: { module: '', search: '' },
}

export const fetchPrivileges = createAsyncThunk('privileges/fetchAll', async () => {
  return privilegeService.getPrivileges()
})

export const createPrivilege = createAsyncThunk('privileges/create', async (data: import('../types/Privilege').CreatePrivilegeRequest) => {
  return privilegeService.createPrivilege(data)
})

export const deletePrivilege = createAsyncThunk('privileges/delete', async (id: number) => {
  await privilegeService.deletePrivilege(id)
  return id
})

const privilegeSlice = createSlice({
  name: 'privileges', initialState,
  reducers: {
    setPrivilegeFilters(state, action: PayloadAction<Partial<PrivilegeState['filters']>>) {
      Object.assign(state.filters, action.payload)
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchPrivileges.pending, (s) => { s.loading = true; s.error = null })
    b.addCase(fetchPrivileges.fulfilled, (s, a) => { s.loading = false; s.privileges = a.payload })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    b.addCase(fetchPrivileges.rejected, (s, a: any) => { s.loading = false; s.error = a.error?.message ?? null })
  },
})

export const { setPrivilegeFilters } = privilegeSlice.actions
export default privilegeSlice.reducer

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CurrentUser } from '../types/auth'
import { Permissions } from '../constants/permissions'

interface AuthState { user: CurrentUser | null }

const initialState: AuthState = {
  user: {
    id: 'usr_01', name: 'Alex Morgan', email: 'alex@intellidocs.ai', role: 'KNOWLEDGE_MANAGER', initials: 'AM',
    permissions: [Permissions.documentCreate, Permissions.analyticsRead],
  },
}

const authSlice = createSlice({
  name: 'auth', initialState,
  reducers: { setUser: (state, action: PayloadAction<CurrentUser | null>) => { state.user = action.payload } },
})
export const { setUser } = authSlice.actions
export default authSlice.reducer

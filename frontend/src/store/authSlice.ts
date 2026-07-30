import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { CurrentUser, LoginRequest, RegisterRequest } from '../types/auth'
import { mockLogin, mockRegister } from '../features/auth/api/mockAuth.service'

interface AuthState {
  user: CurrentUser | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk('auth/login', async (data: LoginRequest, { rejectWithValue }) => {
  try {
    const res = await mockLogin(data)
    return res
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

export const registerUser = createAsyncThunk('auth/register', async (data: RegisterRequest, { rejectWithValue }) => {
  try {
    const res = await mockRegister(data)
    return res
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await new Promise(r => setTimeout(r, 400))
})

const authSlice = createSlice({
  name: 'auth', initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending, (s) => { s.loading = true; s.error = null })
    b.addCase(loginUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.isAuthenticated = true })
    b.addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
    b.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null })
    b.addCase(registerUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.isAuthenticated = true })
    b.addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
    b.addCase(logoutUser.pending, (s) => { s.loading = true })
    b.addCase(logoutUser.fulfilled, (s) => { s.user = null; s.isAuthenticated = false; s.loading = false; s.error = null })
    b.addCase(logoutUser.rejected, (s) => { s.loading = false })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer

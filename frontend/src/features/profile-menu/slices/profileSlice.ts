import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile, ProfileState } from '../types/UserProfile'
import { profileService } from '../api'

const initialState: ProfileState = {
  user: null,
  loading: false,
  authenticated: true,
  error: undefined,
}

export const fetchProfile = createAsyncThunk(
  'profile/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await profileService.getCurrentUser()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const logoutUser = createAsyncThunk(
  'profile/logout',
  async (_, { rejectWithValue }) => {
    try {
      await profileService.logout()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload
    },
    clearError: (state) => {
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.authenticated = true
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.authenticated = false
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setUser, clearError } = profileSlice.actions
export default profileSlice.reducer

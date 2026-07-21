import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { mockUserService } from '../api/mockUser.service'
import { DEFAULT_FILTERS, DEFAULT_SORT, DEFAULT_PAGE_SIZE } from '../constants/user.constants'
import type { UserFilter, UserSort, ViewMode } from '../constants/user.constants'
import type { User } from '../types/User'
import type { CreateUserRequest, UpdateUserRequest } from '../types/UserRequest'
import type { UserStats } from '../types/UserResponse'

export interface UserState {
  users: User[]
  selectedUser: User | undefined
  selectedIds: number[]
  loading: boolean
  submitting: boolean
  searchTerm: string
  filters: UserFilter
  sort: UserSort
  viewMode: ViewMode
  currentPage: number
  pageSize: number
  total: number
  stats: UserStats
  error: string | undefined
}

const initialState: UserState = {
  users: [],
  selectedUser: undefined,
  selectedIds: [],
  loading: false,
  submitting: false,
  searchTerm: '',
  filters: DEFAULT_FILTERS,
  sort: DEFAULT_SORT,
  viewMode: 'table',
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  stats: { total: 0, active: 0, inactive: 0, locked: 0, online: 0 },
  error: undefined,
}

interface FetchUsersParams {
  page: number
  pageSize: number
  search: string
  filters: UserFilter
  sort: UserSort
}

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      return await mockUserService.getUsers(
        params.page,
        params.pageSize,
        params.search,
        params.filters,
        params.sort,
      )
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockUserService.getUserById(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const createUser = createAsyncThunk(
  'users/create',
  async (request: CreateUserRequest, { rejectWithValue }) => {
    try {
      return await mockUserService.createUser(request)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, request }: { id: number; request: UpdateUserRequest }, { rejectWithValue }) => {
    try {
      return await mockUserService.updateUser(id, request)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await mockUserService.deleteUser(id)
      return id
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const activateUser = createAsyncThunk(
  'users/activate',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockUserService.activateUser(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const deactivateUser = createAsyncThunk(
  'users/deactivate',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockUserService.deactivateUser(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const lockUser = createAsyncThunk(
  'users/lock',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockUserService.lockUser(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const unlockUser = createAsyncThunk(
  'users/unlock',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockUserService.unlockUser(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (id: number, { rejectWithValue }) => {
    try {
      await mockUserService.resetPassword(id)
      return id
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const fetchUserStats = createAsyncThunk(
  'users/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await mockUserService.getStats()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const bulkDeleteUsers = createAsyncThunk(
  'users/bulkDelete',
  async (ids: number[], { rejectWithValue }) => {
    try {
      await mockUserService.bulkDelete(ids)
      return ids
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const bulkActivateUsers = createAsyncThunk(
  'users/bulkActivate',
  async (ids: number[], { rejectWithValue }) => {
    try {
      await mockUserService.bulkActivate(ids)
      return ids
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const bulkDeactivateUsers = createAsyncThunk(
  'users/bulkDeactivate',
  async (ids: number[], { rejectWithValue }) => {
    try {
      await mockUserService.bulkDeactivate(ids)
      return ids
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setFilters: (state, action: PayloadAction<Partial<UserFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_FILTERS
      state.searchTerm = ''
      state.currentPage = 1
    },
    setSort: (state, action: PayloadAction<UserSort>) => {
      state.sort = action.payload
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    toggleSelectUser: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.selectedIds.indexOf(id)
      if (index === -1) {
        state.selectedIds.push(id)
      } else {
        state.selectedIds.splice(index, 1)
      }
    },
    selectAllUsers: (state) => {
      state.selectedIds = state.users.map((u) => u.id)
    },
    clearSelection: (state) => {
      state.selectedIds = []
    },
    selectUser: (state, action: PayloadAction<User | undefined>) => {
      state.selectedUser = action.payload
    },
    clearError: (state) => {
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.total = action.payload.total
        state.currentPage = action.payload.page
        state.pageSize = action.payload.pageSize
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(createUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = [action.payload, ...state.users]
        state.total += 1
      })
      .addCase(createUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(updateUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        )
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(deleteUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.filter((u) => u.id !== action.payload)
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload)
        state.total -= 1
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = undefined
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(activateUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        )
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(deactivateUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        )
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(lockUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(lockUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        )
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(lockUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(unlockUser.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(unlockUser.fulfilled, (state, action) => {
        state.submitting = false
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        )
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload
        }
      })
      .addCase(unlockUser.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(resetPassword.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.submitting = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(bulkDeleteUsers.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(bulkDeleteUsers.fulfilled, (state, action) => {
        state.submitting = false
        const ids = action.payload
        state.users = state.users.filter((u) => !ids.includes(u.id))
        state.selectedIds = state.selectedIds.filter((id) => !ids.includes(id))
        state.total -= ids.length
      })
      .addCase(bulkDeleteUsers.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(bulkActivateUsers.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(bulkActivateUsers.fulfilled, (state, action) => {
        state.submitting = false
        const ids = action.payload
        state.users = state.users.map((u) =>
          ids.includes(u.id) ? { ...u, status: 'ACTIVE' as const } : u,
        )
      })
      .addCase(bulkActivateUsers.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(bulkDeactivateUsers.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(bulkDeactivateUsers.fulfilled, (state, action) => {
        state.submitting = false
        const ids = action.payload
        state.users = state.users.map((u) =>
          ids.includes(u.id) ? { ...u, status: 'INACTIVE' as const, online: false } : u,
        )
      })
      .addCase(bulkDeactivateUsers.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSearchTerm,
  setFilters,
  resetFilters,
  setSort,
  setViewMode,
  setCurrentPage,
  setPageSize,
  toggleSelectUser,
  selectAllUsers,
  clearSelection,
  selectUser,
  clearError,
} = userSlice.actions
export default userSlice.reducer

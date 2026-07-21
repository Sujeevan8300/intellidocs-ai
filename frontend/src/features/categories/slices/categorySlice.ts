import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { mockCategoryService } from '../api/mockCategory.service'
import { DEFAULT_FILTERS } from '../constants/category.constants'
import type { Category, CategoryRequest } from '../types/Category'
import type { CategoryFilter } from '../types/CategoryFilter'

export interface CategoryState {
  categories: Category[]
  selectedCategory: Category | undefined
  loading: boolean
  submitting: boolean
  searchTerm: string
  filters: CategoryFilter
  error: string | undefined
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: undefined,
  loading: false,
  submitting: false,
  searchTerm: '',
  filters: DEFAULT_FILTERS,
  error: undefined,
}

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await mockCategoryService.getCategories()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockCategoryService.getCategoryById(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const createCategory = createAsyncThunk(
  'categories/create',
  async (request: CategoryRequest, { rejectWithValue }) => {
    try {
      return await mockCategoryService.createCategory(request)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, request }: { id: number; request: CategoryRequest }, { rejectWithValue }) => {
    try {
      return await mockCategoryService.updateCategory(id, request)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await mockCategoryService.deleteCategory(id)
      return id
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

// ── Slice ─────────────────────────────────────────────────────────────────────

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<CategoryFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_FILTERS
      state.searchTerm = ''
    },
    selectCategory: (state, action: PayloadAction<Category | undefined>) => {
      state.selectedCategory = action.payload
    },
    clearError: (state) => {
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // fetchCategoryById
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedCategory = action.payload
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // createCategory
    builder
      .addCase(createCategory.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.submitting = false
        state.categories = [action.payload, ...state.categories]
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    // updateCategory
    builder
      .addCase(updateCategory.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.submitting = false
        state.categories = state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        )
        if (state.selectedCategory?.id === action.payload.id) {
          state.selectedCategory = action.payload
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    // deleteCategory
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.submitting = false
        state.categories = state.categories.filter((c) => c.id !== action.payload)
        if (state.selectedCategory?.id === action.payload) {
          state.selectedCategory = undefined
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })
  },
})

export const { setSearchTerm, setFilters, resetFilters, selectCategory, clearError } =
  categorySlice.actions
export default categorySlice.reducer

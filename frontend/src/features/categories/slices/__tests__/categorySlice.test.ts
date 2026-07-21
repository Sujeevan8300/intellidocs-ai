import { describe, it, expect, vi, beforeEach } from 'vitest'
import categoryReducer, {
  setSearchTerm,
  setFilters,
  resetFilters,
  selectCategory,
  clearError,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type CategoryState,
} from '../categorySlice'
import { CategoryStatus, type Category } from '../../types/Category'
import { DocumentCountRange, DateFilter } from '../../types/CategoryFilter'

vi.mock('../../api/mockCategory.service', () => ({
  mockCategoryService: {
    getCategories: vi.fn(),
    getCategoryById: vi.fn(),
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
  },
}))

import { mockCategoryService } from '../../api/mockCategory.service'

const mockService = vi.mocked(mockCategoryService)

const makeState = (overrides: Partial<CategoryState> = {}): CategoryState => ({
  categories: [],
  selectedCategory: undefined,
  loading: false,
  submitting: false,
  searchTerm: '',
  filters: {
    status: 'ALL',
    documentCountRange: DocumentCountRange.ALL,
    dateFilter: DateFilter.ALL,
  },
  error: undefined,
  ...overrides,
})

const sampleCategory: Category = {
  id: 1,
  name: 'Test',
  description: 'Desc',
  documentCount: 5,
  status: CategoryStatus.ACTIVE,
  createdBy: 'User',
  createdDate: '2026-01-01',
}

describe('categorySlice - initial state', () => {
  it('has correct default state', () => {
    const state = categoryReducer(undefined, { type: '@@INIT' })
    expect(state.categories).toEqual([])
    expect(state.selectedCategory).toBeUndefined()
    expect(state.loading).toBe(false)
    expect(state.submitting).toBe(false)
    expect(state.searchTerm).toBe('')
    expect(state.filters).toEqual({
      status: 'ALL',
      documentCountRange: DocumentCountRange.ALL,
      dateFilter: DateFilter.ALL,
    })
    expect(state.error).toBeUndefined()
  })
})

describe('categorySlice - synchronous reducers', () => {
  it('setSearchTerm updates searchTerm', () => {
    const state = categoryReducer(makeState(), setSearchTerm('hello'))
    expect(state.searchTerm).toBe('hello')
  })

  it('setFilters merges partial filters', () => {
    const state = categoryReducer(makeState(), setFilters({ status: CategoryStatus.INACTIVE }))
    expect(state.filters.status).toBe(CategoryStatus.INACTIVE)
    expect(state.filters.documentCountRange).toBe(DocumentCountRange.ALL)
  })

  it('resetFilters restores default filters and clears searchTerm', () => {
    const prev = makeState({
      searchTerm: 'test',
      filters: { status: CategoryStatus.INACTIVE, documentCountRange: DocumentCountRange.FIFTY_PLUS, dateFilter: DateFilter.TODAY },
    })
    const state = categoryReducer(prev, resetFilters())
    expect(state.searchTerm).toBe('')
    expect(state.filters).toEqual({
      status: 'ALL',
      documentCountRange: DocumentCountRange.ALL,
      dateFilter: DateFilter.ALL,
    })
  })

  it('selectCategory sets selectedCategory', () => {
    const state = categoryReducer(makeState(), selectCategory(sampleCategory))
    expect(state.selectedCategory).toEqual(sampleCategory)
  })

  it('selectCategory with undefined clears selectedCategory', () => {
    const prev = makeState({ selectedCategory: sampleCategory })
    const state = categoryReducer(prev, selectCategory(undefined))
    expect(state.selectedCategory).toBeUndefined()
  })

  it('clearError clears the error', () => {
    const prev = makeState({ error: 'some error' })
    const state = categoryReducer(prev, clearError())
    expect(state.error).toBeUndefined()
  })
})

describe('categorySlice - async thunks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchCategories', () => {
    it('sets loading on pending', () => {
      const action = { type: fetchCategories.pending.type }
      const state = categoryReducer(makeState(), action)
      expect(state.loading).toBe(true)
      expect(state.error).toBeUndefined()
    })

    it('sets categories on fulfilled', async () => {
      const categories = [sampleCategory]
      mockService.getCategories.mockResolvedValue(categories)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await fetchCategories()(dispatch, getState, undefined)
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchCategories.fulfilled.type }))
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === fetchCategories.fulfilled.type,
      )
      const state = categoryReducer(makeState(), fulfilledAction![0])
      expect(state.loading).toBe(false)
      expect(state.categories).toEqual(categories)
    })

    it('sets error on rejected', () => {
      const action = { type: fetchCategories.rejected.type, payload: 'Network error' }
      const state = categoryReducer(makeState(), action)
      expect(state.loading).toBe(false)
      expect(state.error).toBe('Network error')
    })
  })

  describe('createCategory', () => {
    it('sets submitting on pending', () => {
      const action = { type: createCategory.pending.type }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(true)
      expect(state.error).toBeUndefined()
    })

    it('prepends category on fulfilled', async () => {
      const existing = { ...sampleCategory, id: 2, name: 'Old' }
      mockService.createCategory.mockResolvedValue(sampleCategory)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await createCategory({
        name: 'Test',
        description: 'Desc',
        status: CategoryStatus.ACTIVE,
      })(dispatch, getState, undefined)
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === createCategory.fulfilled.type,
      )
      const state = categoryReducer(makeState({ categories: [existing] }), fulfilledAction![0])
      expect(state.submitting).toBe(false)
      expect(state.categories[0]).toEqual(sampleCategory)
      expect(state.categories[1]).toEqual(existing)
    })

    it('sets error on rejected', () => {
      const action = { type: createCategory.rejected.type, payload: 'Creation failed' }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(false)
      expect(state.error).toBe('Creation failed')
    })
  })

  describe('updateCategory', () => {
    it('sets submitting on pending', () => {
      const action = { type: updateCategory.pending.type }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(true)
    })

    it('replaces the updated category on fulfilled', async () => {
      const updated = { ...sampleCategory, name: 'Updated Name' }
      mockService.updateCategory.mockResolvedValue(updated)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await updateCategory({ id: 1, request: { name: 'Updated Name', description: 'Desc', status: CategoryStatus.ACTIVE } })(
        dispatch,
        getState,
        undefined,
      )
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === updateCategory.fulfilled.type,
      )
      const state = categoryReducer(
        makeState({ categories: [sampleCategory] }),
        fulfilledAction![0],
      )
      expect(state.submitting).toBe(false)
      expect(state.categories[0].name).toBe('Updated Name')
    })

    it('updates selectedCategory when it matches the updated id', async () => {
      const updated = { ...sampleCategory, name: 'Updated' }
      mockService.updateCategory.mockResolvedValue(updated)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await updateCategory({ id: 1, request: { name: 'Updated', description: 'Desc', status: CategoryStatus.ACTIVE } })(
        dispatch,
        getState,
        undefined,
      )
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === updateCategory.fulfilled.type,
      )
      const state = categoryReducer(
        makeState({ categories: [sampleCategory], selectedCategory: sampleCategory }),
        fulfilledAction![0],
      )
      expect(state.selectedCategory?.name).toBe('Updated')
    })

    it('sets error on rejected', () => {
      const action = { type: updateCategory.rejected.type, payload: 'Update failed' }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(false)
      expect(state.error).toBe('Update failed')
    })
  })

  describe('deleteCategory', () => {
    it('sets submitting on pending', () => {
      const action = { type: deleteCategory.pending.type }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(true)
    })

    it('removes category on fulfilled', async () => {
      mockService.deleteCategory.mockResolvedValue(undefined)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await deleteCategory(1)(dispatch, getState, undefined)
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === deleteCategory.fulfilled.type,
      )
      const state = categoryReducer(
        makeState({ categories: [sampleCategory, { ...sampleCategory, id: 2 }] }),
        fulfilledAction![0],
      )
      expect(state.submitting).toBe(false)
      expect(state.categories).toHaveLength(1)
      expect(state.categories[0].id).toBe(2)
    })

    it('clears selectedCategory when deleted id matches', async () => {
      mockService.deleteCategory.mockResolvedValue(undefined)
      const dispatch = vi.fn()
      const getState = vi.fn()
      await deleteCategory(1)(dispatch, getState, undefined)
      const fulfilledAction = dispatch.mock.calls.find(
        (c: unknown[]) => (c[0] as { type: string })?.type === deleteCategory.fulfilled.type,
      )
      const state = categoryReducer(
        makeState({ categories: [sampleCategory], selectedCategory: sampleCategory }),
        fulfilledAction![0],
      )
      expect(state.selectedCategory).toBeUndefined()
    })

    it('sets error on rejected', () => {
      const action = { type: deleteCategory.rejected.type, payload: 'Delete failed' }
      const state = categoryReducer(makeState(), action)
      expect(state.submitting).toBe(false)
      expect(state.error).toBe('Delete failed')
    })
  })
})

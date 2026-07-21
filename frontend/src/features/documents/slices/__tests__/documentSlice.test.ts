import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import documentReducer, {
  setSearchTerm,
  setFilters,
  setSort,
  setViewMode,
  setPage,
  setPageSize,
  toggleSelectDocument,
  selectAllDocuments,
  clearSelection,
  selectDocument,
  clearError,
  fetchDocuments,
  fetchDocumentById,
  uploadDocument,
  deleteDocument,
  toggleFavorite,
  type DocumentState,
} from '../documentSlice'
import { DEFAULT_FILTERS } from '../../constants/document.constants'
import { ProcessingStatus } from '../../types/ProcessingStatus'
import type { Document } from '../../types/Document'

vi.mock('../../api/mockDocument.service', () => ({
  mockDocumentService: {
    getDocuments: vi.fn(),
    getDocumentById: vi.fn(),
    uploadDocument: vi.fn(),
    deleteDocument: vi.fn(),
    renameDocument: vi.fn(),
    toggleFavorite: vi.fn(),
    bulkDelete: vi.fn(),
    bulkUpdateCategory: vi.fn(),
    getUploadQueue: vi.fn(),
    cancelUpload: vi.fn(),
    retryUpload: vi.fn(),
    updateDocument: vi.fn(),
  },
}))

import { mockDocumentService } from '../../api/mockDocument.service'

const mockedService = vi.mocked(mockDocumentService)

function makeDoc(id: number, overrides: Partial<Document> = {}): Document {
  return {
    id,
    name: `Doc ${id}`,
    category: 'HR Policies',
    description: `Description ${id}`,
    fileType: 'PDF',
    fileSize: 1024,
    uploadedBy: 'Alice',
    uploadedAt: '2026-07-15',
    processingStatus: ProcessingStatus.READY,
    aiReady: true,
    favorite: false,
    tags: ['test'],
    progress: 100,
    version: '1.0',
    ...overrides,
  }
}

function createTestStore(preloadedState?: Partial<DocumentState>) {
  return configureStore({
    reducer: { documents: documentReducer },
    preloadedState: preloadedState ? { documents: preloadedState as DocumentState } : undefined,
  })
}

function getState(store: ReturnType<typeof createTestStore>): DocumentState {
  return (store.getState() as { documents: DocumentState }).documents
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('documentSlice - initial state', () => {
  it('has correct initial state', () => {
    const state = getState(createTestStore())
    expect(state.documents).toEqual([])
    expect(state.selectedDocument).toBeUndefined()
    expect(state.selectedIds).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.submitting).toBe(false)
    expect(state.searchTerm).toBe('')
    expect(state.filters).toEqual(DEFAULT_FILTERS)
    expect(state.sort).toEqual({ field: 'uploadedAt', order: 'desc' })
    expect(state.viewMode).toBe('table')
    expect(state.currentPage).toBe(1)
    expect(state.pageSize).toBe(12)
    expect(state.error).toBeUndefined()
  })
})

describe('documentSlice - synchronous reducers', () => {
  it('setSearchTerm updates searchTerm and resets page to 1', () => {
    const store = createTestStore({ currentPage: 5 })
    store.dispatch(setSearchTerm('hello'))
    const state = getState(store)
    expect(state.searchTerm).toBe('hello')
    expect(state.currentPage).toBe(1)
  })

  it('setFilters merges filters and resets page to 1', () => {
    const store = createTestStore({ currentPage: 3, filters: { ...DEFAULT_FILTERS } })
    store.dispatch(setFilters({ category: 'Finance' }))
    const state = getState(store)
    expect(state.filters.category).toBe('Finance')
    expect(state.filters.status).toBe(DEFAULT_FILTERS.status)
    expect(state.currentPage).toBe(1)
  })

  it('setSort updates sort', () => {
    const store = createTestStore()
    store.dispatch(setSort({ field: 'name', order: 'asc' }))
    expect(getState(store).sort).toEqual({ field: 'name', order: 'asc' })
  })

  it('setViewMode updates viewMode', () => {
    const store = createTestStore()
    store.dispatch(setViewMode('grid'))
    expect(getState(store).viewMode).toBe('grid')
  })

  it('setPage updates currentPage', () => {
    const store = createTestStore()
    store.dispatch(setPage(3))
    expect(getState(store).currentPage).toBe(3)
  })

  it('setPageSize updates pageSize and resets page to 1', () => {
    const store = createTestStore({ currentPage: 5 })
    store.dispatch(setPageSize(24))
    const state = getState(store)
    expect(state.pageSize).toBe(24)
    expect(state.currentPage).toBe(1)
  })

  it('toggleSelectDocument adds id when not present', () => {
    const store = createTestStore()
    store.dispatch(toggleSelectDocument(1))
    expect(getState(store).selectedIds).toContain(1)
  })

  it('toggleSelectDocument removes id when present', () => {
    const store = createTestStore({ selectedIds: [1, 2] })
    store.dispatch(toggleSelectDocument(1))
    expect(getState(store).selectedIds).toEqual([2])
  })

  it('selectAllDocuments sets selectedIds', () => {
    const store = createTestStore()
    store.dispatch(selectAllDocuments([1, 2, 3]))
    expect(getState(store).selectedIds).toEqual([1, 2, 3])
  })

  it('clearSelection empties selectedIds', () => {
    const store = createTestStore({ selectedIds: [1, 2, 3] })
    store.dispatch(clearSelection())
    expect(getState(store).selectedIds).toEqual([])
  })

  it('selectDocument sets selectedDocument', () => {
    const store = createTestStore()
    const doc = makeDoc(1)
    store.dispatch(selectDocument(doc))
    expect(getState(store).selectedDocument).toEqual(doc)
  })

  it('selectDocument can set undefined', () => {
    const store = createTestStore({ selectedDocument: makeDoc(1) })
    store.dispatch(selectDocument(undefined))
    expect(getState(store).selectedDocument).toBeUndefined()
  })

  it('clearError removes error', () => {
    const store = createTestStore({ error: 'some error' })
    store.dispatch(clearError())
    expect(getState(store).error).toBeUndefined()
  })
})

describe('documentSlice - fetchDocuments thunk', () => {
  it('sets loading true on pending, documents on fulfilled', async () => {
    const docs = [makeDoc(1), makeDoc(2)]
    mockedService.getDocuments.mockResolvedValue(docs)

    const store = createTestStore()
    await store.dispatch(fetchDocuments())

    const state = getState(store)
    expect(state.loading).toBe(false)
    expect(state.documents).toEqual(docs)
  })

  it('sets error on rejected', async () => {
    mockedService.getDocuments.mockRejectedValue(new Error('Network error'))

    const store = createTestStore()
    await store.dispatch(fetchDocuments())

    const state = getState(store)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Network error')
  })
})

describe('documentSlice - fetchDocumentById thunk', () => {
  it('sets selectedDocument on fulfilled', async () => {
    const doc = makeDoc(1)
    mockedService.getDocumentById.mockResolvedValue(doc)

    const store = createTestStore()
    await store.dispatch(fetchDocumentById(1))

    expect(getState(store).selectedDocument).toEqual(doc)
  })

  it('sets error on rejected', async () => {
    mockedService.getDocumentById.mockRejectedValue(new Error('Not found'))

    const store = createTestStore()
    await store.dispatch(fetchDocumentById(999))

    expect(getState(store).error).toBe('Not found')
  })
})

describe('documentSlice - uploadDocument thunk', () => {
  it('adds document to documents on fulfilled', async () => {
    const newDoc = makeDoc(100, { name: 'Uploaded' })
    mockedService.uploadDocument.mockResolvedValue(newDoc)

    const store = createTestStore()
    const file = new File(['x'], 'x.pdf', { type: 'application/pdf' })
    await store.dispatch(uploadDocument({
      request: { name: 'Uploaded', category: 'Finance', description: 'desc', tags: [], fileType: 'PDF', fileSize: 100 },
      file,
    }))

    const state = getState(store)
    expect(state.documents).toHaveLength(1)
    expect(state.documents[0].name).toBe('Uploaded')
    expect(state.submitting).toBe(false)
  })

  it('sets error on rejected', async () => {
    mockedService.uploadDocument.mockRejectedValue(new Error('Upload failed'))

    const store = createTestStore()
    const file = new File(['x'], 'x.pdf', { type: 'application/pdf' })
    await store.dispatch(uploadDocument({
      request: { name: 'Fail', category: 'Finance', description: 'desc', tags: [], fileType: 'PDF', fileSize: 100 },
      file,
    }))

    expect(getState(store).error).toBe('Upload failed')
    expect(getState(store).submitting).toBe(false)
  })
})

describe('documentSlice - deleteDocument thunk', () => {
  it('removes document from state on fulfilled', async () => {
    mockedService.deleteDocument.mockResolvedValue(undefined)

    const store = createTestStore({
      documents: [makeDoc(1), makeDoc(2)],
      selectedIds: [1],
    })
    await store.dispatch(deleteDocument(1))

    const state = getState(store)
    expect(state.documents).toHaveLength(1)
    expect(state.documents[0].id).toBe(2)
    expect(state.selectedIds).toEqual([])
  })

  it('clears selectedDocument if it matches the deleted id', async () => {
    mockedService.deleteDocument.mockResolvedValue(undefined)

    const store = createTestStore({
      documents: [makeDoc(1), makeDoc(2)],
      selectedIds: [],
      selectedDocument: makeDoc(1),
    })
    await store.dispatch(deleteDocument(1))

    expect(getState(store).selectedDocument).toBeUndefined()
  })

  it('sets error on rejected', async () => {
    mockedService.deleteDocument.mockRejectedValue(new Error('Delete failed'))

    const store = createTestStore()
    await store.dispatch(deleteDocument(999))

    expect(getState(store).error).toBe('Delete failed')
  })
})

describe('documentSlice - toggleFavorite thunk', () => {
  it('updates document favorite flag on fulfilled', async () => {
    const toggled = makeDoc(1, { favorite: true })
    mockedService.toggleFavorite.mockResolvedValue(toggled)

    const store = createTestStore({
      documents: [makeDoc(1, { favorite: false }), makeDoc(2)],
    })
    await store.dispatch(toggleFavorite(1))

    const docs = getState(store).documents
    expect(docs.find((d) => d.id === 1)?.favorite).toBe(true)
    expect(docs.find((d) => d.id === 2)?.favorite).toBe(false)
  })

  it('does not set error on rejected (no rejected handler)', async () => {
    mockedService.toggleFavorite.mockRejectedValue(new Error('Toggle failed'))

    const store = createTestStore()
    await store.dispatch(toggleFavorite(999))

    expect(getState(store).error).toBeUndefined()
  })
})

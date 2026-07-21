import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { mockDocumentService } from '../api/mockDocument.service'
import { DEFAULT_FILTERS } from '../constants/document.constants'
import type { Document, DocumentFilter, DocumentSort, ViewMode } from '../types/Document'
import type { UploadFile, UploadRequest } from '../types/Upload'
import type { ProcessingStatus } from '../types/ProcessingStatus'

export interface DocumentState {
  documents: Document[]
  selectedDocument: Document | undefined
  uploadQueue: UploadFile[]
  selectedIds: number[]
  loading: boolean
  uploading: boolean
  submitting: boolean
  searchTerm: string
  filters: DocumentFilter
  sort: DocumentSort
  viewMode: ViewMode
  currentPage: number
  pageSize: number
  error: string | undefined
}

const initialState: DocumentState = {
  documents: [],
  selectedDocument: undefined,
  uploadQueue: [],
  selectedIds: [],
  loading: false,
  uploading: false,
  submitting: false,
  searchTerm: '',
  filters: DEFAULT_FILTERS,
  sort: { field: 'uploadedAt', order: 'desc' },
  viewMode: 'table',
  currentPage: 1,
  pageSize: 12,
  error: undefined,
}

export const fetchDocuments = createAsyncThunk(
  'documents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await mockDocumentService.getDocuments()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const fetchDocumentById = createAsyncThunk(
  'documents/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockDocumentService.getDocumentById(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const uploadDocument = createAsyncThunk(
  'documents/upload',
  async ({ request, file }: { request: UploadRequest; file: File }, { rejectWithValue }) => {
    try {
      return await mockDocumentService.uploadDocument(request, file)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const deleteDocument = createAsyncThunk(
  'documents/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await mockDocumentService.deleteDocument(id)
      return id
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const renameDocument = createAsyncThunk(
  'documents/rename',
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    try {
      return await mockDocumentService.renameDocument(id, name)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const toggleFavorite = createAsyncThunk(
  'documents/toggleFavorite',
  async (id: number, { rejectWithValue }) => {
    try {
      return await mockDocumentService.toggleFavorite(id)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const bulkDeleteDocuments = createAsyncThunk(
  'documents/bulkDelete',
  async (ids: number[], { rejectWithValue }) => {
    try {
      await mockDocumentService.bulkDelete(ids)
      return ids
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const bulkUpdateCategory = createAsyncThunk(
  'documents/bulkUpdateCategory',
  async ({ ids, category }: { ids: number[]; category: string }, { rejectWithValue }) => {
    try {
      await mockDocumentService.bulkUpdateCategory(ids, category)
      return { ids, category }
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setFilters: (state, action: PayloadAction<Partial<DocumentFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    resetFilters: (state) => {
      state.filters = DEFAULT_FILTERS
      state.searchTerm = ''
      state.currentPage = 1
    },
    setSort: (state, action: PayloadAction<DocumentSort>) => {
      state.sort = action.payload
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    toggleSelectDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((i) => i !== id)
      } else {
        state.selectedIds.push(id)
      }
    },
    selectAllDocuments: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload
    },
    clearSelection: (state) => {
      state.selectedIds = []
    },
    selectDocument: (state, action: PayloadAction<Document | undefined>) => {
      state.selectedDocument = action.payload
    },
    clearError: (state) => {
      state.error = undefined
    },
    addUploadToQueue: (state, action: PayloadAction<UploadFile>) => {
      state.uploadQueue.unshift(action.payload)
    },
    updateUploadProgress: (state, action: PayloadAction<{ id: string; progress: number; status: UploadFile['status'] }>) => {
      state.uploadQueue = state.uploadQueue.map((u) =>
        u.id === action.payload.id
          ? { ...u, progress: action.payload.progress, status: action.payload.status }
          : u,
      )
    },
    removeUploadFromQueue: (state, action: PayloadAction<string>) => {
      state.uploadQueue = state.uploadQueue.filter((u) => u.id !== action.payload)
    },
    cancelUploadInQueue: (state, action: PayloadAction<string>) => {
      state.uploadQueue = state.uploadQueue.map((u) =>
        u.id === action.payload ? { ...u, status: 'cancelled' as const } : u,
      )
    },
    simulateProcessing: (state, action: PayloadAction<{ id: number; status: ProcessingStatus; progress: number }>) => {
      state.documents = state.documents.map((d) =>
        d.id === action.payload.id
          ? { ...d, processingStatus: action.payload.status, progress: action.payload.progress, aiReady: action.payload.status === 'READY' }
          : d,
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false
        state.documents = action.payload
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedDocument = action.payload
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(uploadDocument.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.submitting = false
        state.documents = [action.payload, ...state.documents]
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(deleteDocument.pending, (state) => {
        state.submitting = true
        state.error = undefined
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.submitting = false
        state.documents = state.documents.filter((d) => d.id !== action.payload)
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload)
        if (state.selectedDocument?.id === action.payload) {
          state.selectedDocument = undefined
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload as string
      })

    builder
      .addCase(renameDocument.fulfilled, (state, action) => {
        state.documents = state.documents.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        )
        if (state.selectedDocument?.id === action.payload.id) {
          state.selectedDocument = action.payload
        }
      })

    builder
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.documents = state.documents.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        )
      })

    builder
      .addCase(bulkDeleteDocuments.pending, (state) => {
        state.submitting = true
      })
      .addCase(bulkDeleteDocuments.fulfilled, (state, action) => {
        state.submitting = false
        state.documents = state.documents.filter((d) => !action.payload.includes(d.id))
        state.selectedIds = []
      })
      .addCase(bulkDeleteDocuments.rejected, (state) => {
        state.submitting = false
      })

    builder
      .addCase(bulkUpdateCategory.fulfilled, (state, action) => {
        state.documents = state.documents.map((d) =>
          action.payload.ids.includes(d.id) ? { ...d, category: action.payload.category } : d,
        )
        state.selectedIds = []
      })
  },
})

export const {
  setSearchTerm,
  setFilters,
  resetFilters,
  setSort,
  setViewMode,
  setPage,
  setPageSize,
  toggleSelectDocument,
  selectAllDocuments,
  clearSelection,
  selectDocument,
  clearError,
  addUploadToQueue,
  updateUploadProgress,
  removeUploadFromQueue,
  cancelUploadInQueue,
  simulateProcessing,
} = documentSlice.actions

export default documentSlice.reducer

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { StatisticsCards } from '../StatisticsCards'
import type { Document } from '../../../types/Document'
import type { ProcessingStatus } from '../../../types/ProcessingStatus'

function createTestStore(documents: Document[], loading = false) {
  return configureStore({
    reducer: {
      documents: () => ({
        documents,
        loading,
        selectedIds: [],
        error: undefined,
        viewMode: 'table',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchTerm: '',
        filters: { status: 'ALL', category: 'ALL', fileType: 'ALL', uploadedBy: 'ALL', dateRange: 'ALL', favoritesOnly: false, aiReadyOnly: false },
        sort: { field: 'uploadedAt', order: 'desc' },
        uploadQueue: [],
        selectedDocument: undefined,
        uploading: false,
        submitting: false,
      }),
    },
  })
}

function renderWithStore(documents: Document[], loading = false) {
  const store = createTestStore(documents, loading)
  return render(
    <Provider store={store}>
      <StatisticsCards />
    </Provider>,
  )
}

const makeDoc = (overrides: Partial<Document> = {}): Document => ({
  id: 1,
  name: 'Test',
  description: 'desc',
  category: 'HR',
  fileType: 'PDF',
  fileSize: 1048576,
  uploadedBy: 'admin',
  uploadedAt: '2025-01-15T10:00:00Z',
  processingStatus: 'READY' as ProcessingStatus,
  aiReady: true,
  favorite: false,
  tags: [],
  progress: 100,
  version: '1.0',
  ...overrides,
})

describe('StatisticsCards', () => {
  it('renders all 5 stat cards', () => {
    renderWithStore([])
    expect(screen.getByText('Total Documents')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Ready for AI')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
    expect(screen.getByText('Storage Used')).toBeInTheDocument()
  })

  it('shows correct total count', () => {
    renderWithStore([makeDoc({ id: 1 }), makeDoc({ id: 2 }), makeDoc({ id: 3 })])
    expect(screen.getByText('Total Documents')).toBeInTheDocument()
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[0]).toHaveTextContent('3')
  })

  it('shows correct active (processing) count', () => {
    renderWithStore([
      makeDoc({ id: 1, processingStatus: 'PROCESSING' as ProcessingStatus }),
      makeDoc({ id: 2, processingStatus: 'CHUNKING' as ProcessingStatus }),
      makeDoc({ id: 3, processingStatus: 'READY' as ProcessingStatus }),
    ])
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[1]).toHaveTextContent('2')
  })

  it('shows correct ready count', () => {
    renderWithStore([
      makeDoc({ id: 1, processingStatus: 'READY' as ProcessingStatus }),
      makeDoc({ id: 2, processingStatus: 'READY' as ProcessingStatus }),
      makeDoc({ id: 3, processingStatus: 'FAILED' as ProcessingStatus }),
    ])
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[2]).toHaveTextContent('2')
  })

  it('shows correct failed count', () => {
    renderWithStore([
      makeDoc({ id: 1, processingStatus: 'FAILED' as ProcessingStatus }),
      makeDoc({ id: 2, processingStatus: 'READY' as ProcessingStatus }),
    ])
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[3]).toHaveTextContent('1')
  })

  it('shows correct storage used', () => {
    renderWithStore([
      makeDoc({ id: 1, fileSize: 1048576 }),
      makeDoc({ id: 2, fileSize: 2097152 }),
    ])
    expect(screen.getByText('Storage Used')).toBeInTheDocument()
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[4]).toHaveTextContent('3.0 MB')
  })

  it('shows zero counts when no documents', () => {
    renderWithStore([])
    const values = document.querySelectorAll('.doc-stat-value')
    expect(values[0]).toHaveTextContent('0')
    expect(values[1]).toHaveTextContent('0')
    expect(values[2]).toHaveTextContent('0')
    expect(values[3]).toHaveTextContent('0')
  })
})

import { describe, it, expect } from 'vitest'
import {
  filterAndSortDocuments,
  formatFileSize,
  formatDate,
  getProcessingColor,
  getProcessingLabel,
  getFileTypeColor,
} from '../documentUtils'
import { ProcessingStatus } from '../../types/ProcessingStatus'
import type { Document, DocumentFilter, DocumentSort } from '../../types/Document'

function makeDoc(overrides: Partial<Document> = {}): Document {
  return {
    id: 1,
    name: 'Test Document',
    category: 'HR Policies',
    description: 'A test document',
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

const defaultFilters: DocumentFilter = {
  status: 'ALL',
  category: 'ALL',
  fileType: 'ALL',
  uploadedBy: 'ALL',
  dateRange: 'ALL',
  favoritesOnly: false,
  aiReadyOnly: false,
}

const defaultSort: DocumentSort = { field: 'name', order: 'asc' }

describe('filterAndSortDocuments', () => {
  const docs = [
    makeDoc({ id: 1, name: 'Alpha Report', description: 'First report', tags: ['finance'], fileSize: 2000, category: 'Finance', uploadedBy: 'Alice', favorite: true, aiReady: true }),
    makeDoc({ id: 2, name: 'Beta Guide', description: 'Second guide', tags: ['tech'], fileSize: 1000, category: 'Technical Documents', uploadedBy: 'Bob', favorite: false, aiReady: false, fileType: 'DOCX' }),
    makeDoc({ id: 3, name: 'Gamma Policy', description: 'Third policy', tags: ['hr'], fileSize: 3000, category: 'HR Policies', uploadedBy: 'Alice', favorite: false, aiReady: true, processingStatus: ProcessingStatus.FAILED }),
  ]

  it('returns all documents with default filters and no search term', () => {
    const result = filterAndSortDocuments(docs, '', defaultFilters, defaultSort)
    expect(result).toHaveLength(3)
  })

  it('filters by search term matching name', () => {
    const result = filterAndSortDocuments(docs, 'alpha', defaultFilters, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Report')
  })

  it('filters by search term matching description', () => {
    const result = filterAndSortDocuments(docs, 'guide', defaultFilters, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Beta Guide')
  })

  it('filters by search term matching tags', () => {
    const result = filterAndSortDocuments(docs, 'finance', defaultFilters, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Report')
  })

  it('is case insensitive for search', () => {
    const result = filterAndSortDocuments(docs, 'ALPHA', defaultFilters, defaultSort)
    expect(result).toHaveLength(1)
  })

  it('filters by status', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, status: ProcessingStatus.FAILED }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Gamma Policy')
  })

  it('filters by category', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, category: 'Finance' }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Report')
  })

  it('filters by fileType', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, fileType: 'DOCX' }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Beta Guide')
  })

  it('filters by uploadedBy', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, uploadedBy: 'Bob' }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Beta Guide')
  })

  it('filters favoritesOnly', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, favoritesOnly: true }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Report')
  })

  it('filters aiReadyOnly', () => {
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, aiReadyOnly: true }, defaultSort)
    expect(result).toHaveLength(2)
  })

  it('filters by dateRange TODAY', () => {
    const today = new Date().toISOString().slice(0, 10)
    const recentDocs = [makeDoc({ id: 1, name: 'Today Doc', uploadedAt: today })]
    const result = filterAndSortDocuments(recentDocs, '', { ...defaultFilters, dateRange: 'TODAY' }, defaultSort)
    expect(result).toHaveLength(1)
  })

  it('filters by dateRange LAST_7_DAYS', () => {
    const now = new Date()
    const threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(now.getDate() - 3)
    const recentDocs = [makeDoc({ id: 1, name: 'Recent Doc', uploadedAt: threeDaysAgo.toISOString().slice(0, 10) })]
    const result = filterAndSortDocuments(recentDocs, '', { ...defaultFilters, dateRange: 'LAST_7_DAYS' }, defaultSort)
    expect(result).toHaveLength(1)
  })

  it('excludes old documents with LAST_7_DAYS', () => {
    const now = new Date()
    const tenDaysAgo = new Date(now)
    tenDaysAgo.setDate(now.getDate() - 10)
    const oldDocs = [makeDoc({ id: 1, name: 'Old Doc', uploadedAt: tenDaysAgo.toISOString().slice(0, 10) })]
    const result = filterAndSortDocuments(oldDocs, '', { ...defaultFilters, dateRange: 'LAST_7_DAYS' }, defaultSort)
    expect(result).toHaveLength(0)
  })

  it('filters by dateRange LAST_30_DAYS', () => {
    const now = new Date()
    const fifteenDaysAgo = new Date(now)
    fifteenDaysAgo.setDate(now.getDate() - 15)
    const docs = [makeDoc({ id: 1, name: 'Mid Doc', uploadedAt: fifteenDaysAgo.toISOString().slice(0, 10) })]
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, dateRange: 'LAST_30_DAYS' }, defaultSort)
    expect(result).toHaveLength(1)
  })

  it('filters by dateRange LAST_MONTH', () => {
    const now = new Date()
    const fifteenDaysAgo = new Date(now)
    fifteenDaysAgo.setDate(now.getDate() - 15)
    const docs = [makeDoc({ id: 1, name: 'Mid Doc', uploadedAt: fifteenDaysAgo.toISOString().slice(0, 10) })]
    const result = filterAndSortDocuments(docs, '', { ...defaultFilters, dateRange: 'LAST_MONTH' }, defaultSort)
    expect(result).toHaveLength(1)
  })

  it('sorts by name ascending', () => {
    const result = filterAndSortDocuments(docs, '', defaultFilters, { field: 'name', order: 'asc' })
    expect(result.map((d) => d.name)).toEqual(['Alpha Report', 'Beta Guide', 'Gamma Policy'])
  })

  it('sorts by name descending', () => {
    const result = filterAndSortDocuments(docs, '', defaultFilters, { field: 'name', order: 'desc' })
    expect(result.map((d) => d.name)).toEqual(['Gamma Policy', 'Beta Guide', 'Alpha Report'])
  })

  it('sorts by fileSize ascending', () => {
    const result = filterAndSortDocuments(docs, '', defaultFilters, { field: 'fileSize', order: 'asc' })
    expect(result.map((d) => d.fileSize)).toEqual([1000, 2000, 3000])
  })

  it('sorts by fileSize descending', () => {
    const result = filterAndSortDocuments(docs, '', defaultFilters, { field: 'fileSize', order: 'desc' })
    expect(result.map((d) => d.fileSize)).toEqual([3000, 2000, 1000])
  })

  it('sorts by uploadedAt ascending', () => {
    const d1 = makeDoc({ id: 1, name: 'A', uploadedAt: '2026-01-01' })
    const d2 = makeDoc({ id: 2, name: 'B', uploadedAt: '2026-06-01' })
    const result = filterAndSortDocuments([d2, d1], '', defaultFilters, { field: 'uploadedAt', order: 'asc' })
    expect(result.map((d) => d.uploadedAt)).toEqual(['2026-01-01', '2026-06-01'])
  })

  it('sorts by uploadedAt descending', () => {
    const d1 = makeDoc({ id: 1, name: 'A', uploadedAt: '2026-01-01' })
    const d2 = makeDoc({ id: 2, name: 'B', uploadedAt: '2026-06-01' })
    const result = filterAndSortDocuments([d1, d2], '', defaultFilters, { field: 'uploadedAt', order: 'desc' })
    expect(result.map((d) => d.uploadedAt)).toEqual(['2026-06-01', '2026-01-01'])
  })

  it('combines search and filters', () => {
    const result = filterAndSortDocuments(docs, 'alpha', { ...defaultFilters, category: 'Finance' }, defaultSort)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alpha Report')
  })

  it('returns empty when search does not match combined with filter', () => {
    const result = filterAndSortDocuments(docs, 'alpha', { ...defaultFilters, category: 'HR Policies' }, defaultSort)
    expect(result).toHaveLength(0)
  })
})

describe('formatFileSize', () => {
  it('returns 0 B for zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 B')
  })

  it('formats bytes correctly', () => {
    expect(formatFileSize(500)).toBe('500 B')
  })

  it('formats kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB')
    expect(formatFileSize(1536)).toBe('1.5 KB')
  })

  it('formats megabytes correctly', () => {
    expect(formatFileSize(1048576)).toBe('1.0 MB')
    expect(formatFileSize(2621440)).toBe('2.5 MB')
  })

  it('formats gigabytes correctly', () => {
    expect(formatFileSize(1073741824)).toBe('1.0 GB')
  })
})

describe('formatDate', () => {
  it('formats a date string in en-GB format', () => {
    const result = formatDate('2026-07-15')
    expect(result).toBe('15 Jul 2026')
  })

  it('formats another date correctly', () => {
    const result = formatDate('2026-01-01')
    expect(result).toBe('01 Jan 2026')
  })
})

describe('getProcessingColor', () => {
  it('returns processing for UPLOADING', () => {
    expect(getProcessingColor(ProcessingStatus.UPLOADING)).toBe('processing')
  })

  it('returns default for UPLOADED', () => {
    expect(getProcessingColor(ProcessingStatus.UPLOADED)).toBe('default')
  })

  it('returns processing for PROCESSING', () => {
    expect(getProcessingColor(ProcessingStatus.PROCESSING)).toBe('processing')
  })

  it('returns processing for CHUNKING', () => {
    expect(getProcessingColor(ProcessingStatus.CHUNKING)).toBe('processing')
  })

  it('returns processing for EMBEDDING', () => {
    expect(getProcessingColor(ProcessingStatus.EMBEDDING)).toBe('processing')
  })

  it('returns success for READY', () => {
    expect(getProcessingColor(ProcessingStatus.READY)).toBe('success')
  })

  it('returns error for FAILED', () => {
    expect(getProcessingColor(ProcessingStatus.FAILED)).toBe('error')
  })
})

describe('getProcessingLabel', () => {
  it('returns correct labels for all statuses', () => {
    expect(getProcessingLabel(ProcessingStatus.UPLOADING)).toBe('Uploading')
    expect(getProcessingLabel(ProcessingStatus.UPLOADED)).toBe('Uploaded')
    expect(getProcessingLabel(ProcessingStatus.PROCESSING)).toBe('Processing')
    expect(getProcessingLabel(ProcessingStatus.CHUNKING)).toBe('Chunking')
    expect(getProcessingLabel(ProcessingStatus.EMBEDDING)).toBe('Embedding')
    expect(getProcessingLabel(ProcessingStatus.READY)).toBe('Ready')
    expect(getProcessingLabel(ProcessingStatus.FAILED)).toBe('Failed')
  })
})

describe('getFileTypeColor', () => {
  it('returns correct color for PDF', () => {
    expect(getFileTypeColor('PDF')).toBe('#ef4444')
  })

  it('returns correct color for DOCX', () => {
    expect(getFileTypeColor('DOCX')).toBe('#3b82f6')
  })

  it('returns correct color for TXT', () => {
    expect(getFileTypeColor('TXT')).toBe('#6b7280')
  })

  it('returns correct color for MD', () => {
    expect(getFileTypeColor('MD')).toBe('#8b5cf6')
  })

  it('returns correct color for XLSX', () => {
    expect(getFileTypeColor('XLSX')).toBe('#22c55e')
  })

  it('returns default color for unknown type', () => {
    expect(getFileTypeColor('UNKNOWN')).toBe('#6b7280')
  })
})

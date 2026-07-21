import type { Document, DocumentFilter, DocumentSort } from '../types/Document'
import { ProcessingStatus } from '../types/ProcessingStatus'

export function filterAndSortDocuments(
  documents: Document[],
  searchTerm: string,
  filters: DocumentFilter,
  sort: DocumentSort,
): Document[] {
  const term = searchTerm.toLowerCase().trim()

  const result = documents.filter((doc) => {
    if (term) {
      const matchesSearch =
        doc.name.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.tags.some((t) => t.toLowerCase().includes(term))
      if (!matchesSearch) return false
    }

    if (filters.status !== 'ALL' && doc.processingStatus !== filters.status) return false
    if (filters.category !== 'ALL' && doc.category !== filters.category) return false
    if (filters.fileType !== 'ALL' && doc.fileType !== filters.fileType) return false
    if (filters.uploadedBy !== 'ALL' && doc.uploadedBy !== filters.uploadedBy) return false
    if (filters.favoritesOnly && !doc.favorite) return false
    if (filters.aiReadyOnly && !doc.aiReady) return false

    if (filters.dateRange !== 'ALL') {
      const uploaded = new Date(doc.uploadedAt)
      const now = new Date()
      if (filters.dateRange === 'TODAY') {
        if (uploaded.toDateString() !== now.toDateString()) return false
      }
      if (filters.dateRange === 'LAST_7_DAYS') {
        const d = new Date(now)
        d.setDate(now.getDate() - 7)
        if (uploaded < d) return false
      }
      if (filters.dateRange === 'LAST_30_DAYS') {
        const d = new Date(now)
        d.setDate(now.getDate() - 30)
        if (uploaded < d) return false
      }
      if (filters.dateRange === 'LAST_MONTH') {
        const d = new Date(now)
        d.setMonth(now.getMonth() - 1)
        if (uploaded < d) return false
      }
    }

    return true
  })

  result.sort((a, b) => {
    let cmp: number
    switch (sort.field) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'uploadedAt':
        cmp = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        break
      case 'fileSize':
        cmp = a.fileSize - b.fileSize
        break
      case 'category':
        cmp = a.category.localeCompare(b.category)
        break
      case 'processingStatus':
        cmp = a.processingStatus.localeCompare(b.processingStatus)
        break
      default:
        cmp = 0
    }
    return sort.order === 'asc' ? cmp : -cmp
  })

  return result
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function getProcessingColor(status: ProcessingStatus): string {
  const map: Record<ProcessingStatus, string> = {
    UPLOADING: 'processing',
    UPLOADED: 'default',
    PROCESSING: 'processing',
    CHUNKING: 'processing',
    EMBEDDING: 'processing',
    READY: 'success',
    FAILED: 'error',
  }
  return map[status] ?? 'default'
}

export function getProcessingLabel(status: ProcessingStatus): string {
  const map: Record<ProcessingStatus, string> = {
    UPLOADING: 'Uploading',
    UPLOADED: 'Uploaded',
    PROCESSING: 'Processing',
    CHUNKING: 'Chunking',
    EMBEDDING: 'Embedding',
    READY: 'Ready',
    FAILED: 'Failed',
  }
  return map[status] ?? status
}

export function getFileTypeColor(fileType: string): string {
  const map: Record<string, string> = {
    PDF: '#ef4444',
    DOCX: '#3b82f6',
    TXT: '#6b7280',
    MD: '#8b5cf6',
    XLSX: '#22c55e',
  }
  return map[fileType] ?? '#6b7280'
}

import type { ProcessingStatus } from './ProcessingStatus'

export interface Document {
  id: number
  name: string
  category: string
  description: string
  fileType: string
  fileSize: number
  uploadedBy: string
  uploadedAt: string
  processingStatus: ProcessingStatus
  aiReady: boolean
  favorite: boolean
  tags: string[]
  progress: number
  version: string
}

export interface DocumentRequest {
  name: string
  category: string
  description: string
  tags: string[]
  fileType: string
  fileSize: number
}

export interface DocumentFilter {
  status: string
  category: string
  fileType: string
  uploadedBy: string
  dateRange: string
  favoritesOnly: boolean
  aiReadyOnly: boolean
}

export interface DocumentSort {
  field: string
  order: 'asc' | 'desc'
}

export type ViewMode = 'table' | 'grid'

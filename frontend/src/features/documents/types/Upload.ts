import type { ProcessingStatus } from './ProcessingStatus'

export interface UploadFile {
  id: string
  file: File | null
  name: string
  category: string
  description: string
  tags: string[]
  fileType: string
  fileSize: number
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error' | 'cancelled'
  progress: number
  error?: string
  documentId?: number
  processingStatus?: ProcessingStatus
}

export interface UploadRequest {
  name: string
  category: string
  description: string
  tags: string[]
  fileType: string
  fileSize: number
}

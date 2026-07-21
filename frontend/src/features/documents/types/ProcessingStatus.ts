export const ProcessingStatus = {
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  PROCESSING: 'PROCESSING',
  CHUNKING: 'CHUNKING',
  EMBEDDING: 'EMBEDDING',
  READY: 'READY',
  FAILED: 'FAILED',
} as const

export type ProcessingStatus = (typeof ProcessingStatus)[keyof typeof ProcessingStatus]

export const ProcessingStatusLabels: Record<ProcessingStatus, string> = {
  UPLOADING: 'Uploading',
  UPLOADED: 'Uploaded',
  PROCESSING: 'Processing',
  CHUNKING: 'Chunking',
  EMBEDDING: 'Embedding',
  READY: 'Ready',
  FAILED: 'Failed',
}

export const ProcessingStatusColors: Record<ProcessingStatus, string> = {
  UPLOADING: 'processing',
  UPLOADED: 'default',
  PROCESSING: 'processing',
  CHUNKING: 'processing',
  EMBEDDING: 'processing',
  READY: 'success',
  FAILED: 'error',
}

import type { Document, DocumentRequest } from '../types/Document'
import type { UploadRequest, UploadFile } from '../types/Upload'

export interface DocumentService {
  getDocuments(): Promise<Document[]>
  getDocumentById(id: number): Promise<Document>
  uploadDocument(request: UploadRequest, file: File): Promise<Document>
  updateDocument(id: number, request: DocumentRequest): Promise<Document>
  deleteDocument(id: number): Promise<void>
  renameDocument(id: number, name: string): Promise<Document>
  toggleFavorite(id: number): Promise<Document>
  bulkDelete(ids: number[]): Promise<void>
  bulkUpdateCategory(ids: number[], category: string): Promise<void>
  getUploadQueue(): Promise<UploadFile[]>
  cancelUpload(uploadId: string): Promise<void>
  retryUpload(uploadId: string): Promise<void>
}

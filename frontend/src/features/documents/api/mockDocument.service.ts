import { MOCK_API_DELAY_MS } from '../constants/document.constants'
import { mockDocuments } from '../mocks/documents'
import type { DocumentService } from './document.service'
import type { Document, DocumentRequest } from '../types/Document'
import type { UploadRequest, UploadFile } from '../types/Upload'
import { ProcessingStatus } from '../types/ProcessingStatus'

let store: Document[] = [...mockDocuments]
let nextId = store.length + 1
let uploadQueue: UploadFile[] = []

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

export const mockDocumentService: DocumentService = {
  async getDocuments(): Promise<Document[]> {
    await delay(MOCK_API_DELAY_MS)
    return [...store]
  },

  async getDocumentById(id: number): Promise<Document> {
    await delay(MOCK_API_DELAY_MS)
    const doc = store.find((d) => d.id === id)
    if (!doc) throw new Error(`Document with id ${id} not found`)
    return { ...doc }
  },

  async uploadDocument(request: UploadRequest, _file: File): Promise<Document> {
    void _file
    await delay(MOCK_API_DELAY_MS * 2)
    const newDoc: Document = {
      id: nextId++,
      name: request.name,
      category: request.category,
      description: request.description,
      fileType: request.fileType,
      fileSize: request.fileSize,
      uploadedBy: 'Current User',
      uploadedAt: new Date().toISOString().slice(0, 10),
      processingStatus: ProcessingStatus.READY,
      aiReady: true,
      favorite: false,
      tags: request.tags,
      progress: 100,
      version: '1.0',
    }
    store = [newDoc, ...store]
    return { ...newDoc }
  },

  async updateDocument(id: number, request: DocumentRequest): Promise<Document> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((d) => d.id === id)
    if (index === -1) throw new Error(`Document with id ${id} not found`)
    const updated: Document = {
      ...store[index],
      name: request.name,
      category: request.category,
      description: request.description,
      tags: request.tags,
    }
    store = store.map((d) => (d.id === id ? updated : d))
    return { ...updated }
  },

  async deleteDocument(id: number): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    if (!store.find((d) => d.id === id))
      throw new Error(`Document with id ${id} not found`)
    store = store.filter((d) => d.id !== id)
  },

  async renameDocument(id: number, name: string): Promise<Document> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((d) => d.id === id)
    if (index === -1) throw new Error(`Document with id ${id} not found`)
    const updated: Document = { ...store[index], name }
    store = store.map((d) => (d.id === id ? updated : d))
    return { ...updated }
  },

  async toggleFavorite(id: number): Promise<Document> {
    await delay(300)
    const index = store.findIndex((d) => d.id === id)
    if (index === -1) throw new Error(`Document with id ${id} not found`)
    const updated: Document = { ...store[index], favorite: !store[index].favorite }
    store = store.map((d) => (d.id === id ? updated : d))
    return { ...updated }
  },

  async bulkDelete(ids: number[]): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    store = store.filter((d) => !ids.includes(d.id))
  },

  async bulkUpdateCategory(ids: number[], category: string): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    store = store.map((d) => (ids.includes(d.id) ? { ...d, category } : d))
  },

  async getUploadQueue(): Promise<UploadFile[]> {
    await delay(300)
    return [...uploadQueue]
  },

  async cancelUpload(uploadId: string): Promise<void> {
    await delay(200)
    uploadQueue = uploadQueue.map((u) =>
      u.id === uploadId ? { ...u, status: 'cancelled' as const } : u,
    )
  },

  async retryUpload(uploadId: string): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    uploadQueue = uploadQueue.map((u) =>
      u.id === uploadId
        ? { ...u, status: 'processing' as const, progress: 0, error: undefined }
        : u,
    )
  },
}

import { describe, it, expect, vi } from 'vitest'
import { mockDocumentService } from '../mockDocument.service'
import { ProcessingStatus } from '../../types/ProcessingStatus'
import type { UploadRequest } from '../../types/Upload'

vi.mock('../../constants/document.constants', () => ({
  MOCK_API_DELAY_MS: 0,
}))

function makeUploadRequest(overrides: Partial<UploadRequest> = {}): UploadRequest {
  return {
    name: 'New Doc',
    category: 'Finance',
    description: 'A new document',
    tags: ['finance'],
    fileType: 'PDF',
    fileSize: 1024,
    ...overrides,
  }
}

describe('mockDocumentService', () => {
  describe('getDocuments', () => {
    it('returns an array of documents', async () => {
      const docs = await mockDocumentService.getDocuments()
      expect(Array.isArray(docs)).toBe(true)
      expect(docs.length).toBeGreaterThan(0)
    })

    it('returns documents with expected shape', async () => {
      const docs = await mockDocumentService.getDocuments()
      const doc = docs[0]
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('name')
      expect(doc).toHaveProperty('category')
      expect(doc).toHaveProperty('fileType')
      expect(doc).toHaveProperty('processingStatus')
    })

    it('returns a copy of the store each time', async () => {
      const docs1 = await mockDocumentService.getDocuments()
      const docs2 = await mockDocumentService.getDocuments()
      expect(docs1).not.toBe(docs2)
      expect(docs1).toEqual(docs2)
    })
  })

  describe('getDocumentById', () => {
    it('returns a document when found', async () => {
      const docs = await mockDocumentService.getDocuments()
      const first = docs[0]
      const doc = await mockDocumentService.getDocumentById(first.id)
      expect(doc.id).toBe(first.id)
      expect(doc.name).toBe(first.name)
    })

    it('throws when document is not found', async () => {
      await expect(mockDocumentService.getDocumentById(999999)).rejects.toThrow('not found')
    })
  })

  describe('uploadDocument', () => {
    it('creates a new document and adds it to the store', async () => {
      const docsBefore = await mockDocumentService.getDocuments()
      const request = makeUploadRequest()
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const newDoc = await mockDocumentService.uploadDocument(request, file)

      expect(newDoc.name).toBe('New Doc')
      expect(newDoc.category).toBe('Finance')
      expect(newDoc.processingStatus).toBe(ProcessingStatus.READY)
      expect(newDoc.aiReady).toBe(true)
      expect(newDoc.favorite).toBe(false)
      expect(newDoc.progress).toBe(100)

      const docsAfter = await mockDocumentService.getDocuments()
      expect(docsAfter.length).toBe(docsBefore.length + 1)
      expect(docsAfter[0].id).toBe(newDoc.id)
    })
  })

  describe('updateDocument', () => {
    it('updates an existing document', async () => {
      const docs = await mockDocumentService.getDocuments()
      const first = docs[0]
      const updated = await mockDocumentService.updateDocument(first.id, {
        name: 'Updated Name',
        category: 'Updated Category',
        description: 'Updated description',
        tags: ['updated'],
        fileType: first.fileType,
        fileSize: first.fileSize,
      })
      expect(updated.name).toBe('Updated Name')
      expect(updated.category).toBe('Updated Category')
    })

    it('throws when document is not found', async () => {
      await expect(
        mockDocumentService.updateDocument(999999, {
          name: 'X',
          category: 'X',
          description: 'X',
          tags: [],
          fileType: 'PDF',
          fileSize: 0,
        }),
      ).rejects.toThrow('not found')
    })
  })

  describe('deleteDocument', () => {
    it('removes a document from the store', async () => {
      const docsBefore = await mockDocumentService.getDocuments()
      const first = docsBefore[0]
      await mockDocumentService.deleteDocument(first.id)
      const docsAfter = await mockDocumentService.getDocuments()
      expect(docsAfter.length).toBe(docsBefore.length - 1)
      expect(docsAfter.find((d) => d.id === first.id)).toBeUndefined()
    })

    it('throws when document is not found', async () => {
      await expect(mockDocumentService.deleteDocument(999999)).rejects.toThrow('not found')
    })
  })

  describe('toggleFavorite', () => {
    it('toggles favorite from false to true', async () => {
      const docs = await mockDocumentService.getDocuments()
      const doc = docs.find((d) => !d.favorite)
      expect(doc).toBeDefined()
      const result = await mockDocumentService.toggleFavorite(doc!.id)
      expect(result.favorite).toBe(true)
    })

    it('toggles favorite from true to false', async () => {
      const docs = await mockDocumentService.getDocuments()
      const doc = docs.find((d) => d.favorite)
      expect(doc).toBeDefined()
      const result = await mockDocumentService.toggleFavorite(doc!.id)
      expect(result.favorite).toBe(false)
    })

    it('throws when document is not found', async () => {
      await expect(mockDocumentService.toggleFavorite(999999)).rejects.toThrow('not found')
    })
  })

  describe('renameDocument', () => {
    it('renames a document', async () => {
      const docs = await mockDocumentService.getDocuments()
      const first = docs[0]
      const renamed = await mockDocumentService.renameDocument(first.id, 'New Name')
      expect(renamed.name).toBe('New Name')
      expect(renamed.id).toBe(first.id)
    })

    it('throws when document is not found', async () => {
      await expect(mockDocumentService.renameDocument(999999, 'X')).rejects.toThrow('not found')
    })
  })

  describe('bulkDelete', () => {
    it('removes multiple documents', async () => {
      const docsBefore = await mockDocumentService.getDocuments()
      const idsToDelete = docsBefore.slice(0, 3).map((d) => d.id)
      await mockDocumentService.bulkDelete(idsToDelete)
      const docsAfter = await mockDocumentService.getDocuments()
      expect(docsAfter.length).toBe(docsBefore.length - 3)
      idsToDelete.forEach((id) => {
        expect(docsAfter.find((d) => d.id === id)).toBeUndefined()
      })
    })
  })

  describe('bulkUpdateCategory', () => {
    it('updates category for multiple documents', async () => {
      const docs = await mockDocumentService.getDocuments()
      const ids = docs.slice(0, 2).map((d) => d.id)
      await mockDocumentService.bulkUpdateCategory(ids, 'New Category')
      const updated = await mockDocumentService.getDocuments()
      ids.forEach((id) => {
        const doc = updated.find((d) => d.id === id)
        expect(doc?.category).toBe('New Category')
      })
    })
  })

  describe('getUploadQueue', () => {
    it('returns an array', async () => {
      const queue = await mockDocumentService.getUploadQueue()
      expect(Array.isArray(queue)).toBe(true)
    })
  })
})

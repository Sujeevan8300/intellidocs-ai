import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CategoryStatus, type CategoryRequest } from '../../types/Category'

vi.mock('../../constants/category.constants', () => ({
  MOCK_API_DELAY_MS: 0,
}))

vi.mock('../../mocks/categories', () => ({
  mockCategories: [
    {
      id: 1,
      name: 'Existing',
      description: 'An existing category',
      documentCount: 5,
      status: CategoryStatus.ACTIVE,
      createdBy: 'Admin',
      createdDate: '2026-01-10',
    },
  ],
}))

let mockCategoryService: typeof import('../mockCategory.service').mockCategoryService

beforeEach(async () => {
  vi.resetModules()
  const mod = await import('../mockCategory.service')
  mockCategoryService = mod.mockCategoryService
})

describe('mockCategoryService', () => {
  describe('getCategories', () => {
    it('returns an array of categories', async () => {
      const categories = await mockCategoryService.getCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('returns copies, not references to the store', async () => {
      const first = await mockCategoryService.getCategories()
      const second = await mockCategoryService.getCategories()
      expect(first).not.toBe(second)
      expect(first).toEqual(second)
    })
  })

  describe('getCategoryById', () => {
    it('returns a category by id', async () => {
      const category = await mockCategoryService.getCategoryById(1)
      expect(category.id).toBe(1)
      expect(category.name).toBe('Existing')
    })

    it('throws for a non-existent id', async () => {
      await expect(mockCategoryService.getCategoryById(999)).rejects.toThrow('not found')
    })
  })

  describe('createCategory', () => {
    it('creates and returns the new category', async () => {
      const request: CategoryRequest = {
        name: 'New',
        description: 'Brand new',
        status: CategoryStatus.INACTIVE,
      }
      const created = await mockCategoryService.createCategory(request)
      expect(created.name).toBe('New')
      expect(created.description).toBe('Brand new')
      expect(created.status).toBe(CategoryStatus.INACTIVE)
      expect(created.documentCount).toBe(0)
      expect(created.id).toBeDefined()
    })

    it('prepends the new category to the list', async () => {
      const request: CategoryRequest = {
        name: 'Prepended',
        description: 'Should be first',
        status: CategoryStatus.ACTIVE,
      }
      await mockCategoryService.createCategory(request)
      const categories = await mockCategoryService.getCategories()
      expect(categories[0].name).toBe('Prepended')
    })
  })

  describe('updateCategory', () => {
    it('updates and returns the category', async () => {
      const request: CategoryRequest = {
        name: 'Updated',
        description: 'Changed description',
        status: CategoryStatus.INACTIVE,
      }
      const updated = await mockCategoryService.updateCategory(1, request)
      expect(updated.id).toBe(1)
      expect(updated.name).toBe('Updated')
      expect(updated.description).toBe('Changed description')
      expect(updated.status).toBe(CategoryStatus.INACTIVE)
    })

    it('throws for a non-existent id', async () => {
      const request: CategoryRequest = {
        name: 'X',
        description: 'Y',
        status: CategoryStatus.ACTIVE,
      }
      await expect(mockCategoryService.updateCategory(999, request)).rejects.toThrow('not found')
    })
  })

  describe('deleteCategory', () => {
    it('deletes the category', async () => {
      await mockCategoryService.deleteCategory(1)
      await expect(mockCategoryService.getCategoryById(1)).rejects.toThrow('not found')
    })

    it('throws for a non-existent id', async () => {
      await expect(mockCategoryService.deleteCategory(999)).rejects.toThrow('not found')
    })
  })
})

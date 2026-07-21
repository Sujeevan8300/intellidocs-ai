import { MOCK_API_DELAY_MS } from '../constants/category.constants'
import { mockCategories } from '../mocks/categories'
import type { CategoryService } from './category.service'
import type { Category, CategoryRequest } from '../types/Category'

// In-memory store that starts from mock data
let store: Category[] = [...mockCategories]
let nextId = store.length + 1

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

export const mockCategoryService: CategoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(MOCK_API_DELAY_MS)
    return [...store]
  },

  async getCategoryById(id: number): Promise<Category> {
    await delay(MOCK_API_DELAY_MS)
    const category = store.find((c) => c.id === id)
    if (!category) throw new Error(`Category with id ${id} not found`)
    return { ...category }
  },

  async createCategory(request: CategoryRequest): Promise<Category> {
    await delay(MOCK_API_DELAY_MS)
    const parent = request.parentId
      ? store.find((c) => c.id === request.parentId)
      : undefined
    const newCategory: Category = {
      id: nextId++,
      name: request.name,
      description: request.description,
      parentId: request.parentId ?? undefined,
      parentName: parent?.name,
      documentCount: 0,
      status: request.status,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().slice(0, 10),
      relatedDocuments: [],
    }
    store = [newCategory, ...store]
    return { ...newCategory }
  },

  async updateCategory(id: number, request: CategoryRequest): Promise<Category> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((c) => c.id === id)
    if (index === -1) throw new Error(`Category with id ${id} not found`)
    const parent = request.parentId
      ? store.find((c) => c.id === request.parentId)
      : undefined
    const updated: Category = {
      ...store[index],
      name: request.name,
      description: request.description,
      parentId: request.parentId ?? undefined,
      parentName: parent?.name,
      status: request.status,
    }
    store = store.map((c) => (c.id === id ? updated : c))
    return { ...updated }
  },

  async deleteCategory(id: number): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    if (!store.find((c) => c.id === id))
      throw new Error(`Category with id ${id} not found`)
    store = store.filter((c) => c.id !== id)
  },
}

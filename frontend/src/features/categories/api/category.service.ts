import type { Category, CategoryRequest } from '../types/Category'

export interface CategoryService {
  getCategories(): Promise<Category[]>
  getCategoryById(id: number): Promise<Category>
  createCategory(category: CategoryRequest): Promise<Category>
  updateCategory(id: number, category: CategoryRequest): Promise<Category>
  deleteCategory(id: number): Promise<void>
}

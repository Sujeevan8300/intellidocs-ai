import { CategoryStatus } from '../types/Category'
import type { Category } from '../types/Category'
import type { CategoryFilter } from '../types/CategoryFilter'
import { DocumentCountRange, DateFilter } from '../types/CategoryFilter'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function getStatusColor(status: CategoryStatus): string {
  return status === CategoryStatus.ACTIVE ? 'success' : 'default'
}

export function getStatusTagColor(status: CategoryStatus): string {
  return status === CategoryStatus.ACTIVE ? '#10b981' : '#9ca3af'
}

export function filterCategories(
  categories: Category[],
  searchTerm: string,
  filters: CategoryFilter,
): Category[] {
  const term = searchTerm.toLowerCase().trim()

  return categories.filter((category) => {
    // Search filter
    if (term) {
      const matchesSearch =
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term)
      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status !== 'ALL' && category.status !== filters.status) return false

    // Document count filter
    if (filters.documentCountRange !== DocumentCountRange.ALL) {
      const count = category.documentCount
      if (filters.documentCountRange === DocumentCountRange.ZERO_TO_TEN && (count < 0 || count > 10))
        return false
      if (filters.documentCountRange === DocumentCountRange.TEN_TO_FIFTY && (count < 10 || count > 50))
        return false
      if (filters.documentCountRange === DocumentCountRange.FIFTY_PLUS && count <= 50)
        return false
    }

    // Date filter
    if (filters.dateFilter !== DateFilter.ALL) {
      const created = new Date(category.createdDate)
      const now = new Date()
      if (filters.dateFilter === DateFilter.TODAY) {
        if (created.toDateString() !== now.toDateString()) return false
      }
      if (filters.dateFilter === DateFilter.LAST_7_DAYS) {
        const sevenDaysAgo = new Date(now)
        sevenDaysAgo.setDate(now.getDate() - 7)
        if (created < sevenDaysAgo) return false
      }
      if (filters.dateFilter === DateFilter.LAST_MONTH) {
        const oneMonthAgo = new Date(now)
        oneMonthAgo.setMonth(now.getMonth() - 1)
        if (created < oneMonthAgo) return false
      }
    }

    return true
  })
}

export function getDocumentCountLabel(count: number): string {
  if (count === 0) return 'No documents'
  if (count === 1) return '1 document'
  return `${count} documents`
}

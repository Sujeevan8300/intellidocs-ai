import { describe, it, expect } from 'vitest'
import { CategoryStatus, type Category } from '../../types/Category'
import { DocumentCountRange, DateFilter, type CategoryFilter } from '../../types/CategoryFilter'
import {
  getStatusColor,
  getStatusTagColor,
  filterCategories,
  formatDate,
  getDocumentCountLabel,
} from '../categoryFormatter'

const makeCategory = (overrides: Partial<Category> = {}): Category => ({
  id: 1,
  name: 'Test Category',
  description: 'A test description',
  documentCount: 10,
  status: CategoryStatus.ACTIVE,
  createdBy: 'User',
  createdDate: '2026-03-10',
  ...overrides,
})

const allFilters: CategoryFilter = {
  status: 'ALL',
  documentCountRange: DocumentCountRange.ALL,
  dateFilter: DateFilter.ALL,
}

describe('getStatusColor', () => {
  it('returns success for ACTIVE', () => {
    expect(getStatusColor(CategoryStatus.ACTIVE)).toBe('success')
  })

  it('returns default for INACTIVE', () => {
    expect(getStatusColor(CategoryStatus.INACTIVE)).toBe('default')
  })
})

describe('getStatusTagColor', () => {
  it('returns green hex for ACTIVE', () => {
    expect(getStatusTagColor(CategoryStatus.ACTIVE)).toBe('#10b981')
  })

  it('returns gray hex for INACTIVE', () => {
    expect(getStatusTagColor(CategoryStatus.INACTIVE)).toBe('#9ca3af')
  })
})

describe('formatDate', () => {
  it('formats a date string to en-GB format', () => {
    const result = formatDate('2026-01-15')
    expect(result).toContain('Jan')
    expect(result).toContain('2026')
  })

  it('formats a different date', () => {
    const result = formatDate('2025-12-25')
    expect(result).toContain('Dec')
    expect(result).toContain('2025')
  })
})

describe('getDocumentCountLabel', () => {
  it('returns No documents for 0', () => {
    expect(getDocumentCountLabel(0)).toBe('No documents')
  })

  it('returns 1 document for 1', () => {
    expect(getDocumentCountLabel(1)).toBe('1 document')
  })

  it('returns N documents for counts > 1', () => {
    expect(getDocumentCountLabel(5)).toBe('5 documents')
    expect(getDocumentCountLabel(120)).toBe('120 documents')
  })
})

describe('filterCategories', () => {
  const categories: Category[] = [
    makeCategory({ id: 1, name: 'Alpha', description: 'First', status: CategoryStatus.ACTIVE, documentCount: 5, createdDate: '2026-07-20' }),
    makeCategory({ id: 2, name: 'Beta', description: 'Second', status: CategoryStatus.INACTIVE, documentCount: 30, createdDate: '2026-07-18' }),
    makeCategory({ id: 3, name: 'Gamma', description: 'Third', status: CategoryStatus.ACTIVE, documentCount: 80, createdDate: '2026-06-01' }),
    makeCategory({ id: 4, name: 'Delta', description: 'Something else', status: CategoryStatus.ACTIVE, documentCount: 15, createdDate: '2026-07-21' }),
  ]

  it('returns all when no filters applied', () => {
    expect(filterCategories(categories, '', allFilters)).toHaveLength(4)
  })

  it('filters by search term in name', () => {
    const result = filterCategories(categories, 'alpha', allFilters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('filters by search term in description', () => {
    const result = filterCategories(categories, 'Something', allFilters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(4)
  })

  it('filters by ACTIVE status', () => {
    const filters = { ...allFilters, status: CategoryStatus.ACTIVE }
    const result = filterCategories(categories, '', filters)
    expect(result).toHaveLength(3)
  })

  it('filters by INACTIVE status', () => {
    const filters = { ...allFilters, status: CategoryStatus.INACTIVE }
    const result = filterCategories(categories, '', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('filters by document count range 0-10', () => {
    const filters = { ...allFilters, documentCountRange: DocumentCountRange.ZERO_TO_TEN }
    const result = filterCategories(categories, '', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('filters by document count range 10-50', () => {
    const filters = { ...allFilters, documentCountRange: DocumentCountRange.TEN_TO_FIFTY }
    const result = filterCategories(categories, '', filters)
    expect(result).toHaveLength(2)
    expect(result.map((c) => c.id)).toEqual([2, 4])
  })

  it('filters by document count range 50+', () => {
    const filters = { ...allFilters, documentCountRange: DocumentCountRange.FIFTY_PLUS }
    const result = filterCategories(categories, '', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(3)
  })

  it('filters by date - today only includes today', () => {
    const today = new Date().toISOString().slice(0, 10)
    const cats = [makeCategory({ id: 10, createdDate: today })]
    const filters = { ...allFilters, dateFilter: DateFilter.TODAY }
    const result = filterCategories(cats, '', filters)
    expect(result).toHaveLength(1)
  })

  it('filters by date - last 7 days', () => {
    const recent = new Date()
    recent.setDate(recent.getDate() - 3)
    const old = new Date()
    old.setDate(old.getDate() - 20)
    const cats = [
      makeCategory({ id: 10, createdDate: recent.toISOString().slice(0, 10) }),
      makeCategory({ id: 11, createdDate: old.toISOString().slice(0, 10) }),
    ]
    const filters = { ...allFilters, dateFilter: DateFilter.LAST_7_DAYS }
    const result = filterCategories(cats, '', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(10)
  })

  it('filters by date - last month', () => {
    const recent = new Date()
    recent.setDate(recent.getDate() - 10)
    const old = new Date()
    old.setMonth(old.getMonth() - 3)
    const cats = [
      makeCategory({ id: 10, createdDate: recent.toISOString().slice(0, 10) }),
      makeCategory({ id: 11, createdDate: old.toISOString().slice(0, 10) }),
    ]
    const filters = { ...allFilters, dateFilter: DateFilter.LAST_MONTH }
    const result = filterCategories(cats, '', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(10)
  })

  it('combines search and status filters', () => {
    const filters = { ...allFilters, status: CategoryStatus.ACTIVE }
    const result = filterCategories(categories, 'gamma', filters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(3)
  })

  it('search is case-insensitive', () => {
    const result = filterCategories(categories, 'ALPHA', allFilters)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })
})

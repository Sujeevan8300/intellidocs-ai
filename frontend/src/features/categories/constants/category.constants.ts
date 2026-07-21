import { CategoryStatus } from '../types/Category'
import { DocumentCountRange, DateFilter } from '../types/CategoryFilter'

export const MOCK_API_DELAY_MS = 700

export const DEFAULT_PAGE_SIZE = 10

export const STATUS_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: CategoryStatus.ACTIVE },
  { label: 'Inactive', value: CategoryStatus.INACTIVE },
]

export const DOCUMENT_COUNT_OPTIONS = [
  { label: 'All', value: DocumentCountRange.ALL },
  { label: '0 – 10', value: DocumentCountRange.ZERO_TO_TEN },
  { label: '10 – 50', value: DocumentCountRange.TEN_TO_FIFTY },
  { label: '50+', value: DocumentCountRange.FIFTY_PLUS },
]

export const DATE_OPTIONS = [
  { label: 'All Time', value: DateFilter.ALL },
  { label: 'Today', value: DateFilter.TODAY },
  { label: 'Last 7 Days', value: DateFilter.LAST_7_DAYS },
  { label: 'Last Month', value: DateFilter.LAST_MONTH },
]

export const DEFAULT_FILTERS = {
  status: 'ALL',
  documentCountRange: DocumentCountRange.ALL,
  dateFilter: DateFilter.ALL,
}

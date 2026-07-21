import { ProcessingStatus } from '../types/ProcessingStatus'
import type { DocumentFilter } from '../types/Document'

export const MOCK_API_DELAY_MS = 600

export const DEFAULT_PAGE_SIZE = 12

export const SUPPORTED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown']

export const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.md']

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'HR Policies', value: 'HR Policies' },
  { label: 'Technical Documents', value: 'Technical Documents' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Legal', value: 'Legal' },
  { label: 'Security', value: 'Security' },
  { label: 'Product Manuals', value: 'Product Manuals' },
  { label: 'Employee Handbook', value: 'Employee Handbook' },
  { label: 'API Documentation', value: 'API Documentation' },
]

export const STATUS_OPTIONS = [
  { label: 'All Status', value: 'ALL' },
  { label: 'Uploading', value: ProcessingStatus.UPLOADING },
  { label: 'Uploaded', value: ProcessingStatus.UPLOADED },
  { label: 'Processing', value: ProcessingStatus.PROCESSING },
  { label: 'Chunking', value: ProcessingStatus.CHUNKING },
  { label: 'Embedding', value: ProcessingStatus.EMBEDDING },
  { label: 'Ready', value: ProcessingStatus.READY },
  { label: 'Failed', value: ProcessingStatus.FAILED },
]

export const FILE_TYPE_OPTIONS = [
  { label: 'All Types', value: 'ALL' },
  { label: 'PDF', value: 'PDF' },
  { label: 'DOCX', value: 'DOCX' },
  { label: 'TXT', value: 'TXT' },
  { label: 'Markdown', value: 'MD' },
]

export const DATE_RANGE_OPTIONS = [
  { label: 'All Time', value: 'ALL' },
  { label: 'Today', value: 'TODAY' },
  { label: 'Last 7 Days', value: 'LAST_7_DAYS' },
  { label: 'Last 30 Days', value: 'LAST_30_DAYS' },
  { label: 'Last Month', value: 'LAST_MONTH' },
]

export const SORT_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'Upload Date', value: 'uploadedAt' },
  { label: 'Size', value: 'fileSize' },
  { label: 'Category', value: 'category' },
  { label: 'Status', value: 'processingStatus' },
]

export const DEFAULT_FILTERS: DocumentFilter = {
  status: 'ALL',
  category: 'ALL',
  fileType: 'ALL',
  uploadedBy: 'ALL',
  dateRange: 'ALL',
  favoritesOnly: false,
  aiReadyOnly: false,
}

export const FILE_TYPE_ICONS: Record<string, string> = {
  PDF: 'FileTextOutlined',
  DOCX: 'FileWordOutlined',
  TXT: 'FileTextOutlined',
  MD: 'FileMarkdownOutlined',
}

export const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: '#ef4444',
  DOCX: '#3b82f6',
  TXT: '#6b7280',
  MD: '#8b5cf6',
}

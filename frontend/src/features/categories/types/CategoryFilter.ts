export const DocumentCountRange = {
  ALL: 'ALL',
  ZERO_TO_TEN: '0-10',
  TEN_TO_FIFTY: '10-50',
  FIFTY_PLUS: '50+',
} as const

export type DocumentCountRange = (typeof DocumentCountRange)[keyof typeof DocumentCountRange]

export const DateFilter = {
  ALL: 'ALL',
  TODAY: 'TODAY',
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_MONTH: 'LAST_MONTH',
} as const

export type DateFilter = (typeof DateFilter)[keyof typeof DateFilter]

export interface CategoryFilter {
  status: string
  documentCountRange: DocumentCountRange
  dateFilter: DateFilter
}

export enum DocumentCountRange {
  ALL = 'ALL',
  ZERO_TO_TEN = '0-10',
  TEN_TO_FIFTY = '10-50',
  FIFTY_PLUS = '50+',
}

export enum DateFilter {
  ALL = 'ALL',
  TODAY = 'TODAY',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_MONTH = 'LAST_MONTH',
}

export interface CategoryFilter {
  status: string
  documentCountRange: DocumentCountRange
  dateFilter: DateFilter
}

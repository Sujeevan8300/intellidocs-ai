export const STATUS_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Locked', value: 'LOCKED' },
  { label: 'Pending', value: 'PENDING' },
]

export const ROLE_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Super Admin', value: 'Super Admin' },
  { label: 'Knowledge Manager', value: 'Knowledge Manager' },
  { label: 'Employee', value: 'Employee' },
]

export const DEPARTMENT_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'HR', value: 'HR' },
  { label: 'Finance', value: 'Finance' },
  { label: 'IT', value: 'IT' },
  { label: 'Operations', value: 'Operations' },
  { label: 'Legal', value: 'Legal' },
]

export const LOGIN_STATUS_OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: 'Online', value: 'ONLINE' },
  { label: 'Offline', value: 'OFFLINE' },
]

export const SORT_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Created Date', value: 'createdAt' },
  { label: 'Last Login', value: 'lastLogin' },
  { label: 'Department', value: 'department' },
  { label: 'Role', value: 'role' },
]

export const PAGE_SIZE_OPTIONS = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
]

export const DEFAULT_PAGE_SIZE = 10
export const MOCK_API_DELAY_MS = 200

export interface UserFilter {
  status: string
  role: string
  department: string
  loginStatus: string
  dateRange: string
}

export const DEFAULT_FILTERS: UserFilter = {
  status: 'ALL',
  role: 'ALL',
  department: 'ALL',
  loginStatus: 'ALL',
  dateRange: 'ALL',
}

export interface UserSort {
  field: string
  order: 'asc' | 'desc'
}

export const DEFAULT_SORT: UserSort = {
  field: 'createdAt',
  order: 'desc',
}

export type ViewMode = 'table' | 'grid'

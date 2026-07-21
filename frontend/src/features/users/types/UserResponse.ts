import type { User } from './User'

export interface PaginatedUsersResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
}

export interface UserStats {
  total: number
  active: number
  inactive: number
  locked: number
  online: number
}

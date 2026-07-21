import type { UserStatus, UserRole } from './User'

export interface CreateUserRequest {
  firstName: string
  lastName: string
  employeeId: string
  email: string
  phone?: string
  department: string
  role: UserRole
  status: UserStatus
  avatar?: string
  notes?: string
}

export interface UpdateUserRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  department: string
  role: UserRole
  status: UserStatus
  avatar?: string
  notes?: string
}

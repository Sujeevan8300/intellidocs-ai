export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  LOCKED: 'LOCKED',
  PENDING: 'PENDING',
} as const

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export const UserRole = {
  SUPER_ADMIN: 'Super Admin',
  KNOWLEDGE_MANAGER: 'Knowledge Manager',
  EMPLOYEE: 'Employee',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface User {
  id: number
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  role: UserRole
  status: UserStatus
  online: boolean
  avatar: string
  lastLogin: string
  loginCount: number
  createdAt: string
  updatedAt: string
  notes: string
  deleted: boolean
}

export type UserRole = 'SUPER_ADMIN' | 'KNOWLEDGE_MANAGER' | 'EMPLOYEE'

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
  permissions: string[]
}

export type UserRole = 'SUPER_ADMIN' | 'KNOWLEDGE_MANAGER' | 'EMPLOYEE'

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
  permissions: string[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: CurrentUser
  token: string
}

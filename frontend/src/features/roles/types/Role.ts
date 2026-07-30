export interface Role {
  id: number
  name: string
  description: string
  privileges: string[]
  usersCount: number
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
}

export interface RoleState {
  roles: Role[]
  selectedRole: Role | null
  loading: boolean
  error: string | null
}

export interface CreateRoleRequest {
  name: string
  description: string
  privileges: string[]
  status: 'ACTIVE' | 'INACTIVE'
}

export type UpdateRoleRequest = Partial<CreateRoleRequest>

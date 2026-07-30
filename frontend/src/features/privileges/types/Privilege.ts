export interface Privilege {
  id: number
  name: string
  module: string
  action: string
  description: string
  status: 'ACTIVE' | 'INACTIVE'
}

export interface PrivilegeState {
  privileges: Privilege[]
  loading: boolean
  error: string | null
  filters: { module: string; search: string }
}

export interface CreatePrivilegeRequest {
  name: string
  module: string
  action: string
  description: string
  status: 'ACTIVE' | 'INACTIVE'
}

export type UpdatePrivilegeRequest = Partial<CreatePrivilegeRequest>

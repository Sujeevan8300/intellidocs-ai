import type { Role, CreateRoleRequest } from '../types/Role'

export interface RoleService {
  getRoles(): Promise<Role[]>
  getRoleById(id: number): Promise<Role>
  createRole(req: CreateRoleRequest): Promise<Role>
  updateRole(id: number, req: Partial<CreateRoleRequest>): Promise<Role>
  deleteRole(id: number): Promise<void>
  assignPrivileges(id: number, privileges: string[]): Promise<Role>
  cloneRole(id: number, name: string): Promise<Role>
}

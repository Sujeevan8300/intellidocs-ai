import type { Privilege, CreatePrivilegeRequest } from '../types/Privilege'

export interface PrivilegeService {
  getPrivileges(): Promise<Privilege[]>
  createPrivilege(req: CreatePrivilegeRequest): Promise<Privilege>
  updatePrivilege(id: number, req: Partial<CreatePrivilegeRequest>): Promise<Privilege>
  deletePrivilege(id: number): Promise<void>
}

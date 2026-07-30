import type { RoleService } from './role.service'
import type { Role } from '../types/Role'
import { MOCK_ROLES } from '../mocks/roles'

let data: Role[] = [...MOCK_ROLES]
let nextId = 100

export const mockRoleService: RoleService = {
  async getRoles() {
    await new Promise(r => setTimeout(r, 350))
    return [...data]
  },

  async getRoleById(id) {
    await new Promise(r => setTimeout(r, 200))
    const r = data.find(x => x.id === id)
    if (!r) throw new Error('Role not found')
    return r
  },

  async createRole(req) {
    await new Promise(r => setTimeout(r, 500))
    const role: Role = { id: nextId++, ...req, usersCount: 0, createdAt: new Date().toISOString().slice(0, 10) }
    data.push(role)
    return role
  },

  async updateRole(id, req) {
    await new Promise(r => setTimeout(r, 400))
    const idx = data.findIndex(x => x.id === id)
    if (idx === -1) throw new Error('Role not found')
    data[idx] = { ...data[idx], ...req }
    return data[idx]
  },

  async deleteRole(id) {
    await new Promise(r => setTimeout(r, 300))
    data = data.filter(x => x.id !== id)
  },

  async assignPrivileges(id, privileges) {
    await new Promise(r => setTimeout(r, 400))
    const idx = data.findIndex(x => x.id === id)
    if (idx === -1) throw new Error('Role not found')
    data[idx] = { ...data[idx], privileges }
    return data[idx]
  },

  async cloneRole(id, name) {
    await new Promise(r => setTimeout(r, 500))
    const src = data.find(x => x.id === id)
    if (!src) throw new Error('Role not found')
    const clone: Role = { ...src, id: nextId++, name, usersCount: 0, createdAt: new Date().toISOString().slice(0, 10) }
    data.push(clone)
    return clone
  },
}

import type { PrivilegeService } from './privilege.service'
import type { Privilege } from '../types/Privilege'
import { MOCK_PRIVILEGES } from '../mocks/privileges'

let data = [...MOCK_PRIVILEGES]
let nextId = 100

export const mockPrivilegeService: PrivilegeService = {
  async getPrivileges() {
    await new Promise(r => setTimeout(r, 300))
    return [...data]
  },

  async createPrivilege(req) {
    await new Promise(r => setTimeout(r, 400))
    const p: Privilege = { id: nextId++, ...req }
    data.push(p)
    return p
  },

  async updatePrivilege(id, req) {
    await new Promise(r => setTimeout(r, 400))
    const idx = data.findIndex(p => p.id === id)
    if (idx === -1) throw new Error('Privilege not found')
    data[idx] = { ...data[idx], ...req }
    return data[idx]
  },

  async deletePrivilege(id) {
    await new Promise(r => setTimeout(r, 300))
    data = data.filter(p => p.id !== id)
  },
}

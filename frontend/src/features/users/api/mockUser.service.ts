import { MOCK_API_DELAY_MS } from '../constants/user.constants'
import type { UserFilter, UserSort } from '../constants/user.constants'
import { mockUsers } from '../mocks/users'
import type { User } from '../types/User'
import type { CreateUserRequest, UpdateUserRequest } from '../types/UserRequest'
import type { PaginatedUsersResponse, UserStats } from '../types/UserResponse'
import type { UserService } from './user.service'

let store: User[] = [...mockUsers]
let nextId = store.length + 1

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

const matchesSearch = (user: User, search: string): boolean => {
  const term = search.toLowerCase()
  return (
    user.firstName.toLowerCase().includes(term) ||
    user.lastName.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.employeeId.toLowerCase().includes(term) ||
    user.department.toLowerCase().includes(term)
  )
}

const matchesFilters = (user: User, filters: UserFilter): boolean => {
  if (filters.status !== 'ALL' && user.status !== filters.status) return false
  if (filters.role !== 'ALL' && user.role !== filters.role) return false
  if (filters.department !== 'ALL' && user.department !== filters.department) return false
  if (filters.loginStatus === 'ONLINE' && !user.online) return false
  if (filters.loginStatus === 'OFFLINE' && user.online) return false
  return true
}

const sortUsers = (users: User[], sort: UserSort): User[] => {
  const sorted = [...users].sort((a, b) => {
    const fieldA = a[sort.field as keyof User] ?? ''
    const fieldB = b[sort.field as keyof User] ?? ''
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return fieldA.localeCompare(fieldB)
    }
    return 0
  })
  return sort.order === 'desc' ? sorted.reverse() : sorted
}

export const mockUserService: UserService = {
  async getUsers(
    page: number,
    pageSize: number,
    search?: string,
    filters?: UserFilter,
    sort?: UserSort,
  ): Promise<PaginatedUsersResponse> {
    await delay(MOCK_API_DELAY_MS)
    let result = store.filter((u) => !u.deleted)
    if (search) {
      result = result.filter((u) => matchesSearch(u, search))
    }
    if (filters) {
      result = result.filter((u) => matchesFilters(u, filters))
    }
    if (sort) {
      result = sortUsers(result, sort)
    }
    const total = result.length
    const start = (page - 1) * pageSize
    const users = result.slice(start, start + pageSize)
    return { users: users.map((u) => ({ ...u })), total, page, pageSize }
  },

  async getUserById(id: number): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const user = store.find((u) => u.id === id && !u.deleted)
    if (!user) throw new Error(`User with id ${id} not found`)
    return { ...user }
  },

  async createUser(request: CreateUserRequest): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const newUser: User = {
      id: nextId++,
      employeeId: request.employeeId,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone ?? '',
      department: request.department,
      role: request.role,
      status: request.status,
      online: false,
      avatar: request.avatar ?? '',
      lastLogin: '',
      loginCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: request.notes ?? '',
      deleted: false,
    }
    store = [newUser, ...store]
    return { ...newUser }
  },

  async updateUser(id: number, request: UpdateUserRequest): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = {
      ...store[index],
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone ?? store[index].phone,
      department: request.department,
      role: request.role,
      status: request.status,
      avatar: request.avatar ?? store[index].avatar,
      notes: request.notes ?? store[index].notes,
      updatedAt: new Date().toISOString(),
    }
    store = store.map((u) => (u.id === id ? updated : u))
    return { ...updated }
  },

  async deleteUser(id: number): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = { ...store[index], deleted: true }
    store = store.map((u) => (u.id === id ? updated : u))
  },

  async activateUser(id: number): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = {
      ...store[index],
      status: 'ACTIVE',
      updatedAt: new Date().toISOString(),
    }
    store = store.map((u) => (u.id === id ? updated : u))
    return { ...updated }
  },

  async deactivateUser(id: number): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = {
      ...store[index],
      status: 'INACTIVE',
      online: false,
      updatedAt: new Date().toISOString(),
    }
    store = store.map((u) => (u.id === id ? updated : u))
    return { ...updated }
  },

  async lockUser(id: number): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = {
      ...store[index],
      status: 'LOCKED',
      online: false,
      updatedAt: new Date().toISOString(),
    }
    store = store.map((u) => (u.id === id ? updated : u))
    return { ...updated }
  },

  async unlockUser(id: number): Promise<User> {
    await delay(MOCK_API_DELAY_MS)
    const index = store.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) throw new Error(`User with id ${id} not found`)
    const updated: User = {
      ...store[index],
      status: 'ACTIVE',
      updatedAt: new Date().toISOString(),
    }
    store = store.map((u) => (u.id === id ? updated : u))
    return { ...updated }
  },

  async resetPassword(id: number): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    const user = store.find((u) => u.id === id && !u.deleted)
    if (!user) throw new Error(`User with id ${id} not found`)
  },

  async bulkDelete(ids: number[]): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    store = store.map((u) => (ids.includes(u.id) ? { ...u, deleted: true } : u))
  },

  async bulkActivate(ids: number[]): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    store = store.map((u) =>
      ids.includes(u.id) && !u.deleted
        ? { ...u, status: 'ACTIVE' as const, updatedAt: new Date().toISOString() }
        : u,
    )
  },

  async bulkDeactivate(ids: number[]): Promise<void> {
    await delay(MOCK_API_DELAY_MS)
    store = store.map((u) =>
      ids.includes(u.id) && !u.deleted
        ? { ...u, status: 'INACTIVE' as const, online: false, updatedAt: new Date().toISOString() }
        : u,
    )
  },

  async getStats(): Promise<UserStats> {
    await delay(MOCK_API_DELAY_MS)
    const active = store.filter((u) => u.status === 'ACTIVE' && !u.deleted).length
    const inactive = store.filter((u) => u.status === 'INACTIVE' && !u.deleted).length
    const locked = store.filter((u) => u.status === 'LOCKED' && !u.deleted).length
    const online = store.filter((u) => u.online && !u.deleted).length
    const total = store.filter((u) => !u.deleted).length
    return { total, active, inactive, locked, online }
  },
}

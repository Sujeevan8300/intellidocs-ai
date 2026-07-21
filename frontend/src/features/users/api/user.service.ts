import type { User } from '../types/User'
import type { CreateUserRequest, UpdateUserRequest } from '../types/UserRequest'
import type { PaginatedUsersResponse, UserStats } from '../types/UserResponse'
import type { UserFilter, UserSort } from '../constants/user.constants'

export interface UserService {
  getUsers(
    page: number,
    pageSize: number,
    search?: string,
    filters?: UserFilter,
    sort?: UserSort,
  ): Promise<PaginatedUsersResponse>
  getUserById(id: number): Promise<User>
  createUser(request: CreateUserRequest): Promise<User>
  updateUser(id: number, request: UpdateUserRequest): Promise<User>
  deleteUser(id: number): Promise<void>
  activateUser(id: number): Promise<User>
  deactivateUser(id: number): Promise<User>
  lockUser(id: number): Promise<User>
  unlockUser(id: number): Promise<User>
  resetPassword(id: number): Promise<void>
  bulkDelete(ids: number[]): Promise<void>
  bulkActivate(ids: number[]): Promise<void>
  bulkDeactivate(ids: number[]): Promise<void>
  getStats(): Promise<UserStats>
}

import type { UserProfile } from '../types/UserProfile'

export interface ProfileService {
  getCurrentUser(): Promise<UserProfile>
  logout(): Promise<void>
}

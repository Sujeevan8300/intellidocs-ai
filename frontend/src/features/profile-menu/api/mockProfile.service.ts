import type { UserProfile } from '../types/UserProfile'
import type { ProfileService } from './profile.service'
import { MOCK_PROFILE_DELAY_MS } from '../mocks/profile'

const MOCK_USER: UserProfile = {
  id: 'usr_01',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@intellidocs.ai',
  role: 'Knowledge Manager',
  department: 'Engineering',
  avatar: '',
  online: true,
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

export const mockProfileService: ProfileService = {
  async getCurrentUser(): Promise<UserProfile> {
    await delay(MOCK_PROFILE_DELAY_MS)
    return { ...MOCK_USER }
  },

  async logout(): Promise<void> {
    await delay(MOCK_PROFILE_DELAY_MS)
  },
}

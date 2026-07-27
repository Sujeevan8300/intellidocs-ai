import { mockProfileService } from './mockProfile.service'
import type { ProfileService } from './profile.service'

const USE_REAL_BACKEND = false

export const profileService: ProfileService = USE_REAL_BACKEND
  ? mockProfileService
  : mockProfileService

export type { ProfileService } from './profile.service'

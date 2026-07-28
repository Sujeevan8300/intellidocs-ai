import type { SettingsService } from './settings.service'
import { mockSettingsService } from './mockSettings.service'

const USE_REAL_BACKEND = false

// When backend is ready:
// import { settingsApiService } from './settingsApi.service'
// const settingsServiceInstance: SettingsService = USE_REAL_BACKEND ? settingsApiService : mockSettingsService

const settingsServiceInstance: SettingsService = USE_REAL_BACKEND ? mockSettingsService : mockSettingsService

export const settingsService: SettingsService = settingsServiceInstance

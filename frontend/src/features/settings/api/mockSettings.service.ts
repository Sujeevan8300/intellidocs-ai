import type { SettingsService } from './settings.service'
import type { AllSettings, SettingsSection } from '../types/SettingsState'
import type { ISystemInfo } from '../types/SystemInfo'
import { MOCK_GENERAL_SETTINGS } from '../mocks/general'
import { MOCK_AI_SETTINGS, MOCK_DOCUMENT_SETTINGS, MOCK_SEARCH_SETTINGS, MOCK_STORAGE_SETTINGS } from '../mocks/ai'
import { MOCK_SECURITY_SETTINGS, MOCK_AUTHENTICATION_SETTINGS, MOCK_AUDIT_SETTINGS } from '../mocks/security'
import { MOCK_NOTIFICATION_SETTINGS, MOCK_APPEARANCE_SETTINGS, MOCK_BRANDING_SETTINGS, MOCK_EMAIL_SETTINGS, MOCK_SYSTEM_INFO } from '../mocks/notifications'

const MOCK_DELAY = 400

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let settingsSnapshot: AllSettings = {
  general: structuredClone(MOCK_GENERAL_SETTINGS),
  ai: structuredClone(MOCK_AI_SETTINGS),
  documents: structuredClone(MOCK_DOCUMENT_SETTINGS),
  search: structuredClone(MOCK_SEARCH_SETTINGS),
  storage: structuredClone(MOCK_STORAGE_SETTINGS),
  security: structuredClone(MOCK_SECURITY_SETTINGS),
  authentication: structuredClone(MOCK_AUTHENTICATION_SETTINGS),
  notifications: structuredClone(MOCK_NOTIFICATION_SETTINGS),
  appearance: structuredClone(MOCK_APPEARANCE_SETTINGS),
  branding: structuredClone(MOCK_BRANDING_SETTINGS),
  email: structuredClone(MOCK_EMAIL_SETTINGS),
  audit: structuredClone(MOCK_AUDIT_SETTINGS),
}

export const mockSettingsService: SettingsService = {
  async getAllSettings(): Promise<AllSettings> {
    await delay(MOCK_DELAY)
    return structuredClone(settingsSnapshot)
  },

  async saveSettings(section: SettingsSection, data: Partial<AllSettings[SettingsSection]>): Promise<void> {
    await delay(MOCK_DELAY)
    settingsSnapshot = {
      ...settingsSnapshot,
      [section]: { ...settingsSnapshot[section], ...data },
    }
  },

  async resetSettings(section?: SettingsSection): Promise<void> {
    await delay(MOCK_DELAY)
    if (section) {
      const defaults: Record<string, unknown> = {
        general: MOCK_GENERAL_SETTINGS,
        ai: MOCK_AI_SETTINGS,
        documents: MOCK_DOCUMENT_SETTINGS,
        search: MOCK_SEARCH_SETTINGS,
        storage: MOCK_STORAGE_SETTINGS,
        security: MOCK_SECURITY_SETTINGS,
        authentication: MOCK_AUTHENTICATION_SETTINGS,
        notifications: MOCK_NOTIFICATION_SETTINGS,
        appearance: MOCK_APPEARANCE_SETTINGS,
        branding: MOCK_BRANDING_SETTINGS,
        email: MOCK_EMAIL_SETTINGS,
        audit: MOCK_AUDIT_SETTINGS,
      }
      settingsSnapshot = {
        ...settingsSnapshot,
        [section]: structuredClone(defaults[section]),
      }
    } else {
      settingsSnapshot = {
        general: structuredClone(MOCK_GENERAL_SETTINGS),
        ai: structuredClone(MOCK_AI_SETTINGS),
        documents: structuredClone(MOCK_DOCUMENT_SETTINGS),
        search: structuredClone(MOCK_SEARCH_SETTINGS),
        storage: structuredClone(MOCK_STORAGE_SETTINGS),
        security: structuredClone(MOCK_SECURITY_SETTINGS),
        authentication: structuredClone(MOCK_AUTHENTICATION_SETTINGS),
        notifications: structuredClone(MOCK_NOTIFICATION_SETTINGS),
        appearance: structuredClone(MOCK_APPEARANCE_SETTINGS),
        branding: structuredClone(MOCK_BRANDING_SETTINGS),
        email: structuredClone(MOCK_EMAIL_SETTINGS),
        audit: structuredClone(MOCK_AUDIT_SETTINGS),
      }
    }
  },

  async sendTestEmail(email: string): Promise<void> {
    await delay(800)
    void email
  },

  async getSystemInfo(): Promise<ISystemInfo> {
    await delay(MOCK_DELAY)
    return structuredClone(MOCK_SYSTEM_INFO)
  },
}

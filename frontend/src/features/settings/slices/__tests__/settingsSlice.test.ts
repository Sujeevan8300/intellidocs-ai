import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import settingsReducer, {
  fetchSettings,
  saveSection,
  resetSection,
  setActiveSection,
  updateSection,
  clearDirty,
} from '../settingsSlice'

vi.mock('../../api', () => ({
  settingsService: {
    getAllSettings: vi.fn(),
    saveSettings: vi.fn(),
    resetSettings: vi.fn(),
    sendTestEmail: vi.fn(),
    getSystemInfo: vi.fn(),
  },
}))

import { settingsService } from '../../api'
const mockService = vi.mocked(settingsService)

const mockSections = {
  general: { organizationName: 'Test Org', applicationName: 'Test App', timezone: 'UTC', dateFormat: 'MM/DD/YYYY', language: 'en', defaultDashboard: 'analytics', sessionTimeout: 30 },
  ai: { provider: 'openai', model: 'gpt-4o', temperature: 0.7, maxTokens: 4096, topP: 0.9, streaming: true, responseTimeout: 60, chatMemory: true, defaultPrompt: '' },
  documents: { maxUploadSize: 50, maxUploadSizeUnit: 'MB', allowedFileTypes: ['pdf'], maxFilesPerUpload: 20, ocrEnabled: true, autoProcessing: true, duplicateDetection: false, autoCategorization: false },
  search: { defaultLimit: 10, similarityThreshold: 0.75, searchTimeout: 30, highlightMatches: true, enableSuggestions: true, enableRelatedQuestions: true },
  storage: { provider: 's3', maxStorage: 100, maxStorageUnit: 'GB', retentionPeriod: 365, retentionUnit: 'days', versioningEnabled: true, automaticCleanup: false, usedStorage: 68, totalStorage: 100, storageUnit: 'GB' },
  security: { passwordMinLength: 12, passwordComplexity: 'high', requireSpecialCharacters: true, twoFactorAuth: false, accountLockThreshold: 5, sessionExpiration: 60 },
  authentication: { jwtExpiration: 60, refreshTokenExpiration: 10080, rememberMeEnabled: true, allowMultipleSessions: false, loginAttempts: 5 },
  notifications: { emailNotifications: true, systemNotifications: true, uploadNotifications: true, aiProcessingNotifications: false, weeklyReports: true },
  appearance: { theme: 'light', primaryColor: '#6366f1', compactMode: false, sidebarStyle: 'comfortable', tableDensity: 'standard' },
  branding: { organizationLogo: '', loginBackground: '', primaryBrandColor: '#6366f1', secondaryBrandColor: '#818cf8', footerText: '' },
  email: { smtpHost: 'smtp.test.com', smtpPort: 587, smtpUsername: 'user', smtpPassword: '', senderName: 'Test', senderEmail: 'test@test.com' },
  audit: { enabled: true, retentionDays: 90, trackLoginActivity: true, trackUserActions: true },
}

const mockSystemInfo = {
  applicationVersion: '1.0.0', frontendVersion: '1.0.0', backendVersion: '1.0.0',
  database: 'PostgreSQL 16', aiProvider: 'OpenAI GPT-4o', buildDate: '2026-01-01T00:00:00Z',
  environment: 'Production', lastDeployment: '2026-01-01T00:00:00Z',
}

function createTestStore() {
  return configureStore({
    reducer: { settings: settingsReducer },
  })
}

describe('settingsSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockService.getAllSettings.mockResolvedValue(mockSections)
    mockService.getSystemInfo.mockResolvedValue(mockSystemInfo)
    mockService.saveSettings.mockResolvedValue(undefined)
    mockService.resetSettings.mockResolvedValue(undefined)
  })

  describe('fetchSettings', () => {
    it('sets loading on pending', async () => {
      const store = createTestStore()
      const promise = store.dispatch(fetchSettings())
      expect(store.getState().settings.loading).toBe(true)
      await promise
    })

    it('sets sections and systemInfo on fulfilled', async () => {
      const store = createTestStore()
      await store.dispatch(fetchSettings())
      const state = store.getState().settings
      expect(state.loading).toBe(false)
      expect(state.sections.general.organizationName).toBe('Test Org')
      expect(state.systemInfo?.applicationVersion).toBe('1.0.0')
    })

    it('sets error on rejected', async () => {
      mockService.getAllSettings.mockRejectedValueOnce(new Error('Network error'))
      const store = createTestStore()
      await store.dispatch(fetchSettings())
      expect(store.getState().settings.error).toBe('Network error')
      expect(store.getState().settings.loading).toBe(false)
    })
  })

  describe('saveSection', () => {
    it('updates section and clears dirty on fulfilled', async () => {
      const store = createTestStore()
      store.dispatch(updateSection({ section: 'general', data: { organizationName: 'New Org' } }))
      expect(store.getState().settings.dirty).toBe(true)

      await store.dispatch(saveSection({ section: 'general', data: { organizationName: 'New Org' } }))
      const state = store.getState().settings
      expect(state.saving).toBe(false)
      expect(state.dirty).toBe(false)
      expect(state.sections.general.organizationName).toBe('New Org')
    })
  })

  describe('resetSection', () => {
    it('resets sections on fulfilled', async () => {
      const store = createTestStore()
      store.dispatch(updateSection({ section: 'general', data: { organizationName: 'Changed' } }))
      expect(store.getState().settings.dirty).toBe(true)

      await store.dispatch(resetSection('general'))
      const state = store.getState().settings
      expect(state.dirty).toBe(false)
      expect(state.sections.general.organizationName).toBe('Test Org')
    })
  })

  describe('synchronous actions', () => {
    it('setActiveSection changes activeSection', () => {
      const store = createTestStore()
      store.dispatch(setActiveSection('security'))
      expect(store.getState().settings.activeSection).toBe('security')
    })

    it('updateSection updates section data and sets dirty', () => {
      const store = createTestStore()
      store.dispatch(updateSection({ section: 'ai', data: { temperature: 0.5 } }))
      const state = store.getState().settings
      expect(state.dirty).toBe(true)
      expect(state.sections.ai.temperature).toBe(0.5)
    })

    it('clearDirty sets dirty to false', () => {
      const store = createTestStore()
      store.dispatch(updateSection({ section: 'ai', data: { temperature: 0.5 } }))
      expect(store.getState().settings.dirty).toBe(true)
      store.dispatch(clearDirty())
      expect(store.getState().settings.dirty).toBe(false)
    })
  })
})

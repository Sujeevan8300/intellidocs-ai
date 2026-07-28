import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState, SettingsSection, SettingsSectionWithSystem, AllSettings } from '../types/SettingsState'
import { settingsService } from '../api'

const initialState: SettingsState = {
  sections: {
    general: { organizationName: '', applicationName: '', timezone: '', dateFormat: '', language: '', defaultDashboard: '', sessionTimeout: 30 },
    ai: { provider: '', model: '', temperature: 0.7, maxTokens: 4096, topP: 0.9, streaming: true, responseTimeout: 60, chatMemory: true, defaultPrompt: '' },
    documents: { maxUploadSize: 50, maxUploadSizeUnit: 'MB', allowedFileTypes: [], maxFilesPerUpload: 20, ocrEnabled: false, autoProcessing: false, duplicateDetection: false, autoCategorization: false },
    search: { defaultLimit: 10, similarityThreshold: 0.75, searchTimeout: 30, highlightMatches: true, enableSuggestions: true, enableRelatedQuestions: true },
    storage: { provider: 'local', maxStorage: 100, maxStorageUnit: 'GB', retentionPeriod: 365, retentionUnit: 'days', versioningEnabled: false, automaticCleanup: false, usedStorage: 0, totalStorage: 100, storageUnit: 'GB' },
    security: { passwordMinLength: 8, passwordComplexity: 'medium', requireSpecialCharacters: false, twoFactorAuth: false, accountLockThreshold: 5, sessionExpiration: 60 },
    authentication: { jwtExpiration: 60, refreshTokenExpiration: 10080, rememberMeEnabled: true, allowMultipleSessions: false, loginAttempts: 5 },
    notifications: { emailNotifications: true, systemNotifications: true, uploadNotifications: true, aiProcessingNotifications: false, weeklyReports: true },
    appearance: { theme: 'light', primaryColor: '#6366f1', compactMode: false, sidebarStyle: 'comfortable', tableDensity: 'standard' },
    branding: { organizationLogo: '', loginBackground: '', primaryBrandColor: '#6366f1', secondaryBrandColor: '#818cf8', footerText: '' },
    email: { smtpHost: '', smtpPort: 587, smtpUsername: '', smtpPassword: '', senderName: '', senderEmail: '' },
    audit: { enabled: true, retentionDays: 90, trackLoginActivity: true, trackUserActions: true },
  },
  systemInfo: null,
  loading: false,
  saving: false,
  dirty: false,
  activeSection: 'general',
  error: null,
}

export const fetchSettings = createAsyncThunk(
  'settings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [settings, systemInfo] = await Promise.all([
        settingsService.getAllSettings(),
        settingsService.getSystemInfo(),
      ])
      return { settings, systemInfo }
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const saveSection = createAsyncThunk(
  'settings/saveSection',
  async ({ section, data }: { section: SettingsSection; data: Partial<AllSettings[SettingsSection]> }, { rejectWithValue }) => {
    try {
      await settingsService.saveSettings(section, data)
      return { section, data }
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const resetSection = createAsyncThunk(
  'settings/resetSection',
  async (section: SettingsSection | undefined, { rejectWithValue }) => {
    try {
      await settingsService.resetSettings(section)
      const fresh = await settingsService.getAllSettings()
      return fresh
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const sendTestEmail = createAsyncThunk(
  'settings/sendTestEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      await settingsService.sendTestEmail(email)
      return email
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<SettingsSectionWithSystem>) {
      state.activeSection = action.payload as SettingsSection
    },
    updateSectionField(state, action: PayloadAction<{ section: SettingsSection; key: string; value: unknown }>) {
      const { section, key, value } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(state.sections[section] as Record<string, any>)[key] = value
      state.dirty = true
    },
    updateSection(state, action: PayloadAction<{ section: SettingsSection; data: Partial<AllSettings[SettingsSection]> }>) {
      const { section, data } = action.payload
      const target = state.sections[section]
      Object.assign(target, data)
      state.dirty = true
    },
    clearDirty(state) {
      state.dirty = false
    },
    discardChanges(state) {
      state.dirty = false
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false
        state.sections = action.payload.settings
        state.systemInfo = action.payload.systemInfo
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(saveSection.pending, (state) => {
        state.saving = true
        state.error = null
      })
      .addCase(saveSection.fulfilled, (state, action) => {
        state.saving = false
        state.dirty = false
        const { section, data } = action.payload
        const target = state.sections[section]
        Object.assign(target, data)
      })
      .addCase(saveSection.rejected, (state, action) => {
        state.saving = false
        state.error = action.payload as string
      })
      .addCase(resetSection.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetSection.fulfilled, (state, action) => {
        state.loading = false
        state.sections = action.payload
        state.dirty = false
      })
      .addCase(resetSection.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setActiveSection, updateSectionField, updateSection, clearDirty, discardChanges, clearError } = settingsSlice.actions
export default settingsSlice.reducer

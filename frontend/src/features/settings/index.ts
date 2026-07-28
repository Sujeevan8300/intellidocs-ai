export { SettingsPage } from './pages/SettingsPage'
export { HelpPage } from './pages/HelpPage'

export type {
  SettingsSection,
  AllSettings,
  SettingsState,
  IGeneralSettings,
  IAISettings,
  IDocumentSettings,
  ISearchSettings,
  IStorageSettings,
  ISecuritySettings,
  IAuthenticationSettings,
  INotificationSettings,
  IAppearanceSettings,
  IBrandingSettings,
  IEmailSettings,
  IAuditSettings,
  ISystemInfo,
} from './types/SettingsState'

export { useSettings } from './hooks/useSettings'
export { useSettingsForm } from './hooks/useSettingsForm'
export { useUnsavedChanges } from './hooks/useUnsavedChanges'

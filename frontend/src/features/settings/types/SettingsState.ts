import type { IGeneralSettings } from './GeneralSettings'
import type { IAISettings } from './AISettings'
import type { IDocumentSettings } from './DocumentSettings'
import type { ISearchSettings } from './SearchSettings'
import type { IStorageSettings } from './StorageSettings'
import type { ISecuritySettings } from './SecuritySettings'
import type { IAuthenticationSettings } from './AuthenticationSettings'
import type { INotificationSettings } from './NotificationSettings'
import type { IAppearanceSettings } from './AppearanceSettings'
import type { IBrandingSettings } from './BrandingSettings'
import type { IEmailSettings } from './EmailSettings'
import type { IAuditSettings } from './AuditSettings'
import type { ISystemInfo } from './SystemInfo'

export type SettingsSection =
  | 'general'
  | 'ai'
  | 'documents'
  | 'search'
  | 'storage'
  | 'security'
  | 'authentication'
  | 'notifications'
  | 'appearance'
  | 'branding'
  | 'email'
  | 'audit'

export type SettingsSectionWithSystem = SettingsSection | 'system'

export interface AllSettings {
  general: IGeneralSettings
  ai: IAISettings
  documents: IDocumentSettings
  search: ISearchSettings
  storage: IStorageSettings
  security: ISecuritySettings
  authentication: IAuthenticationSettings
  notifications: INotificationSettings
  appearance: IAppearanceSettings
  branding: IBrandingSettings
  email: IEmailSettings
  audit: IAuditSettings
}

export interface SettingsState {
  sections: AllSettings
  systemInfo: ISystemInfo | null
  loading: boolean
  saving: boolean
  dirty: boolean
  activeSection: string
  error: string | null
}

export type {
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
}

import type { AllSettings, SettingsSection } from '../types/SettingsState'
import type { ISystemInfo } from '../types/SystemInfo'

export interface SettingsService {
  getAllSettings(): Promise<AllSettings>
  saveSettings(section: SettingsSection, data: Partial<AllSettings[SettingsSection]>): Promise<void>
  resetSettings(section?: SettingsSection): Promise<void>
  sendTestEmail(email: string): Promise<void>
  getSystemInfo(): Promise<ISystemInfo>
}

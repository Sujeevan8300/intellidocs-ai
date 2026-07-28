import type { INotificationSettings } from '../types/NotificationSettings'
import type { IAppearanceSettings } from '../types/AppearanceSettings'
import type { IBrandingSettings } from '../types/BrandingSettings'
import type { IEmailSettings } from '../types/EmailSettings'
import type { ISystemInfo } from '../types/SystemInfo'

export const MOCK_NOTIFICATION_SETTINGS: INotificationSettings = {
  emailNotifications: true,
  systemNotifications: true,
  uploadNotifications: true,
  aiProcessingNotifications: false,
  weeklyReports: true,
}

export const MOCK_APPEARANCE_SETTINGS: IAppearanceSettings = {
  theme: 'light',
  primaryColor: '#6366f1',
  compactMode: false,
  sidebarStyle: 'comfortable',
  tableDensity: 'standard',
}

export const MOCK_BRANDING_SETTINGS: IBrandingSettings = {
  organizationLogo: '',
  loginBackground: '',
  primaryBrandColor: '#6366f1',
  secondaryBrandColor: '#818cf8',
  footerText: 'Powered by IntelliDocs AI',
}

export const MOCK_EMAIL_SETTINGS: IEmailSettings = {
  smtpHost: 'smtp.intellidocs.com',
  smtpPort: 587,
  smtpUsername: 'noreply@intellidocs.com',
  smtpPassword: '',
  senderName: 'IntelliDocs AI',
  senderEmail: 'noreply@intellidocs.com',
}

export const MOCK_SYSTEM_INFO: ISystemInfo = {
  applicationVersion: '2.4.1',
  frontendVersion: '2.4.1',
  backendVersion: '2.4.0',
  database: 'PostgreSQL 16.2',
  aiProvider: 'OpenAI GPT-4o',
  buildDate: '2026-07-20T14:30:00Z',
  environment: 'Production',
  lastDeployment: '2026-07-20T15:45:00Z',
}

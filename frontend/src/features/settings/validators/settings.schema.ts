import { z } from 'zod'

export const generalSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  applicationName: z.string().min(1, 'Application name is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string().min(1, 'Date format is required'),
  language: z.string().min(1, 'Language is required'),
  defaultDashboard: z.string().min(1, 'Default dashboard is required'),
  sessionTimeout: z.number().min(5, 'Minimum 5 minutes').max(1440, 'Maximum 1440 minutes'),
})

export const aiSchema = z.object({
  provider: z.string().min(1, 'AI provider is required'),
  model: z.string().min(1, 'Model is required'),
  temperature: z.number().min(0, 'Minimum 0').max(2, 'Maximum 2'),
  maxTokens: z.number().min(1, 'Minimum 1').max(128000, 'Maximum 128000'),
  topP: z.number().min(0, 'Minimum 0').max(1, 'Maximum 1'),
  streaming: z.boolean(),
  responseTimeout: z.number().min(10, 'Minimum 10 seconds').max(300, 'Maximum 300 seconds'),
  chatMemory: z.boolean(),
  defaultPrompt: z.string().max(5000, 'Maximum 5000 characters').optional(),
})

export const documentSchema = z.object({
  maxUploadSize: z.number().min(1, 'Minimum 1 MB').max(500, 'Maximum 500 MB'),
  maxUploadSizeUnit: z.string(),
  allowedFileTypes: z.array(z.string()).min(1, 'At least one file type required'),
  maxFilesPerUpload: z.number().min(1, 'Minimum 1').max(100, 'Maximum 100'),
  ocrEnabled: z.boolean(),
  autoProcessing: z.boolean(),
  duplicateDetection: z.boolean(),
  autoCategorization: z.boolean(),
})

export const searchSchema = z.object({
  defaultLimit: z.number().min(1, 'Minimum 1').max(100, 'Maximum 100'),
  similarityThreshold: z.number().min(0, 'Minimum 0').max(1, 'Maximum 1'),
  searchTimeout: z.number().min(5, 'Minimum 5 seconds').max(120, 'Maximum 120 seconds'),
  highlightMatches: z.boolean(),
  enableSuggestions: z.boolean(),
  enableRelatedQuestions: z.boolean(),
})

export const storageSchema = z.object({
  provider: z.string().min(1, 'Storage provider is required'),
  maxStorage: z.number().min(1, 'Minimum 1 GB').max(10000, 'Maximum 10000 GB'),
  maxStorageUnit: z.string(),
  retentionPeriod: z.number().min(1, 'Minimum 1 day').max(3650, 'Maximum 3650 days'),
  retentionUnit: z.string(),
  versioningEnabled: z.boolean(),
  automaticCleanup: z.boolean(),
  usedStorage: z.number(),
  totalStorage: z.number(),
  storageUnit: z.string(),
})

export const securitySchema = z.object({
  passwordMinLength: z.number().min(6, 'Minimum 6').max(128, 'Maximum 128'),
  passwordComplexity: z.enum(['low', 'medium', 'high'], { message: 'Select a complexity level' }),
  requireSpecialCharacters: z.boolean(),
  twoFactorAuth: z.boolean(),
  accountLockThreshold: z.number().min(3, 'Minimum 3 attempts').max(20, 'Maximum 20 attempts'),
  sessionExpiration: z.number().min(5, 'Minimum 5 minutes').max(1440, 'Maximum 1440 minutes'),
})

export const authenticationSchema = z.object({
  jwtExpiration: z.number().min(5, 'Minimum 5 minutes').max(10080, 'Maximum 7 days in minutes'),
  refreshTokenExpiration: z.number().min(30, 'Minimum 30 minutes').max(43200, 'Maximum 30 days in minutes'),
  rememberMeEnabled: z.boolean(),
  allowMultipleSessions: z.boolean(),
  loginAttempts: z.number().min(1, 'Minimum 1').max(20, 'Maximum 20'),
})

export const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  systemNotifications: z.boolean(),
  uploadNotifications: z.boolean(),
  aiProcessingNotifications: z.boolean(),
  weeklyReports: z.boolean(),
})

export const appearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], { message: 'Select a theme' }),
  primaryColor: z.string().min(1, 'Primary color is required'),
  compactMode: z.boolean(),
  sidebarStyle: z.enum(['compact', 'comfortable', 'collapsed'], { message: 'Select a sidebar style' }),
  tableDensity: z.enum(['compact', 'standard', 'comfortable'], { message: 'Select table density' }),
})

export const brandingSchema = z.object({
  organizationLogo: z.string(),
  loginBackground: z.string(),
  primaryBrandColor: z.string().min(1, 'Primary brand color is required'),
  secondaryBrandColor: z.string().min(1, 'Secondary brand color is required'),
  footerText: z.string().max(200, 'Maximum 200 characters').optional(),
})

export const emailSchema = z.object({
  smtpHost: z.string().min(1, 'SMTP host is required'),
  smtpPort: z.number().min(1, 'Port is required').max(65535, 'Invalid port'),
  smtpUsername: z.string().min(1, 'Username is required'),
  smtpPassword: z.string(),
  senderName: z.string().min(1, 'Sender name is required'),
  senderEmail: z.string().email('Invalid email address'),
})

export const auditSchema = z.object({
  enabled: z.boolean(),
  retentionDays: z.number().min(7, 'Minimum 7 days').max(3650, 'Maximum 3650 days'),
  trackLoginActivity: z.boolean(),
  trackUserActions: z.boolean(),
})

export type GeneralFormValues = z.infer<typeof generalSchema>
export type AIFormValues = z.infer<typeof aiSchema>
export type DocumentFormValues = z.infer<typeof documentSchema>
export type SearchFormValues = z.infer<typeof searchSchema>
export type StorageFormValues = z.infer<typeof storageSchema>
export type SecurityFormValues = z.infer<typeof securitySchema>
export type AuthenticationFormValues = z.infer<typeof authenticationSchema>
export type NotificationFormValues = z.infer<typeof notificationSchema>
export type AppearanceFormValues = z.infer<typeof appearanceSchema>
export type BrandingFormValues = z.infer<typeof brandingSchema>
export type EmailFormValues = z.infer<typeof emailSchema>
export type AuditFormValues = z.infer<typeof auditSchema>

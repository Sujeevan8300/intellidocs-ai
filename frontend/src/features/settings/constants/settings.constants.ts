import type { SettingsSection } from '../types/SettingsState'

export type SettingsSectionWithSystem = SettingsSection | 'system'

export interface SidebarItem {
  key: SettingsSectionWithSystem
  label: string
  icon: string
  group: string
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: 'general', label: 'General', icon: 'SettingOutlined', group: 'Core' },
  { key: 'ai', label: 'AI', icon: 'RobotOutlined', group: 'Core' },
  { key: 'documents', label: 'Documents', icon: 'FileTextOutlined', group: 'Core' },
  { key: 'search', label: 'Semantic Search', icon: 'SearchOutlined', group: 'Core' },
  { key: 'storage', label: 'Storage', icon: 'CloudOutlined', group: 'Core' },
  { key: 'security', label: 'Security', icon: 'SafetyOutlined', group: 'Access & Security' },
  { key: 'authentication', label: 'Authentication', icon: 'LockOutlined', group: 'Access & Security' },
  { key: 'notifications', label: 'Notifications', icon: 'BellOutlined', group: 'Access & Security' },
  { key: 'appearance', label: 'Appearance', icon: 'BgColorsOutlined', group: 'Customization' },
  { key: 'branding', label: 'Branding', icon: 'PictureOutlined', group: 'Customization' },
  { key: 'email', label: 'Email', icon: 'MailOutlined', group: 'Customization' },
  { key: 'audit', label: 'Audit', icon: 'AuditOutlined', group: 'System' },
  { key: 'system', label: 'System Information', icon: 'InfoCircleOutlined', group: 'System' },
]

export const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'GMT / London' },
  { value: 'Europe/Paris', label: 'CET / Paris' },
  { value: 'Asia/Tokyo', label: 'JST / Tokyo' },
  { value: 'Asia/Shanghai', label: 'CST / Shanghai' },
  { value: 'Australia/Sydney', label: 'AEST / Sydney' },
]

export const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY' },
]

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
]

export const DASHBOARD_OPTIONS = [
  { value: 'analytics', label: 'Analytics Dashboard' },
  { value: 'documents', label: 'Documents Overview' },
  { value: 'assistant', label: 'AI Assistant' },
]

export const AI_PROVIDER_OPTIONS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'azure', label: 'Azure OpenAI' },
  { value: 'aws-bedrock', label: 'AWS Bedrock' },
]

export const AI_MODEL_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
]

export const FILE_TYPE_OPTIONS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'docx', label: 'DOCX' },
  { value: 'txt', label: 'TXT' },
  { value: 'md', label: 'Markdown' },
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'XLSX' },
  { value: 'pptx', label: 'PPTX' },
  { value: 'html', label: 'HTML' },
]

export const STORAGE_PROVIDER_OPTIONS = [
  { value: 'local', label: 'Local Storage' },
  { value: 's3', label: 'Amazon S3' },
  { value: 'gcs', label: 'Google Cloud Storage' },
  { value: 'azure-blob', label: 'Azure Blob Storage' },
]

export const PASSWORD_COMPLEXITY_OPTIONS = [
  { value: 'low', label: 'Low — Letters only' },
  { value: 'medium', label: 'Medium — Letters + Numbers' },
  { value: 'high', label: 'High — Letters + Numbers + Symbols' },
]

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System Default' },
]

export const SIDEBAR_STYLE_OPTIONS = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'collapsed', label: 'Icons Only' },
]

export const TABLE_DENSITY_OPTIONS = [
  { value: 'compact', label: 'Compact' },
  { value: 'standard', label: 'Standard' },
  { value: 'comfortable', label: 'Comfortable' },
]

export const SECTION_DESCRIPTIONS: Record<SettingsSectionWithSystem, string> = {
  general: 'Configure organization-wide application settings',
  ai: 'Manage AI model configuration and parameters',
  documents: 'Set document processing and upload policies',
  search: 'Configure semantic search behavior and defaults',
  storage: 'Manage storage provider and retention policies',
  security: 'Configure password policies and access controls',
  authentication: 'Manage JWT tokens and session settings',
  notifications: 'Configure notification delivery preferences',
  appearance: 'Customize the application look and feel',
  branding: 'Set organization branding and logos',
  email: 'Configure SMTP email delivery settings',
  audit: 'Set audit logging and retention policies',
  system: 'View system and deployment information',
}

export const DEFAULT_SESSION_TIMEOUT = 30
export const DEFAULT_JWT_EXPIRATION = 60
export const DEFAULT_REFRESH_TOKEN_EXPIRATION = 1440
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128

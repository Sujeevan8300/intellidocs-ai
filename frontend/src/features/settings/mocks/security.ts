import type { ISecuritySettings } from '../types/SecuritySettings'
import type { IAuthenticationSettings } from '../types/AuthenticationSettings'
import type { IAuditSettings } from '../types/AuditSettings'

export const MOCK_SECURITY_SETTINGS: ISecuritySettings = {
  passwordMinLength: 12,
  passwordComplexity: 'high',
  requireSpecialCharacters: true,
  twoFactorAuth: false,
  accountLockThreshold: 5,
  sessionExpiration: 60,
}

export const MOCK_AUTHENTICATION_SETTINGS: IAuthenticationSettings = {
  jwtExpiration: 60,
  refreshTokenExpiration: 10080,
  rememberMeEnabled: true,
  allowMultipleSessions: false,
  loginAttempts: 5,
}

export const MOCK_AUDIT_SETTINGS: IAuditSettings = {
  enabled: true,
  retentionDays: 90,
  trackLoginActivity: true,
  trackUserActions: true,
}

export interface ISecuritySettings {
  passwordMinLength: number
  passwordComplexity: string
  requireSpecialCharacters: boolean
  twoFactorAuth: boolean
  accountLockThreshold: number
  sessionExpiration: number
}

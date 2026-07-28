export interface IAuthenticationSettings {
  jwtExpiration: number
  refreshTokenExpiration: number
  rememberMeEnabled: boolean
  allowMultipleSessions: boolean
  loginAttempts: number
}

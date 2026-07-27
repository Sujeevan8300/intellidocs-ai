export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  department: string
  avatar: string
  online: boolean
}

export interface ProfileState {
  user: UserProfile | null
  loading: boolean
  authenticated: boolean
  error: string | undefined
}

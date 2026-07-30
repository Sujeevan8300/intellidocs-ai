import type { LoginRequest, RegisterRequest, AuthResponse } from '../../../types/auth'

export async function mockLogin(data: LoginRequest): Promise<AuthResponse> {
  await new Promise(r => setTimeout(r, 1200))
  if (data.email === 'demo@intellidocs.ai' && data.password === 'password') {
    return {
      user: {
        id: 'usr_01', name: 'Alex Morgan', email: 'demo@intellidocs.ai',
        role: 'KNOWLEDGE_MANAGER', initials: 'AM',
        permissions: ['document:create', 'document:read', 'analytics:read'],
      },
      token: 'mock-jwt-token',
    }
  }
  if (!data.email.includes('@')) throw new Error('Invalid email address')
  if (data.password.length < 6) throw new Error('Password must be at least 6 characters')
  throw new Error('Invalid email or password')
}

export async function mockRegister(data: RegisterRequest): Promise<AuthResponse> {
  await new Promise(r => setTimeout(r, 1400))
  if (data.email === 'demo@intellidocs.ai') throw new Error('An account with this email already exists')
  if (!data.email.includes('@')) throw new Error('Invalid email address')
  if (data.password.length < 6) throw new Error('Password must be at least 6 characters')
  const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return {
    user: {
      id: 'usr_' + Date.now(), name: data.name, email: data.email,
      role: 'EMPLOYEE', initials,
      permissions: ['document:read'],
    },
    token: 'mock-jwt-token',
  }
}

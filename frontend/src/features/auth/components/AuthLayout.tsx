import type { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../../../store'

export function AuthLayout({ children }: PropsWithChildren) {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

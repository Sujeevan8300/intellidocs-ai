import type { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../../store'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated)
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}

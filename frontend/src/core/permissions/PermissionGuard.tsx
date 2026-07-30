import type { PropsWithChildren } from 'react'
import { usePermission } from './usePermission'
import type { Permission } from './permission.constants'

interface PermissionGuardProps extends PropsWithChildren {
  permission: Permission | Permission[]
  fallback?: React.ReactNode
}

export function PermissionGuard({ permission, fallback, children }: PermissionGuardProps) {
  const { hasPermission } = usePermission()
  if (!hasPermission(permission)) return fallback !== undefined ? <>{fallback}</> : null
  return <>{children}</>
}

interface PermissionGuardPageProps {
  permission: Permission | Permission[]
}

export function PermissionDenied() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 300, color: '#8b899c', gap: 12,
    }}>
      <span style={{ fontSize: 48 }}>🔒</span>
      <h2 style={{ margin: 0, color: '#222137' }}>Access Denied</h2>
      <p style={{ margin: 0 }}>You do not have permission to access this page.</p>
    </div>
  )
}

export function PermissionRouteGuard({ permission }: PermissionGuardPageProps) {
  const { hasPermission } = usePermission()
  if (!hasPermission(permission)) return <PermissionDenied />
  return null
}

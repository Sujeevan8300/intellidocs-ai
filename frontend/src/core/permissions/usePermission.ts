import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { Permission } from './permission.constants'
import { hasRequiredPermission, hasAnyPermission } from './permission.utils'

export function usePermission() {
  const permissions = useSelector((s: RootState) => s.auth.user?.permissions ?? [])

  return useMemo(() => ({
    permissions,
    hasPermission: (required: Permission | Permission[]) => hasRequiredPermission(permissions, required),
    hasAny: (required: Permission[]) => hasAnyPermission(permissions, required),
  }), [permissions])
}

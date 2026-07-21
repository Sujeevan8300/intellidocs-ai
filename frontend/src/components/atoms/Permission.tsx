import type { PropsWithChildren } from 'react'
import { useAppSelector } from '../../hooks/store'
export function Permission({ permission, children }: PropsWithChildren<{ permission: string }>) {
  const permissions = useAppSelector((state) => state.auth.user?.permissions ?? [])
  return permissions.includes(permission) ? <>{children}</> : null
}

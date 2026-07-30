import type { Permission } from './permission.constants'

export function hasRequiredPermission(
  userPermissions: string[] | undefined,
  required: Permission | Permission[],
): boolean {
  if (!userPermissions || userPermissions.length === 0) return false
  const perms = Array.isArray(required) ? required : [required]
  return perms.every(p => userPermissions.includes(p))
}

export function hasAnyPermission(
  userPermissions: string[] | undefined,
  required: Permission[],
): boolean {
  if (!userPermissions || userPermissions.length === 0) return false
  return required.some(p => userPermissions.includes(p))
}

export function filterByPermission<T extends { permission?: Permission }>(
  items: T[],
  userPermissions: string[] | undefined,
): T[] {
  if (!userPermissions) return []
  return items.filter(item => !item.permission || userPermissions.includes(item.permission))
}

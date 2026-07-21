import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema, type UserFormValues } from '../validators/user.schema'
import { UserStatus, UserRole } from '../types/User'
import type { User } from '../types/User'

interface UseUserFormOptions {
  initialData?: Partial<User>
  mode: 'create' | 'edit'
}

export function useUserForm({ initialData, mode }: UseUserFormOptions) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: initialData?.firstName ?? '',
      lastName: initialData?.lastName ?? '',
      employeeId: initialData?.employeeId ?? '',
      email: initialData?.email ?? '',
      phone: initialData?.phone ?? '',
      department: initialData?.department ?? '',
      role: initialData?.role ?? UserRole.EMPLOYEE,
      status: initialData?.status ?? UserStatus.ACTIVE,
      avatar: initialData?.avatar ?? '',
      notes: initialData?.notes ?? '',
    },
    mode: 'onTouched',
  })

  return { form, isEditMode: mode === 'edit' }
}

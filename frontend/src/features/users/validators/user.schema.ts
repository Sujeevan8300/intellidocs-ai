import { z } from 'zod'

import { UserStatus, UserRole } from '../types/User'

const userStatusValues = [
  UserStatus.ACTIVE,
  UserStatus.INACTIVE,
  UserStatus.LOCKED,
  UserStatus.PENDING,
] as const

const userRoleValues = [
  UserRole.SUPER_ADMIN,
  UserRole.KNOWLEDGE_MANAGER,
  UserRole.EMPLOYEE,
] as const

export const createUserSchema = z.object({
  firstName: z
    .string({ error: 'First name is required' })
    .min(2, { error: 'First name must be at least 2 characters' })
    .max(50, { error: 'First name must be at most 50 characters' }),
  lastName: z
    .string({ error: 'Last name is required' })
    .min(2, { error: 'Last name must be at least 2 characters' })
    .max(50, { error: 'Last name must be at most 50 characters' }),
  employeeId: z
    .string({ error: 'Employee ID is required' })
    .regex(/^EMP-\d{4,}$/, { error: 'Employee ID must match pattern EMP-XXXX' }),
  email: z
    .string({ error: 'Email is required' })
    .email({ error: 'Please enter a valid email address' }),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, { error: 'Please enter a valid phone number' })
    .optional()
    .or(z.literal('')),
  department: z.string({ error: 'Department is required' }).min(1, { error: 'Department is required' }),
  role: z.enum(userRoleValues, { error: 'Role is required' }),
  status: z.enum(userStatusValues, { error: 'Status is required' }),
  avatar: z.string().optional().or(z.literal('')),
  notes: z
    .string()
    .max(500, { error: 'Notes must be at most 500 characters' })
    .optional()
    .or(z.literal('')),
})

export const updateUserSchema = z.object({
  firstName: z
    .string({ error: 'First name is required' })
    .min(2, { error: 'First name must be at least 2 characters' })
    .max(50, { error: 'First name must be at most 50 characters' }),
  lastName: z
    .string({ error: 'Last name is required' })
    .min(2, { error: 'Last name must be at least 2 characters' })
    .max(50, { error: 'Last name must be at most 50 characters' }),
  email: z
    .string({ error: 'Email is required' })
    .email({ error: 'Please enter a valid email address' }),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, { error: 'Please enter a valid phone number' })
    .optional()
    .or(z.literal('')),
  department: z.string({ error: 'Department is required' }).min(1, { error: 'Department is required' }),
  role: z.enum(userRoleValues, { error: 'Role is required' }),
  status: z.enum(userStatusValues, { error: 'Status is required' }),
  avatar: z.string().optional().or(z.literal('')),
  notes: z
    .string()
    .max(500, { error: 'Notes must be at most 500 characters' })
    .optional()
    .or(z.literal('')),
})

export type UserFormValues = z.infer<typeof createUserSchema>
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>

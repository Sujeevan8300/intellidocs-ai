import { z } from 'zod'
import { CategoryStatus } from '../types/Category'

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Category name must be at least 3 characters')
    .max(100, 'Category name must be 100 characters or fewer'),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or fewer')
    .optional()
    .or(z.literal('')),
  parentId: z.number().optional().nullable(),
  status: z.enum([CategoryStatus.ACTIVE, CategoryStatus.INACTIVE], {
    error: 'Please select a status',
  }),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

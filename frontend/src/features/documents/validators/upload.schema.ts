import { z } from 'zod'

export const uploadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Document name is required')
    .max(200, 'Document name must be 200 characters or fewer'),
  category: z.string().min(1, 'Please select a category'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description must be 1000 characters or fewer')
    .optional()
    .or(z.literal('')),
  tags: z.array(z.string()).optional().default([]),
})

export type UploadFormValues = z.infer<typeof uploadSchema>

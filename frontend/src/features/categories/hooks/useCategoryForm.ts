import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, type CategoryFormValues } from '../validators/category.schema'
import { CategoryStatus } from '../types/Category'
import type { Category } from '../types/Category'

interface UseCategoryFormOptions {
  initialData?: Partial<Category>
}

export function useCategoryForm({ initialData }: UseCategoryFormOptions = {}) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      parentId: initialData?.parentId ?? null,
      status: initialData?.status ?? CategoryStatus.ACTIVE,
    },
    mode: 'onTouched',
  })

  return { form }
}

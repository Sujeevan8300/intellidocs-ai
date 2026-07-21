export const CategoryStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export type CategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus]

export interface RelatedDocument {
  id: string
  name: string
  type: string
}

export interface Category {
  id: number
  name: string
  description: string
  parentId?: number
  parentName?: string
  documentCount: number
  status: CategoryStatus
  createdBy: string
  createdDate: string
  relatedDocuments?: RelatedDocument[]
}

export interface CategoryRequest {
  name: string
  description: string
  parentId?: number
  status: CategoryStatus
}

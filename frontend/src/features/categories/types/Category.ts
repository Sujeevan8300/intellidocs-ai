export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

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

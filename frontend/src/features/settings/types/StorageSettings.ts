export interface IStorageSettings {
  provider: string
  maxStorage: number
  maxStorageUnit: string
  retentionPeriod: number
  retentionUnit: string
  versioningEnabled: boolean
  automaticCleanup: boolean
  usedStorage: number
  totalStorage: number
  storageUnit: string
}

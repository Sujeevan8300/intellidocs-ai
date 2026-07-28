export interface IDocumentSettings {
  maxUploadSize: number
  maxUploadSizeUnit: string
  allowedFileTypes: string[]
  maxFilesPerUpload: number
  ocrEnabled: boolean
  autoProcessing: boolean
  duplicateDetection: boolean
  autoCategorization: boolean
}

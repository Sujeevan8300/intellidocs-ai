import type { IAISettings } from '../types/AISettings'
import type { IDocumentSettings } from '../types/DocumentSettings'
import type { ISearchSettings } from '../types/SearchSettings'
import type { IStorageSettings } from '../types/StorageSettings'

export const MOCK_AI_SETTINGS: IAISettings = {
  provider: 'openai',
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.9,
  streaming: true,
  responseTimeout: 60,
  chatMemory: true,
  defaultPrompt: 'You are an intelligent knowledge base assistant. Answer questions based on the provided context. If the context does not contain enough information, say so clearly.',
}

export const MOCK_DOCUMENT_SETTINGS: IDocumentSettings = {
  maxUploadSize: 50,
  maxUploadSizeUnit: 'MB',
  allowedFileTypes: ['pdf', 'docx', 'txt', 'md', 'csv', 'xlsx'],
  maxFilesPerUpload: 20,
  ocrEnabled: true,
  autoProcessing: true,
  duplicateDetection: true,
  autoCategorization: false,
}

export const MOCK_SEARCH_SETTINGS: ISearchSettings = {
  defaultLimit: 10,
  similarityThreshold: 0.75,
  searchTimeout: 30,
  highlightMatches: true,
  enableSuggestions: true,
  enableRelatedQuestions: true,
}

export const MOCK_STORAGE_SETTINGS: IStorageSettings = {
  provider: 's3',
  maxStorage: 100,
  maxStorageUnit: 'GB',
  retentionPeriod: 365,
  retentionUnit: 'days',
  versioningEnabled: true,
  automaticCleanup: false,
  usedStorage: 68,
  totalStorage: 100,
  storageUnit: 'GB',
}

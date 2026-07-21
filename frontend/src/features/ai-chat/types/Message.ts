import type { Citation } from './Citation'
export type MessageRole = 'user' | 'assistant'
export interface Message { id: string; conversationId: string; role: MessageRole; content: string; createdAt: string; citations?: Citation[] }

import type { Message } from '../types/Message'
export interface ChatService { sendMessage(input: { conversationId: string; prompt: string }): Promise<Message> }

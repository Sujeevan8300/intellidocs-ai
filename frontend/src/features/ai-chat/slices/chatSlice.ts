import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockConversations } from '../mocks/conversations'
import { mockMessages } from '../mocks/messages'
import type { ChatState } from '../types/Chat'
import type { Conversation } from '../types/Conversation'
import type { Message } from '../types/Message'
const initialState: ChatState = { conversations: mockConversations, messages: mockMessages, selectedConversationId: 'conv-1', isTyping: false, currentPrompt: '' }
const chatSlice = createSlice({ name: 'chat', initialState, reducers: {
  selectConversation: (state, action: PayloadAction<string | null>) => { state.selectedConversationId = action.payload },
  createConversation: (state, action: PayloadAction<Conversation>) => { state.conversations.unshift(action.payload); state.messages[action.payload.id] = []; state.selectedConversationId = action.payload.id },
  renameConversation: (state, action: PayloadAction<{ id: string; title: string }>) => { const item = state.conversations.find((conversation) => conversation.id === action.payload.id); if (item) item.title = action.payload.title },
  removeConversation: (state, action: PayloadAction<string>) => { state.conversations = state.conversations.filter((conversation) => conversation.id !== action.payload); delete state.messages[action.payload]; if (state.selectedConversationId === action.payload) state.selectedConversationId = state.conversations[0]?.id ?? null },
  appendMessage: (state, action: PayloadAction<Message>) => { const existing = state.messages[action.payload.conversationId] ?? []; existing.push(action.payload); state.messages[action.payload.conversationId] = existing; const conversation = state.conversations.find((item) => item.id === action.payload.conversationId); if (conversation) { conversation.preview = action.payload.content.replace(/[#*`]/g, '').slice(0, 42); conversation.updatedAt = 'Just now'; conversation.messageCount = existing.length } },
  setTyping: (state, action: PayloadAction<boolean>) => { state.isTyping = action.payload }, setCurrentPrompt: (state, action: PayloadAction<string>) => { state.currentPrompt = action.payload },
} })
export const { selectConversation, createConversation, renameConversation, removeConversation, appendMessage, setTyping, setCurrentPrompt } = chatSlice.actions
export default chatSlice.reducer

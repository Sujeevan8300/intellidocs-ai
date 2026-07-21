import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { mockChatService } from '../api/mockChat.service'
import { appendMessage, createConversation, setCurrentPrompt, setTyping } from '../slices/chatSlice'
export function useChat() { const dispatch = useAppDispatch(); const { selectedConversationId, isTyping, currentPrompt } = useAppSelector((state) => state.chat)
  const startConversation = useCallback(() => { const id = crypto.randomUUID(); dispatch(createConversation({ id, title: 'New conversation', preview: 'No messages yet', updatedAt: 'Just now', messageCount: 0 })); return id }, [dispatch])
  const sendMessage = useCallback(async (value?: string) => { const prompt = (value ?? currentPrompt).trim(); if (!prompt || isTyping) return; const conversationId = selectedConversationId ?? startConversation(); dispatch(appendMessage({ id: crypto.randomUUID(), conversationId, role: 'user', content: prompt, createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) })); dispatch(setCurrentPrompt('')); dispatch(setTyping(true)); try { dispatch(appendMessage(await mockChatService.sendMessage({ conversationId, prompt }))) } finally { dispatch(setTyping(false)) } }, [currentPrompt, dispatch, isTyping, selectedConversationId, startConversation])
  return { sendMessage, startConversation, isTyping, currentPrompt, setPrompt: (value: string) => dispatch(setCurrentPrompt(value)) }
}

export interface SuggestedPrompt { id: string; title: string; prompt: string; icon: 'policy' | 'onboarding' | 'expense' | 'travel' }
export interface ChatState { conversations: import('./Conversation').Conversation[]; messages: Record<string, import('./Message').Message[]>; selectedConversationId: string | null; isTyping: boolean; currentPrompt: string }

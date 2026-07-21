import { EmptyState } from '../EmptyState/EmptyState'
import { MessageBubble } from '../MessageBubble/MessageBubble'
import { TypingIndicator } from '../TypingIndicator/TypingIndicator'
import type { Message } from '../../types/Message'
export function ChatWindow({ messages, isTyping, onSuggestion }: { messages: Message[]; isTyping: boolean; onSuggestion: (prompt: string) => void }) { return <section className={`chat-window ${messages.length === 0 ? 'chat-window--empty' : ''}`}>{messages.length === 0 ? <EmptyState onSelect={onSuggestion} /> : <div className="message-list">{messages.map((message) => <MessageBubble key={message.id} message={message} />)}{isTyping && <TypingIndicator />}</div>}</section> }

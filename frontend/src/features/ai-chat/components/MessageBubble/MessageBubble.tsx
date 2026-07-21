import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import ReactMarkdown from 'react-markdown'
import type { Message } from '../../types/Message'
import { markdownComponents } from '../../utils/markdown'
import { MessageActions } from '../MessageActions/MessageActions'
import { SourceCitation } from '../SourceCitation/SourceCitation'
export function MessageBubble({ message }: { message: Message }) { const isUser = message.role === 'user'; return <article className={`chat-message ${isUser ? 'chat-message--user' : ''}`}><Avatar className={isUser ? 'message-avatar user' : 'message-avatar ai'}>{isUser ? <UserOutlined /> : 'i'}</Avatar><div className="message-content"><div className="message-name"><strong>{isUser ? 'You' : 'IntelliDocs AI'}</strong><span>{message.createdAt}</span></div>{isUser ? <p className="user-copy">{message.content}</p> : <div className="markdown-body"><ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown></div>}{message.citations && <div className="citations"><span className="citation-label">SOURCES</span>{message.citations.map((citation) => <SourceCitation key={citation.id} citation={citation} />)}</div>}{!isUser && <MessageActions />}</div></article> }

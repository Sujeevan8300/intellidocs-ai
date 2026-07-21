import { RobotOutlined } from '@ant-design/icons'
import { SuggestedPrompts } from '../SuggestedPrompts/SuggestedPrompts'
export function EmptyState({ onSelect }: { onSelect: (prompt: string) => void }) { return <div className="empty-chat"><span className="empty-logo"><RobotOutlined /></span><h1>Welcome to IntelliDocs AI</h1><p>Your secure assistant for finding answers in your organization’s knowledge.</p><SuggestedPrompts onSelect={onSelect} /></div> }

import { BookOutlined, DollarOutlined, GlobalOutlined, RocketOutlined } from '@ant-design/icons'
import { mockSuggestions } from '../../mocks/suggestions'
const icons = { policy: <BookOutlined />, onboarding: <RocketOutlined />, expense: <DollarOutlined />, travel: <GlobalOutlined /> }
export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) { return <section className="suggested-prompts"><h2>How can I help you today?</h2><p>Ask anything about your organization’s knowledge.</p><div>{mockSuggestions.map((suggestion) => <button key={suggestion.id} onClick={() => onSelect(suggestion.prompt)}><span>{icons[suggestion.icon]}</span><strong>{suggestion.title}</strong></button>)}</div></section> }

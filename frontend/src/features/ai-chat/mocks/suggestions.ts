import type { SuggestedPrompt } from '../types/Chat'
export const mockSuggestions: SuggestedPrompt[] = [
  { id: 'leave', title: 'Explain company leave policy', prompt: 'Explain our company leave policy and how to request time off.', icon: 'policy' },
  { id: 'onboarding', title: 'Summarize onboarding process', prompt: 'Summarize the onboarding process for a new employee.', icon: 'onboarding' },
  { id: 'expense', title: 'What are reimbursement rules?', prompt: 'What are the reimbursement rules for business expenses?', icon: 'expense' },
  { id: 'travel', title: 'Find travel policy', prompt: 'Find and explain our business travel policy.', icon: 'travel' },
]

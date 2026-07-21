import type { Message } from '../types/Message'
export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    { id: 'msg-1', conversationId: 'conv-1', role: 'user', content: 'What is our company leave policy?', createdAt: '10:40 AM' },
    { id: 'msg-2', conversationId: 'conv-1', role: 'assistant', createdAt: '10:40 AM', content: "## Leave policy\n\nEmployees are eligible for paid time off from their first day. The standard annual allocation is:\n\n- **14 days** of annual leave\n- **7 days** of casual leave\n- **10 public holidays** observed locally\n\nLeave requests should be submitted in Workday at least **five business days** ahead of time. Your manager will receive a notification to approve the request.\n\n> Unused annual leave may be carried forward up to 5 days, subject to local employment regulations.", citations: [{ id: 'cite-1', documentName: 'HR Policy Handbook 2024', page: 12, excerpt: 'Section 4.1 · Annual leave entitlement' }, { id: 'cite-2', documentName: 'Employee Handbook', page: 28, excerpt: 'Time-off request procedure' }] },
    { id: 'msg-3', conversationId: 'conv-1', role: 'user', content: 'Can I carry unused leave into next year?', createdAt: '10:42 AM' },
    { id: 'msg-4', conversationId: 'conv-1', role: 'assistant', createdAt: '10:42 AM', content: 'Yes. You can carry forward up to **5 unused annual-leave days** into the following calendar year. Any balance above that limit expires on December 31 unless an exception is approved by People Operations.', citations: [{ id: 'cite-3', documentName: 'HR Policy Handbook 2024', page: 13, excerpt: 'Section 4.3 · Carry-forward policy' }] },
  ],
}

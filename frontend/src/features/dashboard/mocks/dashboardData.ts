import type { Activity, DocumentRow } from '../types'

export const recentDocuments: DocumentRow[] = [
  { id: '1', name: 'Employee Handbook 2024', type: 'PDF', size: '4.2 MB', updated: '2026-07-27T10:48:00', status: 'Processed', owner: 'SM' },
  { id: '2', name: 'Q2 Product Roadmap', type: 'DOCX', size: '1.8 MB', updated: '2026-07-27T09:42:00', status: 'Processed', owner: 'AM' },
  { id: '3', name: 'Information Security Policy', type: 'PDF', size: '2.6 MB', updated: '2026-07-26T14:30:00', status: 'Processing', owner: 'JL' },
  { id: '4', name: 'Customer Success Playbook', type: 'PDF', size: '8.1 MB', updated: '2026-07-26T09:15:00', status: 'Needs review', owner: 'SM' },
]

export const recentActivities: Activity[] = [
  { id: '1', type: 'upload', title: 'Sarah Miller uploaded a document', meta: 'Employee Handbook 2024', timestamp: '2026-07-27T10:42:00' },
  { id: '2', type: 'chat', title: 'AI Assistant conversation completed', meta: 'Q2 marketing strategy', timestamp: '2026-07-27T10:18:00' },
  { id: '3', type: 'edit', title: 'Document processing completed', meta: 'Annual Compliance Report', timestamp: '2026-07-27T09:50:00' },
  { id: '4', type: 'user', title: 'New team member joined', meta: 'Jordan Lee', timestamp: '2026-07-27T09:30:00' },
  { id: '5', type: 'upload', title: 'David Chen uploaded a document', meta: 'Engineering Architecture Docs', timestamp: '2026-07-27T08:45:00' },
  { id: '6', type: 'chat', title: 'AI Assistant conversation completed', meta: 'Remote work policy guidelines', timestamp: '2026-07-27T08:20:00' },
]

export const usageData = {
  total: 84_392,
  changePercent: 18.2,
  points: [
    { date: '2026-05-01', value: 2200 },
    { date: '2026-05-05', value: 2800 },
    { date: '2026-05-10', value: 3100 },
    { date: '2026-05-15', value: 2400 },
    { date: '2026-05-20', value: 3500 },
    { date: '2026-05-25', value: 4200 },
    { date: '2026-05-30', value: 5100 },
  ],
}

export const healthServices = [
  { name: 'API services', status: 'Operational' as const },
  { name: 'AI processing', status: 'Operational' as const },
  { name: 'Document indexing', status: 'Operational' as const },
  { name: 'Search engine', status: 'Operational' as const },
]

export const metricsData = [
  { label: 'Total documents', value: '1,284', delta: '12.5%', positive: true, detail: 'vs. last month' },
  { label: 'AI conversations', value: '3,842', delta: '18.2%', positive: true, detail: 'vs. last month' },
  { label: 'Active users', value: '248', delta: '4.1%', positive: true, detail: 'vs. last month' },
  { label: 'Processing queue', value: '12', delta: '2.4%', positive: false, detail: 'documents in progress' },
]

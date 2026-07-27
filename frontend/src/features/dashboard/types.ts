export interface Activity {
  id: string
  title: string
  meta: string
  type: 'upload' | 'chat' | 'edit' | 'user'
  timestamp: string
}

export interface DocumentRow {
  id: string
  name: string
  type: string
  size: string
  updated: string
  status: 'Processed' | 'Processing' | 'Needs review'
  owner: string
}

export interface DashboardMetrics {
  label: string
  value: string
  delta: string
  positive: boolean
  detail: string
}

export interface UsageMetric {
  total: number
  changePercent: number
  points: { date: string; value: number }[]
}

export interface HealthService {
  name: string
  status: 'Operational' | 'Degraded' | 'Down'
}

export interface DashboardState {
  metrics: DashboardMetrics[]
  recentDocuments: DocumentRow[]
  activities: Activity[]
  usage: UsageMetric
  healthServices: HealthService[]
  loading: boolean
  error: string | undefined
}

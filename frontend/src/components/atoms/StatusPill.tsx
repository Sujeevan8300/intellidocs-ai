import { Tag } from 'antd'
export type StatusTone = 'success' | 'processing' | 'warning' | 'default'
export function StatusPill({ label, tone = 'default' }: { label: string; tone?: StatusTone }) {
  return <Tag className="status-pill" color={tone === 'default' ? undefined : tone}>{label}</Tag>
}

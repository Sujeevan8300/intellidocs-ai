import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import type { ReactNode } from 'react'
export function MetricCard({ label, value, delta, positive = true, icon, detail }: { label: string; value: string; delta: string; positive?: boolean; icon: ReactNode; detail: string }) {
  return <Card className="metric-card" bordered={false}><div className="metric-card__top"><span className="metric-card__icon">{icon}</span><span className={positive ? 'metric-card__delta positive' : 'metric-card__delta negative'}>{positive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {delta}</span></div><div className="metric-card__value">{value}</div><div className="metric-card__label">{label}</div><div className="metric-card__detail">{detail}</div></Card>
}

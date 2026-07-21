import { useSelector } from 'react-redux'
import { Skeleton } from 'antd'
import {
  TeamOutlined,
  CheckCircleOutlined,
  StopOutlined,
  LockOutlined,
  WifiOutlined,
} from '@ant-design/icons'
import type { RootState } from '../../../../store'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  color: string
  bgColor: string
}

function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div className="usr-stat-card">
      <div className="usr-stat-icon" style={{ background: bgColor, color }}>{icon}</div>
      <div className="usr-stat-info">
        <span className="usr-stat-value">{value}</span>
        <span className="usr-stat-label">{label}</span>
      </div>
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="usr-stat-card">
      <Skeleton.Avatar active size={40} shape="square" />
      <div className="usr-stat-info">
        <Skeleton.Input active size="small" style={{ width: 48, height: 20 }} />
        <Skeleton.Input active size="small" style={{ width: 72, height: 12 }} />
      </div>
    </div>
  )
}

export function StatisticsCards() {
  const { stats, loading } = useSelector((state: RootState) => state.users)

  if (loading) {
    return (
      <div className="usr-stats-cards">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    )
  }

  return (
    <div className="usr-stats-cards">
      <StatCard
        icon={<TeamOutlined />}
        label="Total Users"
        value={stats.total}
        color="#6558e8"
        bgColor="#eeecff"
      />
      <StatCard
        icon={<CheckCircleOutlined />}
        label="Active Users"
        value={stats.active}
        color="#10b981"
        bgColor="#ecfdf5"
      />
      <StatCard
        icon={<StopOutlined />}
        label="Inactive Users"
        value={stats.inactive}
        color="#f97316"
        bgColor="#fff7ed"
      />
      <StatCard
        icon={<LockOutlined />}
        label="Locked Users"
        value={stats.locked}
        color="#ef4444"
        bgColor="#fef2f2"
      />
      <StatCard
        icon={<WifiOutlined />}
        label="Online Users"
        value={stats.online}
        color="#3b82f6"
        bgColor="#eff6ff"
      />
    </div>
  )
}

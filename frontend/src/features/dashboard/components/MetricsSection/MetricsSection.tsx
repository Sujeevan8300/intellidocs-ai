import { FileTextOutlined, RobotOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { MetricCard } from '../../../../components/molecules/MetricCard'
import type { DashboardMetrics } from '../../types'
import styles from '../../styles/dashboard.module.css'

const iconMap: Record<string, React.ReactNode> = {
  'Total documents': <FileTextOutlined />,
  'AI conversations': <RobotOutlined />,
  'Active users': <TeamOutlined />,
  'Processing queue': <ClockCircleOutlined />,
}

interface MetricsSectionProps {
  metrics: DashboardMetrics[]
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className={styles.metricGrid}>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          delta={metric.delta}
          positive={metric.positive}
          icon={iconMap[metric.label] ?? <FileTextOutlined />}
          detail={metric.detail}
        />
      ))}
    </section>
  )
}

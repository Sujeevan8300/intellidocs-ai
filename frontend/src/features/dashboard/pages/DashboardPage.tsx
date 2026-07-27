import { Alert, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../hooks/store'
import { useDashboard } from '../hooks/useDashboard'
import { WelcomeSection } from '../components/WelcomeSection/WelcomeSection'
import { MetricsSection } from '../components/MetricsSection/MetricsSection'
import { UsagePanel } from '../components/UsagePanel/UsagePanel'
import { HealthPanel } from '../components/HealthPanel/HealthPanel'
import { RecentDocuments } from '../components/RecentDocuments/RecentDocuments'
import { ActivityFeed } from '../components/ActivityFeed/ActivityFeed'
import { DashboardSkeleton } from '../components/DashboardSkeleton/DashboardSkeleton'
import styles from '../styles/dashboard.module.css'

export function DashboardPage() {
  const { greeting, formattedDate, metrics, recentDocuments, activities, usage, healthServices, loading, error } = useDashboard()
  const userName = useAppSelector((state) => state.auth.user?.name ?? 'User')

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <Alert type="error" message="Failed to load dashboard" description={error} showIcon />
        <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <WelcomeSection
        greeting={greeting}
        userName={userName}
        formattedDate={formattedDate}
      />

      <MetricsSection metrics={metrics} />

      <div className={styles.dashboardGrid}>
        <UsagePanel usage={usage} />
        <HealthPanel services={healthServices} />
      </div>

      <div className={styles.lowerGrid}>
        <RecentDocuments documents={recentDocuments} />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  )
}

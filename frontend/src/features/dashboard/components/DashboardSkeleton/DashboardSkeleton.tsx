import { Skeleton } from 'antd'
import styles from '../../styles/dashboard.module.css'

export function DashboardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonWelcome}>
        <Skeleton.Input active style={{ width: 120, height: 14 }} />
        <Skeleton.Input active style={{ width: 320, height: 32, marginTop: 8 }} />
        <Skeleton.Input active style={{ width: 260, height: 14, marginTop: 8 }} />
      </div>

      <div className={styles.skeletonMetrics}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonMetricCard}>
            <div className={styles.skeletonMetricTop}>
              <Skeleton.Avatar active size="small" shape="square" />
              <Skeleton.Input active style={{ width: 48, height: 16 }} />
            </div>
            <Skeleton.Input active style={{ width: 80, height: 28, marginTop: 16 }} />
            <Skeleton.Input active style={{ width: 100, height: 12, marginTop: 8 }} />
          </div>
        ))}
      </div>

      <div className={styles.skeletonPanels}>
        <div className={styles.skeletonPanel}>
          <Skeleton.Input active style={{ width: 140, height: 18 }} />
          <Skeleton.Input active style={{ width: 200, height: 12, marginTop: 4 }} />
          <Skeleton.Input active style={{ width: 100, height: 24, marginTop: 16 }} />
          <Skeleton.Input active block style={{ height: 171, marginTop: 12 }} />
        </div>
        <div className={styles.skeletonPanel}>
          <Skeleton.Input active style={{ width: 120, height: 18 }} />
          <Skeleton.Input active style={{ width: 160, height: 12, marginTop: 4 }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <Skeleton.Avatar active size={116} shape="circle" />
          </div>
        </div>
      </div>

      <div className={styles.skeletonPanels}>
        <div className={styles.skeletonPanel}>
          <Skeleton.Input active style={{ width: 160, height: 18 }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} active avatar paragraph={{ rows: 1 }} style={{ marginTop: 12 }} />
          ))}
        </div>
        <div className={styles.skeletonPanel}>
          <Skeleton.Input active style={{ width: 140, height: 18 }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} active avatar paragraph={{ rows: 1 }} style={{ marginTop: 12 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

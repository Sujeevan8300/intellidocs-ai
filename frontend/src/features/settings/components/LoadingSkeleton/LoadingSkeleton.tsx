import { Skeleton } from 'antd'
import styles from '../../styles/settings.module.css'

export function LoadingSkeleton() {
  return (
    <div className={styles.loadingSkeleton}>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton active paragraph={{ rows: 3 }} />
    </div>
  )
}

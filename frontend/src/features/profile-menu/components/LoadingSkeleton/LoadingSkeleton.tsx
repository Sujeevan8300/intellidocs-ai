import React from 'react'
import { Skeleton } from 'antd'
import styles from '../../styles/profileMenu.module.css'

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonPanel} role="status" aria-label="Loading profile">
      <div className={styles.skeletonHeader}>
        <Skeleton.Avatar active size={40} shape="circle" />
        <div className={styles.skeletonLines}>
          <Skeleton.Input active style={{ width: 120, height: 14, borderRadius: 4 }} />
          <Skeleton.Input active style={{ width: 80, height: 12, borderRadius: 4 }} />
        </div>
      </div>
      <Skeleton.Input active style={{ width: 160, height: 12, borderRadius: 4 }} />
      <div className={styles.skeletonDivider} />
      <div className={styles.skeletonMenuItems}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton.Input
            key={i}
            active
            style={{ width: '100%', height: 14, borderRadius: 4 }}
          />
        ))}
      </div>
      <span className="sr-only">Loading profile information...</span>
    </div>
  )
}

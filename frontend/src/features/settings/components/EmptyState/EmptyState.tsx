import { InboxOutlined } from '@ant-design/icons'
import styles from '../../styles/settings.module.css'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({ title = 'No settings available', description = 'Settings will appear here once configured.' }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <InboxOutlined className={styles.emptyStateIcon} />
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateDesc}>{description}</p>
    </div>
  )
}

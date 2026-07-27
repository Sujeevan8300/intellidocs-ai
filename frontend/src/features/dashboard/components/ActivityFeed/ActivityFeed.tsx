import { ArrowRightOutlined, CheckCircleFilled, FileTextOutlined, RobotOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import type { Activity } from '../../types'
import styles from '../../styles/dashboard.module.css'

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

const activityIcon = (type: Activity['type']) => {
  const map: Record<Activity['type'], React.ReactNode> = {
    upload: <FileTextOutlined />,
    chat: <RobotOutlined />,
    edit: <CheckCircleFilled />,
    user: <TeamOutlined />,
  }
  return map[type]
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card
      className={`${styles.panel} ${styles.activityPanel}`}
      bordered={false}
      title={
        <div>
          <h2>Recent activity</h2>
          <span>Latest updates across your workspace</span>
        </div>
      }
      extra={
        <Link to="/" className={styles.viewLink}>
          View all
        </Link>
      }
    >
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div className={styles.activity} key={activity.id}>
            <span className={`${styles.activityIcon} ${styles[`activityIcon_${activity.type}`]}`}>
              {activityIcon(activity.type)}
            </span>
            <div>
              <strong>{activity.title}</strong>
              <span>{activity.meta} &middot; {timeAgo(activity.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.tip}>
        <ThunderboltOutlined />
        <div>
          <strong>Get more from IntelliDocs</strong>
          <span>Invite your team and unlock shared knowledge.</span>
        </div>
        <ArrowRightOutlined />
      </div>
    </Card>
  )
}

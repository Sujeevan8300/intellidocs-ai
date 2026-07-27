import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Permission } from '../../../../components/atoms/Permission'
import { Permissions } from '../../../../constants/permissions'
import styles from '../../styles/dashboard.module.css'

interface WelcomeSectionProps {
  greeting: string
  userName: string
  formattedDate: string
}

export function WelcomeSection({ greeting, userName, formattedDate }: WelcomeSectionProps) {
  return (
    <section className={styles.welcomeRow}>
      <div>
        <p className={styles.eyebrow}>{formattedDate}</p>
        <h1 className={styles.welcomeHeading}>
          {greeting}, {userName} <span>&#10022;</span>
        </h1>
        <p className={styles.subtle}>
          Here's what's happening with your knowledge base today.
        </p>
      </div>
      <Permission permission={Permissions.documentCreate}>
        <Link to="/documents/upload">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            Upload document
          </Button>
        </Link>
      </Permission>
    </section>
  )
}

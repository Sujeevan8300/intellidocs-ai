import { ArrowRightOutlined } from '@ant-design/icons'
import { Card, Dropdown } from 'antd'
import type { UsageMetric } from '../../types'
import { UsageChart } from '../UsageChart'
import styles from '../../styles/dashboard.module.css'

interface UsagePanelProps {
  usage: UsageMetric
}

export function UsagePanel({ usage }: UsagePanelProps) {
  return (
    <Card
      className={`${styles.panel} ${styles.usagePanel}`}
      bordered={false}
      title={
        <div>
          <h2>AI usage</h2>
          <span>Requests made over the last 30 days</span>
        </div>
      }
      extra={
        <Dropdown menu={{ items: [{ key: '30', label: 'Last 30 days' }, { key: '90', label: 'Last 90 days' }] }}>
          <button className={styles.periodButton}>
            Last 30 days <ArrowRightOutlined />
          </button>
        </Dropdown>
      }
    >
      <div className={styles.usageTotal}>
        <strong>{usage.total.toLocaleString()}</strong>
        <span>
          <b>+{usage.changePercent}%</b> vs. previous period
        </span>
      </div>
      <UsageChart points={usage.points} />
    </Card>
  )
}

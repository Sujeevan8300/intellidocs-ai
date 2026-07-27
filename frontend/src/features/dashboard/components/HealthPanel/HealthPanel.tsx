import { ArrowRightOutlined } from '@ant-design/icons'
import { Card, Progress } from 'antd'
import { Link } from 'react-router-dom'
import type { HealthService } from '../../types'
import styles from '../../styles/dashboard.module.css'

interface HealthPanelProps {
  services: HealthService[]
}

const statusColor: Record<string, string> = {
  Operational: '#32b283',
  Degraded: '#eab308',
  Down: '#ef4444',
}

export function HealthPanel({ services }: HealthPanelProps) {
  const allOperational = services.every((s) => s.status === 'Operational')
  const uptime = 99.9

  return (
    <Card
      className={`${styles.panel} ${styles.healthPanel}`}
      bordered={false}
      title={
        <div>
          <h2>System health</h2>
          <span>{allOperational ? 'All systems operational' : 'Some systems degraded'}</span>
        </div>
      }
    >
      <div className={styles.healthScore}>
        <Progress
          type="circle"
          percent={uptime}
          size={116}
          strokeWidth={9}
          strokeColor="#32b283"
          format={() => (
            <>
              <b>{uptime}%</b>
              <span>uptime</span>
            </>
          )}
        />
      </div>
      <div className={styles.healthList}>
        {services.map((service) => (
          <div key={service.name}>
            <span
              className={styles.healthDot}
              style={{ background: statusColor[service.status] }}
            />
            {service.name}
            <strong style={{ color: statusColor[service.status] }}>
              {service.status}
            </strong>
          </div>
        ))}
      </div>
      <Link to="/" className={styles.viewLink}>
        View system status <ArrowRightOutlined />
      </Link>
    </Card>
  )
}

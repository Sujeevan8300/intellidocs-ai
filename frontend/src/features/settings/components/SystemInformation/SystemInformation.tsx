import { Card, Descriptions } from 'antd'
import type { ISystemInfo } from '../../types/SystemInfo'
import styles from '../../styles/settings.module.css'

interface SystemInformationProps {
  systemInfo: ISystemInfo | null
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export function SystemInformation({ systemInfo }: SystemInformationProps) {
  if (!systemInfo) return null

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Application">
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Application Version">{systemInfo.applicationVersion}</Descriptions.Item>
          <Descriptions.Item label="Frontend Version">{systemInfo.frontendVersion}</Descriptions.Item>
          <Descriptions.Item label="Backend Version">{systemInfo.backendVersion}</Descriptions.Item>
          <Descriptions.Item label="Environment">{systemInfo.environment}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className={styles.sectionCard} title="Infrastructure">
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Database">{systemInfo.database}</Descriptions.Item>
          <Descriptions.Item label="AI Provider">{systemInfo.aiProvider}</Descriptions.Item>
          <Descriptions.Item label="Build Date">{formatDate(systemInfo.buildDate)}</Descriptions.Item>
          <Descriptions.Item label="Last Deployment">{formatDate(systemInfo.lastDeployment)}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

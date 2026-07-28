import { Form, InputNumber, Switch, Card, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IAuditSettings } from '../../types/AuditSettings'
import styles from '../../styles/settings.module.css'

interface AuditSettingsProps {
  form: UseFormReturn<IAuditSettings>
}

export function AuditSettings({ form }: AuditSettingsProps) {
  const { control, watch, formState: { errors } } = form
  const enabled = watch('enabled')

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Audit Logging">
        <Form layout="vertical">
          <Controller name="enabled" control={control} render={({ field }) => (
            <Form.Item label="Enable Audit Logs" valuePropName="checked"
              help="Track and record all system activity for compliance">
              <Switch {...field} />
            </Form.Item>
          )} />
          {enabled && (
            <>
              <Controller name="retentionDays" control={control} render={({ field }) => (
                <Form.Item label="Log Retention (days)" required help={errors.retentionDays?.message || "How long audit logs are retained before automatic cleanup"}>
                  <InputNumber {...field} min={7} max={3650} style={{ width: '100%' }} addonAfter="days" />
                </Form.Item>
              )} />
              <div className={styles.formGrid}>
                <Controller name="trackLoginActivity" control={control} render={({ field }) => (
                  <Form.Item label="Track Login Activity" valuePropName="checked"
                    help="Record login attempts, logouts, and session events">
                    <Switch {...field} />
                  </Form.Item>
                )} />
                <Controller name="trackUserActions" control={control} render={({ field }) => (
                  <Form.Item label="Track User Actions" valuePropName="checked"
                    help="Record document uploads, searches, edits, and deletions">
                    <Switch {...field} />
                  </Form.Item>
                )} />
              </div>
            </>
          )}
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Export">
        <p style={{ fontSize: 13, color: '#6b6880', marginBottom: 16 }}>
          Export audit logs for external analysis or compliance reporting.
        </p>
        <Button icon={<DownloadOutlined />} disabled>Export Audit Logs (Coming Soon)</Button>
      </Card>
    </div>
  )
}

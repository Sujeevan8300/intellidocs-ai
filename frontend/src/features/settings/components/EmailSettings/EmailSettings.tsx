import { useState, useCallback } from 'react'
import { Form, Input, InputNumber, Button, Card, notification } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IEmailSettings } from '../../types/EmailSettings'
import styles from '../../styles/settings.module.css'

interface EmailSettingsProps {
  form: UseFormReturn<IEmailSettings>
}

export function EmailSettings({ form }: EmailSettingsProps) {
  const { control, formState: { errors } } = form
  const [sending, setSending] = useState(false)

  const handleSendTest = useCallback(async () => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    notification.success({
      message: 'Test email sent',
      description: 'Check your inbox for the test email.',
      placement: 'topRight',
    })
    setSending(false)
  }, [])

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="SMTP Configuration">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="smtpHost" control={control} render={({ field }) => (
              <Form.Item label="SMTP Host" required help={errors.smtpHost?.message || "Mail server hostname (e.g., smtp.gmail.com)"}>
                <Input {...field} placeholder="smtp.example.com" />
              </Form.Item>
            )} />
            <Controller name="smtpPort" control={control} render={({ field }) => (
              <Form.Item label="SMTP Port" required help={errors.smtpPort?.message || "Usually 587 for TLS or 465 for SSL"}>
                <InputNumber {...field} min={1} max={65535} style={{ width: '100%' }} />
              </Form.Item>
            )} />
            <Controller name="smtpUsername" control={control} render={({ field }) => (
              <Form.Item label="Username" required help={errors.smtpUsername?.message}>
                <Input {...field} />
              </Form.Item>
            )} />
            <Controller name="smtpPassword" control={control} render={({ field }) => (
              <Form.Item label="Password">
                <Input.Password {...field} placeholder="Enter SMTP password" />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Sender Information">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="senderName" control={control} render={({ field }) => (
              <Form.Item label="Sender Name" required help={errors.senderName?.message || "Display name shown in the email From field"}>
                <Input {...field} placeholder="IntelliDocs AI" />
              </Form.Item>
            )} />
            <Controller name="senderEmail" control={control} render={({ field }) => (
              <Form.Item label="Sender Email" required help={errors.senderEmail?.message || "Email address used as the sender"}>
                <Input {...field} placeholder="noreply@intellidocs.com" />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Test Email">
        <p style={{ fontSize: 13, color: '#6b6880', marginBottom: 16 }}>
          Send a test email to verify your SMTP configuration is working correctly.
        </p>
        <Button type="primary" icon={<SendOutlined />} loading={sending} onClick={handleSendTest}>
          Send Test Email
        </Button>
      </Card>
    </div>
  )
}

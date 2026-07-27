import { useState, useCallback } from 'react'
import { Button, Card, Form, Select, Switch, Divider, notification } from 'antd'
import styles from '../styles/settings.module.css'

export function PreferencesPage() {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields()
      setSaving(true)
      await new Promise((r) => setTimeout(r, 600))
      notification.success({
        message: 'Preferences saved',
        description: 'Your preferences have been updated.',
        placement: 'topRight',
      })
      void values
    } catch {
      // validation failed
    } finally {
      setSaving(false)
    }
  }, [form])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Preferences</h1>
          <p className={styles.pageSubtitle}>Customize your IntelliDocs experience</p>
        </div>
      </div>

      <Card className={styles.sectionCard} title="Appearance">
        <Form
          form={form}
          layout="vertical"
          initialValues={{ theme: 'light', compactMode: false, language: 'en' }}
          className={styles.formRow}
        >
          <Form.Item name="theme" label="Theme">
            <Select
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System Default' },
              ]}
            />
          </Form.Item>
          <Form.Item name="compactMode" label="Compact Mode" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Divider style={{ margin: '4px 0 20px' }} />

          <Form.Item name="language" label="Language">
            <Select
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
              ]}
            />
          </Form.Item>

          <Divider style={{ margin: '4px 0 20px' }} />

          <Form.Item name="emailNotifications" label="Email Notifications" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="desktopNotifications" label="Desktop Notifications" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="weeklyDigest" label="Weekly Digest Email" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
            <Button onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" loading={saving} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

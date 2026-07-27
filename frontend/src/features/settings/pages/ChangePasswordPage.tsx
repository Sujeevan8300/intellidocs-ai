import { useState, useCallback } from 'react'
import { Button, Card, Form, Input, Alert, notification } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import styles from '../styles/settings.module.css'

export function ChangePasswordPage() {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)

  const newPassword = Form.useWatch('newPassword', form)

  const handleChangePassword = useCallback(async () => {
    try {
      const values = await form.validateFields()
      setSaving(true)
      await new Promise((r) => setTimeout(r, 800))
      notification.success({
        message: 'Password changed',
        description: 'Your password has been updated successfully.',
        placement: 'topRight',
      })
      form.resetFields()
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
          <h1 className={styles.pageTitle}>Change Password</h1>
          <p className={styles.pageSubtitle}>Update your password to keep your account secure</p>
        </div>
      </div>

      <Card className={styles.sectionCard} title="Update Password">
        <Alert
          message="For your security, choose a strong password that you don't use elsewhere."
          type="info"
          showIcon
          icon={<LockOutlined />}
          style={{ marginBottom: 24, borderRadius: 8 }}
        />
        <Form
          form={form}
          layout="vertical"
          className={styles.formRow}
          style={{ maxWidth: 480 }}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Enter your current password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            rules={[
              { required: true, message: 'Confirm your new password' },
              { validator: (_, value) => {
                if (value && value !== newPassword) {
                  return Promise.reject(new Error('Passwords do not match'))
                }
                return Promise.resolve()
              }},
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
            <Button onClick={() => form.resetFields()}>Cancel</Button>
            <Button type="primary" loading={saving} onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

import { useState, useCallback } from 'react'
import { Button, Card, Form, Input, Avatar, Upload, notification } from 'antd'
import { UserOutlined, CameraOutlined } from '@ant-design/icons'
import styles from '../styles/settings.module.css'

const MOCK_USER = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@intellidocs.ai',
  department: 'Engineering',
  phone: '+1 (555) 123-4567',
  avatar: '',
}

export function AccountSettingsPage() {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields()
      setSaving(true)
      await new Promise((r) => setTimeout(r, 600))
      notification.success({
        message: 'Settings saved',
        description: 'Your account settings have been updated.',
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
          <h1 className={styles.pageTitle}>Account Settings</h1>
          <p className={styles.pageSubtitle}>Manage your personal information and account details</p>
        </div>
      </div>

      <Card className={styles.sectionCard} title="Profile Picture">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar size={72} src={MOCK_USER.avatar || undefined} icon={<UserOutlined />} />
          <div>
            <Upload showUploadList={false} beforeUpload={() => false}>
              <Button icon={<CameraOutlined />}>Change Photo</Button>
            </Upload>
            <p style={{ fontSize: 12, color: '#8b899c', marginTop: 6, marginBottom: 0 }}>
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </Card>

      <Card className={styles.sectionCard} title="Personal Information">
        <Form
          form={form}
          layout="vertical"
          initialValues={MOCK_USER}
          className={styles.formRow}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
            <Input />
          </Form.Item>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
            <Button onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" loading={saving} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

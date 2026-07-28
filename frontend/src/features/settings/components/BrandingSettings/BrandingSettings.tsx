import { Form, Input, Card, ColorPicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IBrandingSettings } from '../../types/BrandingSettings'
import styles from '../../styles/settings.module.css'

interface BrandingSettingsProps {
  form: UseFormReturn<IBrandingSettings>
}

export function BrandingSettings({ form }: BrandingSettingsProps) {
  const { control } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Logos & Images">
        <Form layout="vertical">
          <Controller name="organizationLogo" control={control} render={({ field }) => (
            <Form.Item label="Organization Logo">
              <div className={styles.uploadArea} onClick={() => {}}>
                <div className={styles.uploadPreview}>
                  {field.value ? <img src={field.value} alt="Logo" /> : <UploadOutlined />}
                </div>
                <div className={styles.uploadText}>
                  <p className={styles.uploadTextTitle}>Upload Logo</p>
                  <p className={styles.uploadTextDesc}>Recommended: 200x50px, PNG or SVG. Max 2MB.</p>
                </div>
              </div>
            </Form.Item>
          )} />
          <Controller name="loginBackground" control={control} render={({ field }) => (
            <Form.Item label="Login Background">
              <div className={styles.uploadArea} onClick={() => {}}>
                <div className={styles.uploadPreview}>
                  {field.value ? <img src={field.value} alt="Background" /> : <UploadOutlined />}
                </div>
                <div className={styles.uploadText}>
                  <p className={styles.uploadTextTitle}>Upload Background</p>
                  <p className={styles.uploadTextDesc}>Recommended: 1920x1080px, JPG or PNG. Max 5MB.</p>
                </div>
              </div>
            </Form.Item>
          )} />
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Brand Colors">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="primaryBrandColor" control={control} render={({ field }) => (
              <Form.Item label="Primary Brand Color" required>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ColorPicker {...field} value={field.value} onChange={(_, hex) => field.onChange(hex)} />
                  <span style={{ fontSize: 13, color: '#6b6880' }}>{field.value}</span>
                </div>
              </Form.Item>
            )} />
            <Controller name="secondaryBrandColor" control={control} render={({ field }) => (
              <Form.Item label="Secondary Brand Color" required>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ColorPicker {...field} value={field.value} onChange={(_, hex) => field.onChange(hex)} />
                  <span style={{ fontSize: 13, color: '#6b6880' }}>{field.value}</span>
                </div>
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Footer">
        <Form layout="vertical">
          <Controller name="footerText" control={control} render={({ field }) => (
            <Form.Item label="Footer Text" help="Displayed at the bottom of the login page">
              <Input {...field} placeholder="Powered by IntelliDocs AI" maxLength={200} showCount />
            </Form.Item>
          )} />
        </Form>
      </Card>

      <div className={styles.previewPanel}>
        <p className={styles.previewPanelTitle}>Brand Preview</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: form.watch('primaryBrandColor') || '#6366f1' }} />
          <div style={{ width: 48, height: 48, borderRadius: 10, background: form.watch('secondaryBrandColor') || '#818cf8' }} />
          <span style={{ fontSize: 13, color: '#6b6880' }}>Brand color pair</span>
        </div>
      </div>
    </div>
  )
}

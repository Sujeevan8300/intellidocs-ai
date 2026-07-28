import { Form, Select, InputNumber, Switch, Card, Tag } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IDocumentSettings } from '../../types/DocumentSettings'
import { FILE_TYPE_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface DocumentSettingsProps {
  form: UseFormReturn<IDocumentSettings>
}

export function DocumentSettings({ form }: DocumentSettingsProps) {
  const { control, formState: { errors } } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Upload Limits">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="maxUploadSize" control={control} render={({ field }) => (
              <Form.Item label="Maximum Upload Size (MB)" required help={errors.maxUploadSize?.message || "Maximum size for a single file upload"}>
                <InputNumber {...field} min={1} max={500} style={{ width: '100%' }} addonAfter="MB" />
              </Form.Item>
            )} />
            <Controller name="maxFilesPerUpload" control={control} render={({ field }) => (
              <Form.Item label="Maximum Files per Upload" required help={errors.maxFilesPerUpload?.message || "Maximum number of files in a single batch upload"}>
                <InputNumber {...field} min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            )} />
          </div>
          <Controller name="allowedFileTypes" control={control} render={({ field }) => (
            <Form.Item label="Allowed File Types" required help={errors.allowedFileTypes?.message || "Select which file types can be uploaded"}>
              <Select {...field} mode="multiple" options={FILE_TYPE_OPTIONS}
                tagRender={({ label, closable, onClose }) => (
                  <Tag closable={closable} onClose={onClose} style={{ margin: '2px 4px 2px 0' }}>
                    {label}
                  </Tag>
                )} />
            </Form.Item>
          )} />
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Processing">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="ocrEnabled" control={control} render={({ field }) => (
              <Form.Item label="OCR Enabled" valuePropName="checked"
                help="Extract text from scanned documents and images">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="autoProcessing" control={control} render={({ field }) => (
              <Form.Item label="Auto Processing" valuePropName="checked"
                help="Automatically process documents after upload">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="duplicateDetection" control={control} render={({ field }) => (
              <Form.Item label="Duplicate Detection" valuePropName="checked"
                help="Detect and flag duplicate document uploads">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="autoCategorization" control={control} render={({ field }) => (
              <Form.Item label={<span>Auto Categorization <Tag color="blue">Coming Soon</Tag></span>} valuePropName="checked"
                help="Automatically assign categories to uploaded documents">
                <Switch {...field} disabled />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>
    </div>
  )
}

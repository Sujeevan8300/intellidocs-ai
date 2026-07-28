import { Form, Select, InputNumber, Switch, Card, Progress } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IStorageSettings } from '../../types/StorageSettings'
import { STORAGE_PROVIDER_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface StorageSettingsProps {
  form: UseFormReturn<IStorageSettings>
}

export function StorageSettings({ form }: StorageSettingsProps) {
  const { control, watch, formState: { errors } } = form
  const usedStorage = watch('usedStorage')
  const totalStorage = watch('totalStorage')
  const percent = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Storage Usage">
        <div className={styles.storageProgress}>
          <div className={styles.storageProgressLabels}>
            <span>{usedStorage} GB used</span>
            <span>{totalStorage} GB total</span>
          </div>
          <Progress percent={percent} strokeColor={percent > 80 ? '#ef4444' : '#6366f1'} />
        </div>
      </Card>

      <Card className={styles.sectionCard} title="Storage Configuration">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="provider" control={control} render={({ field }) => (
              <Form.Item label="Storage Provider" required help={errors.provider?.message || "Cloud or local storage backend"}>
                <Select {...field} options={STORAGE_PROVIDER_OPTIONS} />
              </Form.Item>
            )} />
            <Controller name="maxStorage" control={control} render={({ field }) => (
              <Form.Item label="Maximum Storage" required help={errors.maxStorage?.message || "Total storage allocation limit"}>
                <InputNumber {...field} min={1} max={10000} style={{ width: '100%' }} addonAfter="GB" />
              </Form.Item>
            )} />
            <Controller name="retentionPeriod" control={control} render={({ field }) => (
              <Form.Item label="Retention Period" required help={errors.retentionPeriod?.message || "How long deleted files are retained before permanent removal"}>
                <InputNumber {...field} min={1} max={3650} style={{ width: '100%' }} addonAfter="days" />
              </Form.Item>
            )} />
          </div>
          <div className={styles.formGrid}>
            <Controller name="versioningEnabled" control={control} render={({ field }) => (
              <Form.Item label="Versioning Enabled" valuePropName="checked"
                help="Keep previous versions of uploaded documents">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="automaticCleanup" control={control} render={({ field }) => (
              <Form.Item label="Automatic Cleanup" valuePropName="checked"
                help="Automatically delete files past the retention period">
                <Switch {...field} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>
    </div>
  )
}

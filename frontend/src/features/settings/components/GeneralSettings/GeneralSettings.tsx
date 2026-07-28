import { Form, Input, Select, InputNumber, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IGeneralSettings } from '../../types/GeneralSettings'
import { TIMEZONE_OPTIONS, DATE_FORMAT_OPTIONS, LANGUAGE_OPTIONS, DASHBOARD_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface GeneralSettingsProps {
  form: UseFormReturn<IGeneralSettings>
}

export function GeneralSettings({ form }: GeneralSettingsProps) {
  const { control, formState: { errors } } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Organization">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="organizationName" control={control} render={({ field }) => (
              <Form.Item label="Organization Name" required help={errors.organizationName?.message}>
                <Input {...field} />
              </Form.Item>
            )} />
            <Controller name="applicationName" control={control} render={({ field }) => (
              <Form.Item label="Application Name" required help={errors.applicationName?.message}>
                <Input {...field} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Regional">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="timezone" control={control} render={({ field }) => (
              <Form.Item label="Time Zone" required help={errors.timezone?.message}>
                <Select {...field} options={TIMEZONE_OPTIONS} />
              </Form.Item>
            )} />
            <Controller name="dateFormat" control={control} render={({ field }) => (
              <Form.Item label="Date Format" required help={errors.dateFormat?.message}>
                <Select {...field} options={DATE_FORMAT_OPTIONS} />
              </Form.Item>
            )} />
            <Controller name="language" control={control} render={({ field }) => (
              <Form.Item label="Language" required help={errors.language?.message}>
                <Select {...field} options={LANGUAGE_OPTIONS} />
              </Form.Item>
            )} />
            <Controller name="defaultDashboard" control={control} render={({ field }) => (
              <Form.Item label="Default Dashboard" required help={errors.defaultDashboard?.message}>
                <Select {...field} options={DASHBOARD_OPTIONS} />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Session">
        <Form layout="vertical">
          <Controller name="sessionTimeout" control={control} render={({ field }) => (
            <Form.Item label="Session Timeout (minutes)" required help={errors.sessionTimeout?.message || "How long before an idle user is logged out automatically"}>
              <InputNumber {...field} min={5} max={1440} style={{ width: '100%' }} />
            </Form.Item>
          )} />
        </Form>
      </Card>
    </div>
  )
}

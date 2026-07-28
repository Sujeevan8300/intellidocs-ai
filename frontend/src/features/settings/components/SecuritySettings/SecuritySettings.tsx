import { Form, InputNumber, Select, Switch, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { ISecuritySettings } from '../../types/SecuritySettings'
import { PASSWORD_COMPLEXITY_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface SecuritySettingsProps {
  form: UseFormReturn<ISecuritySettings>
}

export function SecuritySettings({ form }: SecuritySettingsProps) {
  const { control, formState: { errors } } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Password Policy">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="passwordMinLength" control={control} render={({ field }) => (
              <Form.Item label="Minimum Password Length" required help={errors.passwordMinLength?.message || "Minimum number of characters for user passwords"}>
                <InputNumber {...field} min={6} max={128} style={{ width: '100%' }} />
              </Form.Item>
            )} />
            <Controller name="passwordComplexity" control={control} render={({ field }) => (
              <Form.Item label="Password Complexity" required help={errors.passwordComplexity?.message || "Required character complexity level"}>
                <Select {...field} options={PASSWORD_COMPLEXITY_OPTIONS} />
              </Form.Item>
            )} />
          </div>
          <Controller name="requireSpecialCharacters" control={control} render={({ field }) => (
            <Form.Item label="Require Special Characters" valuePropName="checked"
              help="Passwords must contain at least one special character (!@#$%^&*)">
              <Switch {...field} />
            </Form.Item>
          )} />
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Access Control">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="twoFactorAuth" control={control} render={({ field }) => (
              <Form.Item label="Two-Factor Authentication" valuePropName="checked"
                help="Require 2FA for all user accounts">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="accountLockThreshold" control={control} render={({ field }) => (
              <Form.Item label="Account Lock Threshold" required help={errors.accountLockThreshold?.message || "Number of failed login attempts before account lockout"}>
                <InputNumber {...field} min={3} max={20} style={{ width: '100%' }} addonAfter="attempts" />
              </Form.Item>
            )} />
            <Controller name="sessionExpiration" control={control} render={({ field }) => (
              <Form.Item label="Session Expiration" required help={errors.sessionExpiration?.message || "Maximum session duration before re-authentication is required"}>
                <InputNumber {...field} min={5} max={1440} style={{ width: '100%' }} addonAfter="minutes" />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>
    </div>
  )
}

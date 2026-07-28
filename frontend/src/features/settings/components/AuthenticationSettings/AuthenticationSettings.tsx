import { Form, InputNumber, Switch, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IAuthenticationSettings } from '../../types/AuthenticationSettings'
import styles from '../../styles/settings.module.css'

interface AuthenticationSettingsProps {
  form: UseFormReturn<IAuthenticationSettings>
}

export function AuthenticationSettings({ form }: AuthenticationSettingsProps) {
  const { control, formState: { errors } } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Token Configuration">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="jwtExpiration" control={control} render={({ field }) => (
              <Form.Item label="JWT Token Expiration" required help={errors.jwtExpiration?.message || "Access token lifetime before expiry"}>
                <InputNumber {...field} min={5} max={10080} style={{ width: '100%' }} addonAfter="minutes" />
              </Form.Item>
            )} />
            <Controller name="refreshTokenExpiration" control={control} render={({ field }) => (
              <Form.Item label="Refresh Token Expiration" required help={errors.refreshTokenExpiration?.message || "Refresh token lifetime — used to obtain new access tokens"}>
                <InputNumber {...field} min={30} max={43200} style={{ width: '100%' }} addonAfter="minutes" />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Session Options">
        <Form layout="vertical">
          <div className={styles.formGrid}>
            <Controller name="rememberMeEnabled" control={control} render={({ field }) => (
              <Form.Item label="Remember Me Enabled" valuePropName="checked"
                help="Allow users to stay signed in across browser sessions">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="allowMultipleSessions" control={control} render={({ field }) => (
              <Form.Item label="Allow Multiple Sessions" valuePropName="checked"
                help="Allow users to be signed in from multiple devices simultaneously">
                <Switch {...field} />
              </Form.Item>
            )} />
            <Controller name="loginAttempts" control={control} render={({ field }) => (
              <Form.Item label="Max Login Attempts" required help={errors.loginAttempts?.message || "Number of attempts before temporary lockout"}>
                <InputNumber {...field} min={1} max={20} style={{ width: '100%' }} addonAfter="attempts" />
              </Form.Item>
            )} />
          </div>
        </Form>
      </Card>
    </div>
  )
}

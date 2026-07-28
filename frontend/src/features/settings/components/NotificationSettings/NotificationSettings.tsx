import { Form, Switch, Card } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { INotificationSettings } from '../../types/NotificationSettings'
import styles from '../../styles/settings.module.css'

interface NotificationSettingsProps {
  form: UseFormReturn<INotificationSettings>
}

export function NotificationSettings({ form }: NotificationSettingsProps) {
  const { control } = form

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Notification Preferences">
        <Form layout="vertical">
          <div className={styles.notificationGroup}>
            <p className={styles.notificationGroupTitle}>General</p>
            <div className={styles.notificationRow}>
              <span className={styles.notificationRowLabel}>Email Notifications</span>
              <Controller name="emailNotifications" control={control} render={({ field }) => (
                <Switch {...field} />
              )} />
            </div>
            <div className={styles.notificationRow}>
              <span className={styles.notificationRowLabel}>System Notifications</span>
              <Controller name="systemNotifications" control={control} render={({ field }) => (
                <Switch {...field} />
              )} />
            </div>
          </div>

          <div className={styles.notificationGroup}>
            <p className={styles.notificationGroupTitle}>Activity</p>
            <div className={styles.notificationRow}>
              <span className={styles.notificationRowLabel}>Upload Notifications</span>
              <Controller name="uploadNotifications" control={control} render={({ field }) => (
                <Switch {...field} />
              )} />
            </div>
            <div className={styles.notificationRow}>
              <span className={styles.notificationRowLabel}>AI Processing Notifications</span>
              <Controller name="aiProcessingNotifications" control={control} render={({ field }) => (
                <Switch {...field} />
              )} />
            </div>
          </div>

          <div className={styles.notificationGroup}>
            <p className={styles.notificationGroupTitle}>Reports</p>
            <div className={styles.notificationRow}>
              <span className={styles.notificationRowLabel}>Weekly Reports</span>
              <Controller name="weeklyReports" control={control} render={({ field }) => (
                <Switch {...field} />
              )} />
            </div>
          </div>
        </Form>
      </Card>
    </div>
  )
}

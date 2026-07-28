import { Form, Radio, Switch, Card, ColorPicker } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IAppearanceSettings } from '../../types/AppearanceSettings'
import { THEME_OPTIONS, SIDEBAR_STYLE_OPTIONS, TABLE_DENSITY_OPTIONS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

interface AppearanceSettingsProps {
  form: UseFormReturn<IAppearanceSettings>
}

export function AppearanceSettings({ form }: AppearanceSettingsProps) {
  const { control, watch } = form
  const theme = watch('theme')
  const primaryColor = watch('primaryColor')
  const compactMode = watch('compactMode')
  const tableDensity = watch('tableDensity')

  return (
    <div className={styles.formRow}>
      <Card className={styles.sectionCard} title="Theme">
        <Form layout="vertical">
          <Controller name="theme" control={control} render={({ field }) => (
            <Form.Item label="Application Theme">
              <Radio.Group {...field} optionType="button" buttonStyle="solid">
                {THEME_OPTIONS.map((opt) => (
                  <Radio.Button key={opt.value} value={opt.value}>{opt.label}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          )} />
          <Controller name="primaryColor" control={control} render={({ field }) => (
            <Form.Item label="Primary Color">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ColorPicker {...field} value={field.value} onChange={(_, hex) => field.onChange(hex)} />
                <span style={{ fontSize: 13, color: '#6b6880' }}>{field.value}</span>
              </div>
            </Form.Item>
          )} />
          <Controller name="compactMode" control={control} render={({ field }) => (
            <Form.Item label="Compact Mode" valuePropName="checked"
              help="Reduce padding and spacing throughout the interface">
              <Switch {...field} />
            </Form.Item>
          )} />
        </Form>
      </Card>

      <Card className={styles.sectionCard} title="Layout">
        <Form layout="vertical">
          <Controller name="sidebarStyle" control={control} render={({ field }) => (
            <Form.Item label="Sidebar Style">
              <Radio.Group {...field} optionType="button">
                {SIDEBAR_STYLE_OPTIONS.map((opt) => (
                  <Radio.Button key={opt.value} value={opt.value}>{opt.label}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          )} />
          <Controller name="tableDensity" control={control} render={({ field }) => (
            <Form.Item label="Table Density">
              <Radio.Group {...field} optionType="button">
                {TABLE_DENSITY_OPTIONS.map((opt) => (
                  <Radio.Button key={opt.value} value={opt.value}>{opt.label}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          )} />
        </Form>
      </Card>

      <div className={styles.previewPanel}>
        <p className={styles.previewPanelTitle}>Preview</p>
        <div style={{
          background: theme === 'dark' ? '#1a1a2e' : '#fff',
          border: `1px solid ${primaryColor}`,
          borderRadius: 8,
          padding: compactMode ? '12px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: primaryColor }} />
            <span style={{ color: theme === 'dark' ? '#fff' : '#222137', fontWeight: 600, fontSize: 13 }}>IntelliDocs AI</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                height: tableDensity === 'compact' ? 24 : tableDensity === 'comfortable' ? 40 : 32,
                flex: 1,
                background: theme === 'dark' ? '#2a2a3e' : '#f5f3ff',
                borderRadius: 4,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

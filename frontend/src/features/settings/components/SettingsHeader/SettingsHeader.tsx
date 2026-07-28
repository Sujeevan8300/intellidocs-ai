import styles from '../../styles/settings.module.css'

interface SettingsHeaderProps {
  title: string
  description: string
}

export function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <div className={styles.settingsSectionHeader}>
      <h2 className={styles.settingsSectionTitle}>{title}</h2>
      <p className={styles.settingsSectionDesc}>{description}</p>
    </div>
  )
}

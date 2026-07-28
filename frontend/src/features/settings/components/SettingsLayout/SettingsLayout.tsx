import type { PropsWithChildren } from 'react'
import { SettingsSidebar } from '../SettingsSidebar/SettingsSidebar'
import styles from '../../styles/settings.module.css'

interface SettingsLayoutProps extends PropsWithChildren {
  activeSection: string
  onSectionChange: (section: string) => void
  dirtySections: Set<string>
}

export function SettingsLayout({ activeSection, onSectionChange, dirtySections, children }: SettingsLayoutProps) {
  return (
    <div className={styles.settingsLayout}>
      <SettingsSidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        dirtySections={dirtySections}
      />
      <div className={styles.settingsContent}>
        {children}
      </div>
    </div>
  )
}

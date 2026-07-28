import { useCallback, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store'
import { useSettings } from '../hooks/useSettings'
import { useSettingsForm } from '../hooks/useSettingsForm'
import { setActiveSection, clearDirty } from '../slices/settingsSlice'
import type { SettingsSection, SettingsSectionWithSystem } from '../types/SettingsState'
import { SECTION_DESCRIPTIONS } from '../constants/settings.constants'
import { SettingsLayout } from '../components/SettingsLayout/SettingsLayout'
import { SettingsHeader } from '../components/SettingsHeader/SettingsHeader'
import { SaveBar } from '../components/SaveBar/SaveBar'
import { ConfirmDialog } from '../components/ConfirmDialog/ConfirmDialog'
import { LoadingSkeleton } from '../components/LoadingSkeleton/LoadingSkeleton'
import { GeneralSettings } from '../components/GeneralSettings/GeneralSettings'
import { AISettings } from '../components/AISettings/AISettings'
import { DocumentSettings } from '../components/DocumentSettings/DocumentSettings'
import { SearchSettings } from '../components/SearchSettings/SearchSettings'
import { StorageSettings } from '../components/StorageSettings/StorageSettings'
import { SecuritySettings } from '../components/SecuritySettings/SecuritySettings'
import { AuthenticationSettings } from '../components/AuthenticationSettings/AuthenticationSettings'
import { NotificationSettings } from '../components/NotificationSettings/NotificationSettings'
import { AppearanceSettings } from '../components/AppearanceSettings/AppearanceSettings'
import { BrandingSettings } from '../components/BrandingSettings/BrandingSettings'
import { EmailSettings } from '../components/EmailSettings/EmailSettings'
import { AuditSettings } from '../components/AuditSettings/AuditSettings'
import { SystemInformation } from '../components/SystemInformation/SystemInformation'
import styles from '../styles/settings.module.css'

const SECTION_TITLES: Record<SettingsSectionWithSystem, string> = {
  general: 'General Settings',
  ai: 'AI Settings',
  documents: 'Document Processing',
  search: 'Semantic Search',
  storage: 'Storage Settings',
  security: 'Security Settings',
  authentication: 'Authentication Settings',
  notifications: 'Notification Settings',
  appearance: 'Appearance Settings',
  branding: 'Branding Settings',
  email: 'Email Settings',
  audit: 'Audit Settings',
  system: 'System Information',
}

const isEditableSection = (s: SettingsSectionWithSystem): s is SettingsSection => s !== 'system'

export function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { sections, systemInfo, loading, saving, dirty, activeSection, save } = useSettings()

  const [discardOpen, setDiscardOpen] = useState(false)
  const [pendingSection, setPendingSection] = useState<SettingsSectionWithSystem | null>(null)

  const isSystem = activeSection === 'system'
  const currentData = isSystem ? undefined : sections[activeSection as keyof typeof sections]
  const { form } = useSettingsForm(isSystem ? 'general' : activeSection, currentData!)

  const dirtySections = useMemo(() => {
    const set = new Set<string>()
    if (dirty) set.add(activeSection)
    return set
  }, [dirty, activeSection])

  const handleSectionChange = useCallback((section: string) => {
    const next = section as SettingsSectionWithSystem
    if (dirty) {
      setPendingSection(next)
      setDiscardOpen(true)
      return
    }
    dispatch(setActiveSection(next as SettingsSection))
  }, [dirty, dispatch])

  const handleDiscardConfirm = useCallback(() => {
    dispatch(clearDirty())
    if (pendingSection && isEditableSection(pendingSection)) {
      dispatch(setActiveSection(pendingSection))
    }
    setPendingSection(null)
    setDiscardOpen(false)
  }, [dispatch, pendingSection])

  const handleDiscardCancel = useCallback(() => {
    setPendingSection(null)
    setDiscardOpen(false)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formAny = form as any

  const handleSave = useCallback(async () => {
    if (isSystem) return
    const valid = await formAny.trigger()
    if (!valid) return
    const formData = formAny.getValues()
    await save(activeSection as SettingsSection, formData)
  }, [formAny, save, activeSection, isSystem])

  const renderSection = () => {
    if (isSystem) return <SystemInformation systemInfo={systemInfo} />

    const commonProps = { form: form as never }

    switch (activeSection) {
      case 'general': return <GeneralSettings {...commonProps} />
      case 'ai': return <AISettings {...commonProps} />
      case 'documents': return <DocumentSettings {...commonProps} />
      case 'search': return <SearchSettings {...commonProps} />
      case 'storage': return <StorageSettings {...commonProps} />
      case 'security': return <SecuritySettings {...commonProps} />
      case 'authentication': return <AuthenticationSettings {...commonProps} />
      case 'notifications': return <NotificationSettings {...commonProps} />
      case 'appearance': return <AppearanceSettings {...commonProps} />
      case 'branding': return <BrandingSettings {...commonProps} />
      case 'email': return <EmailSettings {...commonProps} />
      case 'audit': return <AuditSettings {...commonProps} />
      default: return null
    }
  }

  if (loading && !systemInfo) {
    return (
      <div className={styles.page}>
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage application configuration</p>
        </div>
      </div>

      <SettingsLayout activeSection={activeSection} onSectionChange={handleSectionChange} dirtySections={dirtySections}>
        <SettingsHeader title={SECTION_TITLES[activeSection]} description={SECTION_DESCRIPTIONS[activeSection]} />
        {renderSection()}
      </SettingsLayout>

      {!isSystem && <SaveBar visible={dirty} saving={saving} onSave={handleSave} onDiscard={() => setDiscardOpen(true)} />}

      <ConfirmDialog
        open={discardOpen}
        title="Discard unsaved changes?"
        description="You have unsaved changes in this section. If you navigate away, these changes will be lost."
        confirmLabel="Discard"
        onConfirm={handleDiscardConfirm}
        onCancel={handleDiscardCancel}
      />
    </div>
  )
}

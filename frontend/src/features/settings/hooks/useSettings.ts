import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import type { RootState, AppDispatch } from '../../../store'
import { fetchSettings, saveSection, resetSection, setActiveSection } from '../slices/settingsSlice'
import type { SettingsSection, AllSettings } from '../types/SettingsState'

export function useSettings() {
  const dispatch = useDispatch<AppDispatch>()
  const { sections, systemInfo, loading, saving, dirty, activeSection, error } = useSelector(
    (state: RootState) => state.settings,
  )

  useEffect(() => {
    if (!loading && !systemInfo) {
      dispatch(fetchSettings())
    }
  }, [dispatch, loading, systemInfo])

  useEffect(() => {
    if (error) {
      notification.error({ message: 'Settings Error', description: error, placement: 'topRight' })
    }
  }, [error])

  const setSection = useCallback((section: SettingsSection) => {
    dispatch(setActiveSection(section))
  }, [dispatch])

  const save = useCallback(async (section: SettingsSection, data: Partial<AllSettings[SettingsSection]>) => {
    const result = await dispatch(saveSection({ section, data }))
    if (saveSection.fulfilled.match(result)) {
      notification.success({ message: 'Settings saved', description: 'Your changes have been saved successfully.', placement: 'topRight' })
    }
    return result
  }, [dispatch])

  const reset = useCallback(async (section?: SettingsSection) => {
    const result = await dispatch(resetSection(section))
    if (resetSection.fulfilled.match(result)) {
      notification.success({ message: 'Settings reset', description: 'Settings have been restored to defaults.', placement: 'topRight' })
    }
    return result
  }, [dispatch])

  return { sections, systemInfo, loading, saving, dirty, activeSection, setSection, save, reset }
}

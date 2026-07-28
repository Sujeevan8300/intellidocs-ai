import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useBlocker } from 'react-router-dom'
import type { RootState, AppDispatch } from '../../../store'
import { discardChanges } from '../slices/settingsSlice'

export function useUnsavedChanges() {
  const dispatch = useDispatch<AppDispatch>()
  const dirty = useSelector((state: RootState) => state.settings.dirty)

  useEffect(() => {
    if (!dirty) return

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const blocker = useBlocker(dirty)

  const discard = useCallback(() => {
    dispatch(discardChanges())
    if (blocker.state === 'blocked') {
      blocker.proceed()
    }
  }, [dispatch, blocker])

  const confirmDiscard = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      if (!dirty) {
        resolve(true)
        return
      }
      // The ConfirmDialog component handles the actual UI confirmation
      // This returns the current dirty state for programmatic checks
      resolve(false)
    })
  }, [dirty])

  return { hasUnsavedChanges: dirty, discard, confirmDiscard, blocker }
}

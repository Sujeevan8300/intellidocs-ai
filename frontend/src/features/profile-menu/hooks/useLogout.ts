import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../../../store'
import { logoutUser } from '../../../store/authSlice'

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const { loading } = useSelector((state: RootState) => state.auth)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = useCallback(() => setDialogOpen(true), [])
  const closeDialog = useCallback(() => setDialogOpen(false), [])

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      notification.success({ message: 'Signed Out', description: 'You have been signed out successfully.', placement: 'topRight' })
      setDialogOpen(false)
      navigate('/login')
    } catch {
      notification.error({ message: 'Sign Out Failed', description: 'Unable to sign out. Please try again.', placement: 'topRight' })
    }
  }, [dispatch, navigate, notification])

  return { dialogOpen, loading, openDialog, closeDialog, logout }
}

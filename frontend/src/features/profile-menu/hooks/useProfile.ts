import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../../../store'
import { fetchProfile, clearError } from '../slices/profileSlice'

export function useProfile() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const { user, loading, authenticated, error } = useSelector(
    (state: RootState) => state.profile,
  )

  useEffect(() => {
    if (!user && !loading && authenticated) {
      dispatch(fetchProfile())
    }
  }, [dispatch, user, loading, authenticated])

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Profile Error',
        description: error,
        placement: 'topRight',
      })
      dispatch(clearError())
    }
  }, [error, notification, dispatch])

  const navigateTo = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate],
  )

  return {
    user,
    loading,
    authenticated,
    error,
    navigateTo,
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    initials: user
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      : '',
  }
}

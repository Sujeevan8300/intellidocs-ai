import { useMemo } from 'react'
import { useAppSelector } from '../../../hooks/store'

export function useDashboard() {
  const state = useAppSelector((root) => root.dashboard)

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }, [])

  const formattedDate = useMemo(() => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).toUpperCase()
  }, [])

  return {
    ...state,
    greeting,
    formattedDate,
  }
}

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'
import { UserInformation } from '../UserInformation/UserInformation'
import { ProfileMenu } from '../ProfileMenu/ProfileMenu'
import { LogoutDialog } from '../LogoutDialog/LogoutDialog'
import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton'
import { useProfile } from '../../hooks/useProfile'
import { useLogout } from '../../hooks/useLogout'
import styles from '../../styles/profileMenu.module.css'

export const ProfileDropdown: React.FC = () => {
  const { user, loading, navigateTo, fullName } = useProfile()
  const { dialogOpen, loading: logoutLoading, openDialog, closeDialog, logout } = useLogout()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, close])

  const handleNavigate = useCallback(
    (path: string) => {
      close()
      navigateTo(path)
    },
    [close, navigateTo],
  )

  const handleLogout = useCallback(() => {
    close()
    openDialog()
  }, [close, openDialog])

  if (loading && !user) {
    return <LoadingSkeleton />
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User profile menu"
        type="button"
      >
        <ProfileAvatar user={user} size={32} />
        <div className={styles.triggerInfo}>
          <span className={styles.triggerName}>{fullName}</span>
          <span className={styles.triggerRole}>{user?.role}</span>
        </div>
        <DownOutlined
          className={styles.triggerChevron}
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>

      {open && (
        <div
          className={styles.panel}
          role="menu"
          aria-label="Profile dropdown"
          style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', zIndex: 1050 }}
        >
          {user && <UserInformation user={user} />}
          <ProfileMenu onNavigate={handleNavigate} onLogout={handleLogout} />
        </div>
      )}

      <LogoutDialog
        open={dialogOpen}
        loading={logoutLoading}
        onConfirm={logout}
        onCancel={closeDialog}
      />
    </div>
  )
}

import React from 'react'
import type { ReactNode } from 'react'
import styles from '../../styles/profileMenu.module.css'

interface ProfileMenuItemProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  danger?: boolean
  ariaLabel?: string
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  label,
  onClick,
  danger = false,
  ariaLabel,
}) => {
  return (
    <button
      className={`${styles.menuItem} ${danger ? styles.menuItemDanger : ''}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      type="button"
    >
      <span className={styles.menuItemIcon}>{icon}</span>
      <span className={styles.menuItemLabel}>{label}</span>
    </button>
  )
}

import React from 'react'
import {
  UserOutlined,
  SettingOutlined,
  FormatPainterOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { ProfileMenuItem } from '../ProfileMenuItem/ProfileMenuItem'
import styles from '../../styles/profileMenu.module.css'

interface ProfileMenuProps {
  onNavigate: (path: string) => void
  onLogout: () => void
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onNavigate, onLogout }) => {
  return (
    <nav className={styles.menu} role="menu" aria-label="Profile menu">
      <ProfileMenuItem
        icon={<UserOutlined />}
        label="My Profile"
        onClick={() => onNavigate('/users/profile')}
        ariaLabel="View my profile"
      />
      <ProfileMenuItem
        icon={<SettingOutlined />}
        label="Account Settings"
        onClick={() => onNavigate('/settings/account')}
        ariaLabel="Account settings"
      />
      <ProfileMenuItem
        icon={<FormatPainterOutlined />}
        label="Preferences"
        onClick={() => onNavigate('/settings/preferences')}
        ariaLabel="Preferences"
      />
      <ProfileMenuItem
        icon={<LockOutlined />}
        label="Change Password"
        onClick={() => onNavigate('/settings/change-password')}
        ariaLabel="Change password"
      />
      <ProfileMenuItem
        icon={<QuestionCircleOutlined />}
        label="Help & Support"
        onClick={() => onNavigate('/help')}
        ariaLabel="Help and support"
      />

      <div className={styles.menuDivider} role="separator" />

      <ProfileMenuItem
        icon={<LogoutOutlined />}
        label="Sign Out"
        onClick={onLogout}
        danger
        ariaLabel="Sign out of your account"
      />
    </nav>
  )
}

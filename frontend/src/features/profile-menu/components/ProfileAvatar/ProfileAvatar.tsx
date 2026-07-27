import React from 'react'
import type { UserProfile } from '../../types/UserProfile'
import styles from '../../styles/profileMenu.module.css'

interface ProfileAvatarProps {
  user: UserProfile | null
  size?: number
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, size = 40 }) => {
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : '?'

  return (
    <div className={styles.avatarWrap}>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className={styles.avatar}
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className={styles.initialsAvatar}
          style={{ width: size, height: size, fontSize: size * 0.35 }}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}
      <span
        className={user?.online ? styles.onlineDot : styles.offlineDot}
        aria-label={user?.online ? 'Online' : 'Offline'}
      />
    </div>
  )
}

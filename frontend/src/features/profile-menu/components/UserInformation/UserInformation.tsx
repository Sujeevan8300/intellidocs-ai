import React from 'react'
import type { UserProfile } from '../../types/UserProfile'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'
import styles from '../../styles/profileMenu.module.css'

interface UserInformationProps {
  user: UserProfile
}

export const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  return (
    <div className={styles.userInfo}>
      <ProfileAvatar user={user} size={40} />
      <div className={styles.userInfoText}>
        <p className={styles.userName}>
          {user.firstName} {user.lastName}
        </p>
        <p className={styles.userRole}>{user.role}</p>
        <p className={styles.userEmail}>{user.email}</p>
      </div>
    </div>
  )
}

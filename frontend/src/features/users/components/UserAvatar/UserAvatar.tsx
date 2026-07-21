import { Avatar } from 'antd'
import type { User } from '../../types/User'

interface UserAvatarProps {
  user: User
  size?: 'small' | 'middle' | 'large'
}

const sizeMap = { small: 24, middle: 40, large: 64 }

export function UserAvatar({ user, size = 'middle' }: UserAvatarProps) {
  const px = sizeMap[size]

  return (
    <div className="usr-user-avatar" style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        src={user.avatar}
        size={px}
        aria-label={`${user.firstName} ${user.lastName} avatar`}
      >
        {user.firstName[0]}{user.lastName[0]}
      </Avatar>
      {user.online && (
        <span
          className="usr-online-indicator"
          aria-label="Online"
          role="status"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: px * 0.28,
            height: px * 0.28,
            borderRadius: '50%',
            background: '#52c41a',
            border: '2px solid #fff',
          }}
        />
      )}
    </div>
  )
}

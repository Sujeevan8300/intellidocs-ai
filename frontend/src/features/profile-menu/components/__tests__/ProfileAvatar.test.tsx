import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'
import type { UserProfile } from '../../types/UserProfile'

const MOCK_USER: UserProfile = {
  id: 'usr_01',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@intellidocs.ai',
  role: 'Knowledge Manager',
  department: 'Engineering',
  avatar: '',
  online: true,
}

describe('ProfileAvatar', () => {
  it('renders initials when no avatar URL', () => {
    render(<ProfileAvatar user={MOCK_USER} />)
    expect(screen.getByText('AM')).toBeInTheDocument()
  })

  it('renders image when avatar URL is provided', () => {
    const userWithAvatar = { ...MOCK_USER, avatar: 'https://example.com/avatar.jpg' }
    render(<ProfileAvatar user={userWithAvatar} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Alex Morgan')
  })

  it('shows online indicator when online', () => {
    render(<ProfileAvatar user={MOCK_USER} />)
    expect(screen.getByLabelText('Online')).toBeInTheDocument()
  })

  it('shows offline indicator when offline', () => {
    const offlineUser = { ...MOCK_USER, online: false }
    render(<ProfileAvatar user={offlineUser} />)
    expect(screen.getByLabelText('Offline')).toBeInTheDocument()
  })

  it('renders question mark initials when user is null', () => {
    render(<ProfileAvatar user={null} />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('applies custom size to avatar', () => {
    render(<ProfileAvatar user={MOCK_USER} size={48} />)
    const avatarEl = screen.getByText('AM')
    expect(avatarEl).toHaveStyle({ width: '48px', height: '48px' })
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserInformation } from '../UserInformation/UserInformation'
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

describe('UserInformation', () => {
  it('renders full name', () => {
    render(<UserInformation user={MOCK_USER} />)
    expect(screen.getByText('Alex Morgan')).toBeInTheDocument()
  })

  it('renders role', () => {
    render(<UserInformation user={MOCK_USER} />)
    expect(screen.getByText('Knowledge Manager')).toBeInTheDocument()
  })

  it('renders email', () => {
    render(<UserInformation user={MOCK_USER} />)
    expect(screen.getByText('alex.morgan@intellidocs.ai')).toBeInTheDocument()
  })

  it('renders avatar with initials', () => {
    render(<UserInformation user={MOCK_USER} />)
    expect(screen.getByText('AM')).toBeInTheDocument()
  })
})

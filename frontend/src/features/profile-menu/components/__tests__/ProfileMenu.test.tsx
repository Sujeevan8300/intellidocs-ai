import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProfileMenu } from '../ProfileMenu/ProfileMenu'

describe('ProfileMenu', () => {
  it('renders all menu items', () => {
    render(<ProfileMenu onNavigate={vi.fn()} onLogout={vi.fn()} />)
    expect(screen.getByText('My Profile')).toBeInTheDocument()
    expect(screen.getByText('Account Settings')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Change Password')).toBeInTheDocument()
    expect(screen.getByText('Help & Support')).toBeInTheDocument()
    expect(screen.getByText('Sign Out')).toBeInTheDocument()
  })

  it('calls onNavigate with correct path for each item', async () => {
    const onNavigate = vi.fn()
    render(<ProfileMenu onNavigate={onNavigate} onLogout={vi.fn()} />)

    await userEvent.click(screen.getByText('My Profile'))
    expect(onNavigate).toHaveBeenCalledWith('/users/profile')

    await userEvent.click(screen.getByText('Account Settings'))
    expect(onNavigate).toHaveBeenCalledWith('/settings/account')

    await userEvent.click(screen.getByText('Preferences'))
    expect(onNavigate).toHaveBeenCalledWith('/settings/preferences')

    await userEvent.click(screen.getByText('Change Password'))
    expect(onNavigate).toHaveBeenCalledWith('/settings/change-password')

    await userEvent.click(screen.getByText('Help & Support'))
    expect(onNavigate).toHaveBeenCalledWith('/help')
  })

  it('calls onLogout when Sign Out is clicked', async () => {
    const onLogout = vi.fn()
    render(<ProfileMenu onNavigate={vi.fn()} onLogout={onLogout} />)
    await userEvent.click(screen.getByText('Sign Out'))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it('has correct ARIA menu role', () => {
    render(<ProfileMenu onNavigate={vi.fn()} onLogout={vi.fn()} />)
    const nav = screen.getByRole('menu', { name: 'Profile menu' })
    expect(nav).toBeInTheDocument()
  })

  it('has accessible buttons with aria-labels', () => {
    render(<ProfileMenu onNavigate={vi.fn()} onLogout={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'View my profile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Account settings' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Preferences' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Change password' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Help and support' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign out of your account' })).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogoutDialog } from '../LogoutDialog/LogoutDialog'

describe('LogoutDialog', () => {
  it('renders title and button when open', () => {
    render(
      <LogoutDialog open={true} loading={false} onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(screen.getByText('Sign Out', { selector: 'h3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    const { container } = render(
      <LogoutDialog open={false} loading={false} onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(container.querySelector('.ant-modal-body')).not.toBeInTheDocument()
  })

  it('shows confirmation message', () => {
    render(
      <LogoutDialog open={true} loading={false} onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(screen.getByText(/Are you sure you want to sign out/)).toBeInTheDocument()
  })

  it('calls onCancel when Cancel is clicked', async () => {
    const onCancel = vi.fn()
    render(
      <LogoutDialog open={true} loading={false} onConfirm={vi.fn()} onCancel={onCancel} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm when Sign Out button is clicked', async () => {
    const onConfirm = vi.fn()
    render(
      <LogoutDialog open={true} loading={false} onConfirm={onConfirm} onCancel={vi.fn()} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Sign Out' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(
      <LogoutDialog open={true} loading={true} onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(screen.getByText('Signing Out...')).toBeInTheDocument()
  })

  it('disables buttons when loading', () => {
    render(
      <LogoutDialog open={true} loading={true} onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Signing Out...' })).toBeDisabled()
  })
})

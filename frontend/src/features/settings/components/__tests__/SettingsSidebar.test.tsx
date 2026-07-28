import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SettingsSidebar } from '../SettingsSidebar/SettingsSidebar'

describe('SettingsSidebar', () => {
  const defaultProps = {
    activeSection: 'general',
    onSectionChange: vi.fn(),
    dirtySections: new Set<string>(),
  }

  it('renders all 13 navigation items', () => {
    render(<SettingsSidebar {...defaultProps} />)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('Semantic Search')).toBeInTheDocument()
    expect(screen.getByText('Storage')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('Authentication')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Appearance')).toBeInTheDocument()
    expect(screen.getByText('Branding')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Audit')).toBeInTheDocument()
    expect(screen.getByText('System Information')).toBeInTheDocument()
  })

  it('highlights the active section', () => {
    render(<SettingsSidebar {...defaultProps} activeSection="security" />)
    const securityBtn = screen.getByText('Security').closest('button')
    expect(securityBtn).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onSectionChange when an item is clicked', async () => {
    const onSectionChange = vi.fn()
    render(<SettingsSidebar {...defaultProps} onSectionChange={onSectionChange} />)
    await userEvent.click(screen.getByText('AI'))
    expect(onSectionChange).toHaveBeenCalledWith('ai')
  })

  it('shows dirty dot for dirty sections', () => {
    const dirtySections = new Set(['general'])
    render(<SettingsSidebar {...defaultProps} dirtySections={dirtySections} />)
    const generalBtn = screen.getByText('General').closest('button')
    expect(generalBtn?.querySelector('[aria-label="Unsaved changes"]')).toBeInTheDocument()
  })

  it('has correct ARIA tab roles', () => {
    render(<SettingsSidebar {...defaultProps} />)
    const tablist = screen.getByRole('tablist', { name: 'Settings sections' })
    expect(tablist).toBeInTheDocument()
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBe(13)
  })
})

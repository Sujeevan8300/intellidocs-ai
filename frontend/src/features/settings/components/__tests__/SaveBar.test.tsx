import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SaveBar } from '../SaveBar/SaveBar'

describe('SaveBar', () => {
  const defaultProps = {
    visible: true,
    saving: false,
    onSave: vi.fn(),
    onDiscard: vi.fn(),
  }

  it('does not render when visible=false', () => {
    const { container } = render(<SaveBar {...defaultProps} visible={false} />)
    expect(container.querySelector('[role="status"]')).not.toBeInTheDocument()
  })

  it('renders save text when visible=true', () => {
    render(<SaveBar {...defaultProps} />)
    expect(screen.getByText('You have unsaved changes.')).toBeInTheDocument()
  })

  it('calls onSave when Save Changes is clicked', async () => {
    const onSave = vi.fn()
    render(<SaveBar {...defaultProps} onSave={onSave} />)
    await userEvent.click(screen.getByRole('button', { name: 'Save Changes' }))
    expect(onSave).toHaveBeenCalledTimes(1)
  })

  it('calls onDiscard when Discard is clicked', async () => {
    const onDiscard = vi.fn()
    render(<SaveBar {...defaultProps} onDiscard={onDiscard} />)
    await userEvent.click(screen.getByRole('button', { name: 'Discard' }))
    expect(onDiscard).toHaveBeenCalledTimes(1)
  })

  it('shows loading state when saving', () => {
    render(<SaveBar {...defaultProps} saving={true} />)
    const saveBtn = screen.getByRole('button', { name: /Save Changes/i })
    expect(saveBtn).toHaveClass('ant-btn-loading')
  })
})

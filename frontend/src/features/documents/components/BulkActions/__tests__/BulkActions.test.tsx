import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BulkActions } from '../BulkActions'

describe('BulkActions', () => {
  const defaultProps = {
    selectedCount: 0,
    onDelete: vi.fn(),
    onChangeCategory: vi.fn(),
    onClearSelection: vi.fn(),
    submitting: false,
  }

  it('returns null when selectedCount is 0', () => {
    const { container } = render(<BulkActions {...defaultProps} selectedCount={0} />)
    expect(container.firstChild).toBeNull()
  })

  it('shows correct count', () => {
    render(<BulkActions {...defaultProps} selectedCount={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText(/document\(s\) selected/)).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<BulkActions {...defaultProps} selectedCount={3} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('calls onClearSelection when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClearSelection = vi.fn()
    render(<BulkActions {...defaultProps} selectedCount={3} onClearSelection={onClearSelection} />)
    await user.click(screen.getByRole('button', { name: /clear/i }))
    expect(onClearSelection).toHaveBeenCalledOnce()
  })

  it('shows delete button loading state when submitting', () => {
    render(<BulkActions {...defaultProps} selectedCount={3} submitting={true} />)
    const deleteBtn = screen.getByRole('button', { name: /delete/i })
    expect(deleteBtn).toHaveClass('ant-btn-loading')
  })
})

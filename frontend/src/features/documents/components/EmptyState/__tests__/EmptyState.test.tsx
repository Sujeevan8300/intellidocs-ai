import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  it('renders default title and description', () => {
    render(<EmptyState />)
    expect(screen.getByText('No documents available')).toBeInTheDocument()
    expect(screen.getByText('Upload your first document to start building your AI Knowledge Base.')).toBeInTheDocument()
  })

  it('renders custom title and description', () => {
    render(<EmptyState title="Custom Title" description="Custom Description" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Description')).toBeInTheDocument()
  })

  it('renders upload button when onCreateClick is provided', () => {
    render(<EmptyState onCreateClick={() => {}} />)
    expect(screen.getByRole('button', { name: /upload document/i })).toBeInTheDocument()
  })

  it('does not render upload button when onCreateClick is not provided', () => {
    render(<EmptyState />)
    expect(screen.queryByRole('button', { name: /upload document/i })).not.toBeInTheDocument()
  })

  it('calls onCreateClick when button is clicked', async () => {
    const user = userEvent.setup()
    const onCreateClick = vi.fn()
    render(<EmptyState onCreateClick={onCreateClick} />)
    await user.click(screen.getByRole('button', { name: /upload document/i }))
    expect(onCreateClick).toHaveBeenCalledOnce()
  })
})

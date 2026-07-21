import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryCard } from '../CategoryCard'
import type { Category } from '../../../types/Category'

const mockCategory: Category = {
  id: 1,
  name: 'HR Policies',
  description: 'Human resources policy documents',
  documentCount: 12,
  status: 'ACTIVE',
  createdBy: 'admin',
  createdDate: '2025-01-10T10:00:00Z',
}

describe('CategoryCard', () => {
  it('renders category name and description', () => {
    render(<CategoryCard category={mockCategory} />)
    expect(screen.getByText('HR Policies')).toBeInTheDocument()
    expect(screen.getByText('Human resources policy documents')).toBeInTheDocument()
  })

  it('renders document count', () => {
    render(<CategoryCard category={mockCategory} />)
    expect(screen.getByText('12 documents')).toBeInTheDocument()
  })

  it('renders singular document count for count of 1', () => {
    render(<CategoryCard category={{ ...mockCategory, documentCount: 1 }} />)
    expect(screen.getByText('1 document')).toBeInTheDocument()
  })

  it('renders "No documents" for count of 0', () => {
    render(<CategoryCard category={{ ...mockCategory, documentCount: 0 }} />)
    expect(screen.getByText('No documents')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CategoryCard category={mockCategory} onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: /hr policies/i }))
    expect(onClick).toHaveBeenCalledWith(mockCategory)
  })

  it('renders active status badge', () => {
    render(<CategoryCard category={mockCategory} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders inactive status badge', () => {
    render(<CategoryCard category={{ ...mockCategory, status: 'INACTIVE' }} />)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders parent name when provided', () => {
    render(<CategoryCard category={{ ...mockCategory, parentName: 'Company' }} />)
    expect(screen.getByText(/Company/)).toBeInTheDocument()
  })

  it('truncates long descriptions', () => {
    const longDesc = 'A'.repeat(100)
    render(<CategoryCard category={{ ...mockCategory, description: longDesc }} />)
    expect(screen.getByText(/A{80}…/)).toBeInTheDocument()
  })
})

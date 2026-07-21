import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DocumentCard } from '../DocumentCard'
import type { Document } from '../../../types/Document'
import type { ProcessingStatus } from '../../../types/ProcessingStatus'

const mockDocument: Document = {
  id: 1,
  name: 'Test Document',
  description: 'A test document description',
  category: 'HR Policies',
  fileType: 'PDF',
  fileSize: 1048576,
  uploadedBy: 'admin',
  uploadedAt: '2025-01-15T10:00:00Z',
  processingStatus: 'READY' as ProcessingStatus,
  aiReady: true,
  favorite: false,
  tags: ['test'],
  progress: 100,
  version: '1.0',
}

describe('DocumentCard', () => {
  it('renders document name, description, category, file size, and date', () => {
    render(
      <DocumentCard
        document={mockDocument}
        onView={() => {}}
        onToggleFavorite={() => {}}
      />,
    )
    expect(screen.getByText('Test Document')).toBeInTheDocument()
    expect(screen.getByText('A test document description')).toBeInTheDocument()
    expect(screen.getByText('HR Policies')).toBeInTheDocument()
    expect(screen.getByText('1.0 MB')).toBeInTheDocument()
    expect(screen.getByText('15 Jan 2025')).toBeInTheDocument()
  })

  it('calls onView when card body is clicked', async () => {
    const user = userEvent.setup()
    const onView = vi.fn()
    render(
      <DocumentCard
        document={mockDocument}
        onView={onView}
        onToggleFavorite={() => {}}
      />,
    )
    await user.click(screen.getByText('Test Document'))
    expect(onView).toHaveBeenCalledWith(mockDocument)
  })

  it('calls onToggleFavorite when favorite button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()
    render(
      <DocumentCard
        document={mockDocument}
        onView={() => {}}
        onToggleFavorite={onToggleFavorite}
      />,
    )
    const favButton = document.querySelector('.doc-card__fav')!
    await user.click(favButton)
    expect(onToggleFavorite).toHaveBeenCalledWith(1)
  })

  it('shows filled star when document is favorite', () => {
    render(
      <DocumentCard
        document={{ ...mockDocument, favorite: true }}
        onView={() => {}}
        onToggleFavorite={() => {}}
      />,
    )
    expect(document.querySelector('.doc-fav-active')).toBeInTheDocument()
  })

  it('shows progress bar for processing documents', () => {
    render(
      <DocumentCard
        document={{ ...mockDocument, processingStatus: 'PROCESSING' as ProcessingStatus, progress: 45 }}
        onView={() => {}}
        onToggleFavorite={() => {}}
      />,
    )
    expect(document.querySelector('.doc-card__progress')).toBeInTheDocument()
  })

  it('does not show progress bar for ready documents', () => {
    render(
      <DocumentCard
        document={mockDocument}
        onView={() => {}}
        onToggleFavorite={() => {}}
      />,
    )
    expect(document.querySelector('.doc-card__progress')).not.toBeInTheDocument()
  })

  it('does not show progress bar for failed documents', () => {
    render(
      <DocumentCard
        document={{ ...mockDocument, processingStatus: 'FAILED' as ProcessingStatus }}
        onView={() => {}}
        onToggleFavorite={() => {}}
      />,
    )
    expect(document.querySelector('.doc-card__progress')).not.toBeInTheDocument()
  })
})

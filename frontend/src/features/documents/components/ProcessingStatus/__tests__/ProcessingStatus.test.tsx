import { render, screen } from '@testing-library/react'
import { ProcessingStatusBadge } from '../ProcessingStatus'

describe('ProcessingStatusBadge', () => {
  it('renders correct label for READY status', () => {
    render(<ProcessingStatusBadge status="READY" progress={100} />)
    expect(screen.getByText('Ready')).toBeInTheDocument()
  })

  it('renders correct label for FAILED status', () => {
    render(<ProcessingStatusBadge status="FAILED" progress={50} />)
    expect(screen.getByText('Failed')).toBeInTheDocument()
  })

  it('renders correct label for PROCESSING status', () => {
    render(<ProcessingStatusBadge status="PROCESSING" progress={45} />)
    expect(screen.getByText('Processing')).toBeInTheDocument()
  })

  it('renders correct label for UPLOADING status', () => {
    render(<ProcessingStatusBadge status="UPLOADING" progress={10} />)
    expect(screen.getByText('Uploading')).toBeInTheDocument()
  })

  it('renders correct label for CHUNKING status', () => {
    render(<ProcessingStatusBadge status="CHUNKING" progress={70} />)
    expect(screen.getByText('Chunking')).toBeInTheDocument()
  })

  it('renders correct label for EMBEDDING status', () => {
    render(<ProcessingStatusBadge status="EMBEDDING" progress={80} />)
    expect(screen.getByText('Embedding')).toBeInTheDocument()
  })

  it('shows progress bar when status is active', () => {
    const { container } = render(<ProcessingStatusBadge status="PROCESSING" progress={50} />)
    expect(container.querySelector('.doc-processing-progress')).toBeInTheDocument()
  })

  it('does not show progress bar for READY status', () => {
    const { container } = render(<ProcessingStatusBadge status="READY" progress={100} />)
    expect(container.querySelector('.doc-processing-progress')).not.toBeInTheDocument()
  })

  it('does not show progress bar for FAILED status', () => {
    const { container } = render(<ProcessingStatusBadge status="FAILED" progress={50} />)
    expect(container.querySelector('.doc-processing-progress')).not.toBeInTheDocument()
  })

  it('renders tag with success color for READY', () => {
    render(<ProcessingStatusBadge status="READY" progress={100} />)
    const tag = screen.getByText('Ready').closest('.ant-tag')
    expect(tag).toHaveClass('ant-tag-success')
  })

  it('renders tag with error color for FAILED', () => {
    render(<ProcessingStatusBadge status="FAILED" progress={50} />)
    const tag = screen.getByText('Failed').closest('.ant-tag')
    expect(tag).toHaveClass('ant-tag-error')
  })

  it('renders tag with processing color for PROCESSING', () => {
    render(<ProcessingStatusBadge status="PROCESSING" progress={45} />)
    const tag = screen.getByText('Processing').closest('.ant-tag')
    expect(tag).toHaveClass('ant-tag-processing')
  })
})

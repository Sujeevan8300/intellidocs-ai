import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemInformation } from '../SystemInformation/SystemInformation'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

const mockSystemInfo = {
  applicationVersion: '2.4.1',
  frontendVersion: '2.4.1',
  backendVersion: '2.4.0',
  database: 'PostgreSQL 16.2',
  aiProvider: 'OpenAI GPT-4o',
  buildDate: '2026-07-20T14:30:00Z',
  environment: 'Production',
  lastDeployment: '2026-07-20T15:45:00Z',
}

describe('SystemInformation', () => {
  it('renders system info when data is provided', () => {
    render(<SystemInformation systemInfo={mockSystemInfo} />)
    expect(screen.getAllByText('2.4.1').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('PostgreSQL 16.2')).toBeInTheDocument()
    expect(screen.getByText('OpenAI GPT-4o')).toBeInTheDocument()
    expect(screen.getByText('Production')).toBeInTheDocument()
  })

  it('renders nothing when systemInfo is null', () => {
    const { container } = render(<SystemInformation systemInfo={null} />)
    expect(container.innerHTML).toBe('')
  })

  it('contains Application and Infrastructure sections', () => {
    render(<SystemInformation systemInfo={mockSystemInfo} />)
    expect(screen.getByText('Application')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure')).toBeInTheDocument()
  })
})

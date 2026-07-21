import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../SearchBar'

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Search documents...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Find docs" />)
    expect(screen.getByPlaceholderText('Find docs')).toBeInTheDocument()
  })

  it('calls onChange after debounce when user types', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    const input = screen.getByPlaceholderText('Search documents...')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(onChange).not.toHaveBeenCalled()
    vi.advanceTimersByTime(300)
    expect(onChange).toHaveBeenCalledWith('test')
  })

  it('displays clear button when value is provided', () => {
    render(<SearchBar value="hello" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: /close-circle/i })).toBeInTheDocument()
  })

  it('does not display clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.queryByRole('button', { name: /close-circle/i })).not.toBeInTheDocument()
  })

  it('clear button calls onChange with empty string', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const onChange = vi.fn()
    render(<SearchBar value="hello" onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: /close-circle/i }))
    expect(onChange).toHaveBeenCalledWith('')
  })
})

import { useCallback, useRef } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search users...' }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onChange(val), 300)
    },
    [onChange],
  )

  return (
    <div className="usr-search-bar">
      <Input
        id="user-search"
        defaultValue={value}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        allowClear
        onClear={() => onChange('')}
        aria-label="Search users"
      />
    </div>
  )
}

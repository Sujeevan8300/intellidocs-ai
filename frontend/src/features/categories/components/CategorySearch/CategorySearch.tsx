import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useCallback, useRef } from 'react'

interface CategorySearchProps {
  value: string
  onChange: (value: string) => void
}

export function CategorySearch({ value, onChange }: CategorySearchProps) {
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
    <Input
      id="category-search"
      defaultValue={value}
      onChange={handleChange}
      prefix={<SearchOutlined />}
      placeholder="Search categories..."
      allowClear
      onClear={() => onChange('')}
      className="cat-search-input"
    />
  )
}

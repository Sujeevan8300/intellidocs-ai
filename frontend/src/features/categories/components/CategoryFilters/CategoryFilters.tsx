import { Select, Button } from 'antd'
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  STATUS_OPTIONS,
  DOCUMENT_COUNT_OPTIONS,
  DATE_OPTIONS,
} from '../../constants/category.constants'
import type { CategoryFilter } from '../../types/CategoryFilter'

interface CategoryFiltersProps {
  filters: CategoryFilter
  onChange: (partial: Partial<CategoryFilter>) => void
  onReset: () => void
}

export function CategoryFilters({ filters, onChange, onReset }: CategoryFiltersProps) {
  const hasActiveFilters =
    filters.status !== 'ALL' ||
    filters.documentCountRange !== 'ALL' ||
    filters.dateFilter !== 'ALL'

  return (
    <div className="cat-filters-row">
      <div className="cat-filters-label">
        <FilterOutlined />
        <span>Filters</span>
      </div>

      <Select
        id="filter-status"
        value={filters.status}
        onChange={(val) => onChange({ status: val })}
        options={STATUS_OPTIONS}
        style={{ width: 140 }}
        className="cat-filter-select"
        placeholder="Status"
      />

      <Select
        id="filter-doc-count"
        value={filters.documentCountRange}
        onChange={(val) => onChange({ documentCountRange: val })}
        options={DOCUMENT_COUNT_OPTIONS}
        style={{ width: 150 }}
        className="cat-filter-select"
        placeholder="Doc Count"
      />

      <Select
        id="filter-date"
        value={filters.dateFilter}
        onChange={(val) => onChange({ dateFilter: val })}
        options={DATE_OPTIONS}
        style={{ width: 150 }}
        className="cat-filter-select"
        placeholder="Date"
      />

      {hasActiveFilters && (
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={onReset}
          className="cat-filter-reset"
          id="filter-reset-btn"
        >
          Reset
        </Button>
      )}
    </div>
  )
}

import { Select, Button, Switch } from 'antd'
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  FILE_TYPE_OPTIONS,
  DATE_RANGE_OPTIONS,
} from '../../constants/document.constants'
import type { DocumentFilter } from '../../types/Document'

interface DocumentFiltersProps {
  filters: DocumentFilter
  onChange: (partial: Partial<DocumentFilter>) => void
  onReset: () => void
}

export function DocumentFilters({ filters, onChange, onReset }: DocumentFiltersProps) {
  return (
    <div className="doc-filters-row">
      <div className="doc-filters-label">
        <FilterOutlined />
        <span>Filters</span>
      </div>

      <Select
        id="filter-category"
        value={filters.category}
        onChange={(val) => onChange({ category: val })}
        options={CATEGORY_OPTIONS}
        style={{ width: 150 }}
        className="doc-filter-select"
      />

      <Select
        id="filter-status"
        value={filters.status}
        onChange={(val) => onChange({ status: val })}
        options={STATUS_OPTIONS}
        style={{ width: 140 }}
        className="doc-filter-select"
      />

      <Select
        id="filter-file-type"
        value={filters.fileType}
        onChange={(val) => onChange({ fileType: val })}
        options={FILE_TYPE_OPTIONS}
        style={{ width: 130 }}
        className="doc-filter-select"
      />

      <Select
        id="filter-date-range"
        value={filters.dateRange}
        onChange={(val) => onChange({ dateRange: val })}
        options={DATE_RANGE_OPTIONS}
        style={{ width: 140 }}
        className="doc-filter-select"
      />

      <div className="doc-filter-toggle">
        <Switch
          id="filter-favorites"
          size="small"
          checked={filters.favoritesOnly}
          onChange={(checked) => onChange({ favoritesOnly: checked })}
        />
        <span className="doc-filter-toggle-label">Favorites</span>
      </div>

      <div className="doc-filter-toggle">
        <Switch
          id="filter-ai-ready"
          size="small"
          checked={filters.aiReadyOnly}
          onChange={(checked) => onChange({ aiReadyOnly: checked })}
        />
        <span className="doc-filter-toggle-label">AI Ready</span>
      </div>

      <Button
        type="text"
        icon={<ReloadOutlined />}
        onClick={onReset}
        className="doc-filter-reset"
        id="filter-reset-btn"
      >
        Reset
      </Button>
    </div>
  )
}

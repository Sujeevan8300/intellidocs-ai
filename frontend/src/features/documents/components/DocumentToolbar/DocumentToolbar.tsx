import { Button, Tooltip, Select } from 'antd'
import {
  AppstoreOutlined,
  TableOutlined,
  SortAscendingOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { SearchBar } from '../SearchBar/SearchBar'
import { SORT_OPTIONS } from '../../constants/document.constants'
import type { ViewMode, DocumentSort } from '../../types/Document'

interface DocumentToolbarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  sort: DocumentSort
  onSortChange: (sort: DocumentSort) => void
  onUploadClick: () => void
}

export function DocumentToolbar({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sort,
  onSortChange,
  onUploadClick,
}: DocumentToolbarProps) {
  return (
    <div className="doc-toolbar">
      <div className="doc-toolbar-search">
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>

      <div className="doc-toolbar-actions">
        <div className="doc-sort-group">
          <SortAscendingOutlined className="doc-sort-icon" />
          <Select
            id="sort-field"
            value={sort.field}
            onChange={(val) => onSortChange({ field: val, order: sort.order })}
            options={SORT_OPTIONS}
            style={{ width: 130 }}
            className="doc-filter-select"
          />
          <Select
            id="sort-order"
            value={sort.order}
            onChange={(val) => onSortChange({ field: sort.field, order: val })}
            options={[
              { label: 'Asc', value: 'asc' },
              { label: 'Desc', value: 'desc' },
            ]}
            style={{ width: 90 }}
            className="doc-filter-select"
          />
        </div>

        <div className="doc-view-toggle">
          <Tooltip title="Table View">
            <Button
              type={viewMode === 'table' ? 'primary' : 'text'}
              icon={<TableOutlined />}
              onClick={() => onViewModeChange('table')}
              id="view-table-btn"
            />
          </Tooltip>
          <Tooltip title="Grid View">
            <Button
              type={viewMode === 'grid' ? 'primary' : 'text'}
              icon={<AppstoreOutlined />}
              onClick={() => onViewModeChange('grid')}
              id="view-grid-btn"
            />
          </Tooltip>
        </div>

        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={onUploadClick}
          size="large"
          id="upload-btn"
          className="doc-upload-btn"
        >
          Upload
        </Button>
      </div>
    </div>
  )
}

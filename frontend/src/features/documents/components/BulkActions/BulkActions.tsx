import { Button, Select, Tooltip } from 'antd'
import { DeleteOutlined, ExportOutlined, CloseOutlined } from '@ant-design/icons'
import { CATEGORY_OPTIONS } from '../../constants/document.constants'

interface BulkActionsProps {
  selectedCount: number
  onDelete: () => void
  onChangeCategory: (category: string) => void
  onClearSelection: () => void
  submitting: boolean
}

export function BulkActions({ selectedCount, onDelete, onChangeCategory, onClearSelection, submitting }: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <div className="doc-bulk-actions">
      <div className="doc-bulk-info">
        <span className="doc-bulk-count">{selectedCount}</span> document(s) selected
      </div>
      <div className="doc-bulk-buttons">
        <Select
          id="bulk-category-select"
          placeholder="Move to category"
          style={{ width: 180 }}
          options={CATEGORY_OPTIONS.filter((o) => o.value !== 'ALL')}
          onChange={onChangeCategory}
          className="doc-filter-select"
        />
        <Tooltip title="Export list (mock)">
          <Button icon={<ExportOutlined />} id="bulk-export-btn">Export</Button>
        </Tooltip>
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={onDelete} loading={submitting} id="bulk-delete-btn">
          Delete
        </Button>
        <Button icon={<CloseOutlined />} onClick={onClearSelection} id="bulk-clear-btn">
          Clear
        </Button>
      </div>
    </div>
  )
}

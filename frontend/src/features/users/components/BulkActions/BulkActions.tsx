import { Button, Tooltip } from 'antd'
import { DeleteOutlined, ExportOutlined, CloseOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons'

interface BulkActionsProps {
  selectedCount: number
  onBulkActivate: () => void
  onBulkDeactivate: () => void
  onBulkDelete: () => void
  onBulkExport: () => void
  onClearSelection: () => void
  submitting: boolean
}

export function BulkActions({
  selectedCount,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
  onBulkExport,
  onClearSelection,
  submitting,
}: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <div className="usr-bulk-actions">
      <div className="usr-bulk-info">
        <span className="usr-bulk-count">{selectedCount}</span> user(s) selected
      </div>
      <div className="usr-bulk-buttons">
        <Tooltip title="Activate selected">
          <Button icon={<CheckOutlined />} onClick={onBulkActivate} loading={submitting} id="usr-bulk-activate-btn">
            Activate
          </Button>
        </Tooltip>
        <Tooltip title="Deactivate selected">
          <Button icon={<StopOutlined />} onClick={onBulkDeactivate} loading={submitting} id="usr-bulk-deactivate-btn">
            Deactivate
          </Button>
        </Tooltip>
        <Tooltip title="Export list">
          <Button icon={<ExportOutlined />} onClick={onBulkExport} id="usr-bulk-export-btn">
            Export
          </Button>
        </Tooltip>
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={onBulkDelete} loading={submitting} id="usr-bulk-delete-btn">
          Delete
        </Button>
        <Button icon={<CloseOutlined />} onClick={onClearSelection} id="usr-bulk-clear-btn">
          Clear
        </Button>
      </div>
    </div>
  )
}

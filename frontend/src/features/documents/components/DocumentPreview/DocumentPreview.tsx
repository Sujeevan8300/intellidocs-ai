import { Drawer, Button, Tag, Divider, Typography } from 'antd'
import {
  EditOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  ClockCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  FolderOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { formatFileSize, formatDate, getFileTypeColor } from '../../utils/documentUtils'
import { ProcessingStatusBadge } from '../ProcessingStatus/ProcessingStatus'
import { VersionHistory } from '../VersionHistory/VersionHistory'
import type { Document } from '../../types/Document'

interface DocumentPreviewProps {
  open: boolean
  document: Document | null
  onClose: () => void
  onRename: (doc: Document) => void
  onDownload: (doc: Document) => void
  onToggleFavorite: (id: number) => void
}

export function DocumentPreview({ open, document: doc, onClose, onRename, onDownload, onToggleFavorite }: DocumentPreviewProps) {
  if (!doc) return null

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={520}
      title={
        <div className="doc-preview-header">
          <div className="doc-preview-icon" style={{ background: `${getFileTypeColor(doc.fileType)}18`, color: getFileTypeColor(doc.fileType) }}>
            <FileTextOutlined />
          </div>
          <div className="doc-preview-title-wrap">
            <Typography.Title level={5} style={{ margin: 0 }}>{doc.name}</Typography.Title>
            <Tag color={getFileTypeColor(doc.fileType)} style={{ marginTop: 4 }}>{doc.fileType}</Tag>
          </div>
        </div>
      }
      extra={
        <div className="doc-preview-header-actions">
          <Button icon={doc.favorite ? <StarFilled className="doc-fav-active" /> : <StarOutlined />} onClick={() => onToggleFavorite(doc.id)} />
          <Button icon={<DownloadOutlined />} onClick={() => onDownload(doc)}>Download</Button>
          <Button type="primary" icon={<EditOutlined />} onClick={() => onRename(doc)}>Rename</Button>
        </div>
      }
      className="doc-preview-drawer"
    >
      <div className="doc-preview-section">
        <h4 className="doc-preview-label">Description</h4>
        <p className="doc-preview-text">{doc.description || 'No description provided.'}</p>
      </div>

      <Divider />

      <div className="doc-preview-grid">
        <div className="doc-preview-stat">
          <span className="doc-preview-stat-label"><UserOutlined /> Uploaded By</span>
          <span className="doc-preview-stat-value">{doc.uploadedBy}</span>
        </div>
        <div className="doc-preview-stat">
          <span className="doc-preview-stat-label"><ClockCircleOutlined /> Upload Date</span>
          <span className="doc-preview-stat-value">{formatDate(doc.uploadedAt)}</span>
        </div>
        <div className="doc-preview-stat">
          <span className="doc-preview-stat-label"><FileTextOutlined /> File Size</span>
          <span className="doc-preview-stat-value">{formatFileSize(doc.fileSize)}</span>
        </div>
        <div className="doc-preview-stat">
          <span className="doc-preview-stat-label"><FolderOutlined /> Category</span>
          <span className="doc-preview-stat-value">{doc.category}</span>
        </div>
      </div>

      <Divider />

      <div className="doc-preview-section">
        <h4 className="doc-preview-label">AI Processing Status</h4>
        <ProcessingStatusBadge status={doc.processingStatus} progress={doc.progress} />
      </div>

      <div className="doc-preview-section" style={{ marginTop: 16 }}>
        <h4 className="doc-preview-label"><TagOutlined /> Tags</h4>
        <div className="doc-preview-tags">
          {doc.tags.length > 0 ? doc.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          )) : <span className="doc-preview-text">No tags</span>}
        </div>
      </div>

      <Divider />

      <div className="doc-preview-section">
        <h4 className="doc-preview-label">Preview</h4>
        <div className="doc-preview-placeholder">
          <FileTextOutlined style={{ fontSize: 48, color: '#d6d3e5' }} />
          <p>Document preview will be available once the backend processes this file.</p>
        </div>
      </div>

      <Divider />

      <VersionHistory />
    </Drawer>
  )
}

import { Tag, Tooltip, Button, Progress } from 'antd'
import {
  StarOutlined,
  StarFilled,
  FileTextOutlined,
  FileWordOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons'
import { formatFileSize, formatDate, getProcessingColor, getProcessingLabel, getFileTypeColor } from '../../utils/documentUtils'
import type { Document } from '../../types/Document'

function getFileIcon(fileType: string) {
  switch (fileType) {
    case 'PDF': return <FileTextOutlined />
    case 'DOCX': return <FileWordOutlined />
    case 'MD': return <FileMarkdownOutlined />
    default: return <FileTextOutlined />
  }
}

interface DocumentCardProps {
  document: Document
  onView: (doc: Document) => void
  onToggleFavorite: (id: number) => void
}

export function DocumentCard({ document: doc, onView, onToggleFavorite }: DocumentCardProps) {
  return (
    <div className="doc-card" id={`doc-card-${doc.id}`}>
      <div className="doc-card__header">
        <div
          className="doc-card__icon"
          style={{ background: `${getFileTypeColor(doc.fileType)}18`, color: getFileTypeColor(doc.fileType) }}
        >
          {getFileIcon(doc.fileType)}
        </div>
        <div className="doc-card__header-actions">
          <Tooltip title={doc.favorite ? 'Remove from favorites' : 'Add to favorites'}>
            <Button
              type="text"
              size="small"
              icon={doc.favorite ? <StarFilled className="doc-fav-active" /> : <StarOutlined />}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(doc.id) }}
              className="doc-card__fav"
            />
          </Tooltip>
        </div>
      </div>

      <div className="doc-card__body" onClick={() => onView(doc)}>
        <h4 className="doc-card__name">{doc.name}</h4>
        <p className="doc-card__desc">{doc.description?.slice(0, 60)}{doc.description?.length > 60 ? '…' : ''}</p>
      </div>

      <div className="doc-card__meta">
        <span className="doc-card__category">{doc.category}</span>
        <Tag color={getProcessingColor(doc.processingStatus)} className="doc-card__status">
          {getProcessingLabel(doc.processingStatus)}
        </Tag>
      </div>

      <div className="doc-card__footer">
        <span className="doc-card__size">{formatFileSize(doc.fileSize)}</span>
        <span className="doc-card__date">{formatDate(doc.uploadedAt)}</span>
        <span className="doc-card__type" style={{ color: getFileTypeColor(doc.fileType) }}>{doc.fileType}</span>
      </div>

      {doc.processingStatus !== 'READY' && doc.processingStatus !== 'FAILED' && (
        <Progress
          percent={doc.progress}
          size="small"
          strokeColor="#6558e8"
          showInfo={false}
          className="doc-card__progress"
        />
      )}
    </div>
  )
}

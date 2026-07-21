import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Alert, Tag, Divider } from 'antd'
import { ArrowLeftOutlined, FileTextOutlined, DownloadOutlined, EditOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../../store'
import { fetchDocumentById, toggleFavorite } from '../slices/documentSlice'
import { ProcessingStatusBadge } from '../components/ProcessingStatus/ProcessingStatus'
import { VersionHistory } from '../components/VersionHistory/VersionHistory'
import { PageSkeleton } from '../components/LoadingSkeleton/LoadingSkeleton'
import { formatFileSize, formatDate, getFileTypeColor } from '../utils/documentUtils'

export function DocumentDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedDocument, loading, error } = useSelector((state: RootState) => state.documents)

  useEffect(() => {
    if (id) dispatch(fetchDocumentById(Number(id)))
  }, [id, dispatch])

  if (loading) return <div className="doc-page"><Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/documents')}>Back</Button><PageSkeleton /></div>
  if (error || !selectedDocument) return <div className="doc-page"><Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/documents')}>Back</Button><Alert type="error" message="Document not found" showIcon /></div>

  const doc = selectedDocument

  return (
    <div className="doc-page">
      <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate('/documents')} className="doc-back-btn">Back to Documents</Button>

      <div className="doc-detail-header">
        <div className="doc-detail-icon" style={{ background: `${getFileTypeColor(doc.fileType)}18`, color: getFileTypeColor(doc.fileType) }}>
          <FileTextOutlined />
        </div>
        <div className="doc-detail-meta">
          <div className="doc-detail-eyebrow">Document Details</div>
          <h1 className="doc-detail-name">{doc.name}</h1>
          <div className="doc-detail-tags">
            <Tag color={getFileTypeColor(doc.fileType)}>{doc.fileType}</Tag>
            <Tag>{doc.category}</Tag>
          </div>
        </div>
        <div className="doc-detail-actions">
          <Button icon={doc.favorite ? <StarFilled className="doc-fav-active" /> : <StarOutlined />} onClick={() => dispatch(toggleFavorite(doc.id))} />
          <Button icon={<DownloadOutlined />}>Download</Button>
          <Button type="primary" icon={<EditOutlined />}>Edit</Button>
        </div>
      </div>

      <div className="doc-detail-grid">
        <div className="doc-detail-card">
          <h3 className="doc-detail-card-title">Information</h3>
          <div className="doc-detail-field"><span className="doc-detail-label">Description</span><p className="doc-detail-value">{doc.description || 'No description'}</p></div>
          <div className="doc-detail-field-row">
            <div className="doc-detail-field"><span className="doc-detail-label">File Size</span><span className="doc-detail-value">{formatFileSize(doc.fileSize)}</span></div>
            <div className="doc-detail-field"><span className="doc-detail-label">Version</span><span className="doc-detail-value">v{doc.version}</span></div>
          </div>
          <div className="doc-detail-field-row">
            <div className="doc-detail-field"><span className="doc-detail-label">Uploaded By</span><span className="doc-detail-value">{doc.uploadedBy}</span></div>
            <div className="doc-detail-field"><span className="doc-detail-label">Upload Date</span><span className="doc-detail-value">{formatDate(doc.uploadedAt)}</span></div>
          </div>
        </div>

        <div className="doc-detail-card">
          <h3 className="doc-detail-card-title">AI Processing</h3>
          <ProcessingStatusBadge status={doc.processingStatus} progress={doc.progress} />
          <Divider />
          <h3 className="doc-detail-card-title">Version History</h3>
          <VersionHistory />
        </div>
      </div>
    </div>
  )
}

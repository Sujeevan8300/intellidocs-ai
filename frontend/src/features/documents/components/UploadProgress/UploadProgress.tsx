import { Progress, Button, Tag } from 'antd'
import { CloseCircleOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { formatFileSize } from '../../utils/documentUtils'
import type { UploadFile } from '../../types/Upload'

interface UploadProgressProps {
  uploads: UploadFile[]
  onCancel: (id: string) => void
  onRemove: (id: string) => void
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  pending: { color: 'default', icon: null },
  uploading: { color: 'processing', icon: null },
  processing: { color: 'processing', icon: null },
  complete: { color: 'success', icon: <CheckCircleOutlined /> },
  error: { color: 'error', icon: <CloseCircleOutlined /> },
  cancelled: { color: 'default', icon: null },
}

export function UploadProgress({ uploads, onCancel, onRemove }: UploadProgressProps) {
  if (uploads.length === 0) return null

  return (
    <div className="doc-upload-progress">
      <h4 className="doc-upload-progress-title">Upload Queue ({uploads.length})</h4>
      <div className="doc-upload-progress-list">
        {uploads.map((upload) => {
          const config = statusConfig[upload.status] ?? statusConfig.pending
          return (
            <div key={upload.id} className="doc-upload-progress-item">
              <div className="doc-upload-progress-info">
                <span className="doc-upload-progress-name">{upload.name}</span>
                <span className="doc-upload-progress-size">{formatFileSize(upload.fileSize)}</span>
                <Tag color={config.color} icon={config.icon}>
                  {upload.status === 'complete' ? 'Done' : upload.status === 'error' ? 'Failed' : upload.status}
                </Tag>
              </div>
              {(upload.status === 'uploading' || upload.status === 'processing') && (
                <Progress
                  percent={Math.round(upload.progress)}
                  strokeColor="#6558e8"
                  size="small"
                  className="doc-upload-progress-bar"
                />
              )}
              {upload.error && <p className="doc-upload-progress-error">{upload.error}</p>}
              <div className="doc-upload-progress-actions">
                {(upload.status === 'uploading' || upload.status === 'processing') && (
                  <Button size="small" type="text" icon={<CloseCircleOutlined />} onClick={() => onCancel(upload.id)}>
                    Cancel
                  </Button>
                )}
                {(upload.status === 'error' || upload.status === 'cancelled') && (
                  <Button size="small" type="text" icon={<ReloadOutlined />} onClick={() => onRemove(upload.id)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

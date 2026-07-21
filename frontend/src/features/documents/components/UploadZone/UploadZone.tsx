import { useCallback, useState } from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { SUPPORTED_EXTENSIONS, MAX_FILE_SIZE } from '../../constants/document.constants'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
}

export function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const beforeUpload = useCallback(
    (file: File) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()
      if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        return Upload.LIST_IGNORE
      }
      if (file.size > MAX_FILE_SIZE) {
        return Upload.LIST_IGNORE
      }
      return false
    },
    [],
  )

  const handleChange = useCallback(
    (info: { fileList: Array<{ originFileObj?: File }> }) => {
      const files = info.fileList
        .map((f) => f.originFileObj)
        .filter((f): f is File => f instanceof File)
      if (files.length > 0) {
        onFilesSelected(files)
      }
    },
    [onFilesSelected],
  )

  return (
    <div
      className={`doc-upload-zone ${isDragOver ? 'doc-upload-zone--active' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => setIsDragOver(false)}
    >
      <Upload.Dragger
        multiple
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={false}
        accept={SUPPORTED_EXTENSIONS.join(',')}
        className="doc-upload-dragger"
      >
        <div className="doc-upload-zone-content">
          <div className="doc-upload-zone-icon">
            <InboxOutlined />
          </div>
          <p className="doc-upload-zone-title">Drag & drop files here</p>
          <p className="doc-upload-zone-subtitle">or click to browse</p>
          <p className="doc-upload-zone-hint">
            Supports PDF, DOCX, TXT, and Markdown files up to {Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB
          </p>
        </div>
      </Upload.Dragger>
    </div>
  )
}

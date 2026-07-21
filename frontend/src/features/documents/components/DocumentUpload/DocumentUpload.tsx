import { useState } from 'react'
import { Modal, Form, Input, Select, Button } from 'antd'
import { UploadZone } from '../UploadZone/UploadZone'
import { UploadProgress } from '../UploadProgress/UploadProgress'
import { CATEGORY_OPTIONS } from '../../constants/document.constants'
import { useUpload } from '../../hooks/useUpload'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../store'

interface DocumentUploadProps {
  open: boolean
  onCancel: () => void
}

export function DocumentUpload({ open, onCancel }: DocumentUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [form] = Form.useForm()
  const { startUpload, cancelUpload, validateFile } = useUpload()
  const uploadQueue = useSelector((state: RootState) => state.documents.uploadQueue)

  const handleFilesSelected = (files: File[]) => {
    const valid = files.filter((f) => validateFile(f) === null)
    setSelectedFiles((prev) => [...prev, ...valid])
  }

  const handleUpload = async () => {
    try {
      const values = await form.validateFields()
      for (const file of selectedFiles) {
        await startUpload(file, {
          name: values.name || file.name,
          category: values.category,
          description: values.description || '',
          tags: values.tags || [],
        })
      }
      setSelectedFiles([])
      form.resetFields()
      onCancel()
    } catch {
      // validation failed
    }
  }

  const handleRemove = (id: string) => {
    setSelectedFiles((prev) => prev.filter((_, i) => `upload-${i}` !== id))
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={640}
      title={
        <div className="cat-modal-header">
          <div className="cat-modal-title">Upload Documents</div>
          <div className="cat-modal-subtitle">Add new documents to your knowledge base</div>
        </div>
      }
      className="doc-upload-modal"
      destroyOnHidden
    >
      <UploadZone onFilesSelected={handleFilesSelected} />

      {selectedFiles.length > 0 && (
        <div className="doc-upload-file-list">
          <h4 className="doc-upload-files-title">{selectedFiles.length} file(s) selected</h4>
          <ul className="doc-upload-files">
            {selectedFiles.map((f, i) => (
              <li key={i} className="doc-upload-file-item">{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Form form={form} layout="vertical" className="doc-upload-form" initialValues={{ category: '' }}>
        <Form.Item label="Document Name" name="name" extra="Leave blank to use file name">
          <Input placeholder="Optional custom name" id="upload-doc-name" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select
            id="upload-doc-category"
            placeholder="Select category"
            options={CATEGORY_OPTIONS.filter((o) => o.value !== 'ALL')}
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={2} placeholder="Optional description" id="upload-doc-desc" maxLength={1000} showCount />
        </Form.Item>
      </Form>

      <div className="doc-upload-form-actions">
        <Button onClick={onCancel} id="upload-cancel-btn">Cancel</Button>
        <Button type="primary" onClick={handleUpload} disabled={selectedFiles.length === 0} id="upload-submit-btn">
          Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
        </Button>
      </div>

      <UploadProgress uploads={uploadQueue} onCancel={cancelUpload} onRemove={handleRemove} />
    </Modal>
  )
}

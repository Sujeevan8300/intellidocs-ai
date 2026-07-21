import { useState } from 'react'
import { DocumentUpload } from '../components/DocumentUpload/DocumentUpload'

export function UploadPage() {
  const [uploadOpen, setUploadOpen] = useState(true)

  return (
    <div className="doc-page">
      <div className="doc-page-header">
        <div className="doc-page-header-left">
          <div className="doc-page-eyebrow">KNOWLEDGE BASE</div>
          <h1 className="doc-page-title">Upload Documents</h1>
          <p className="doc-page-subtitle">Add new documents to your AI Knowledge Base</p>
        </div>
      </div>
      <DocumentUpload open={uploadOpen} onCancel={() => setUploadOpen(false)} />
    </div>
  )
}

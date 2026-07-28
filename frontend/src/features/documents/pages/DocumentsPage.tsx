import { useState, useCallback } from 'react'
import { Button, Alert, Modal, Input, notification } from 'antd'
import { FolderOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store'
import { useDocuments } from '../hooks/useDocuments'
import { useBulkSelection } from '../hooks/useBulkSelection'
import { useDocumentFilters } from '../hooks/useDocumentFilters'
import { DocumentTable } from '../components/DocumentTable/DocumentTable'
import { DocumentGrid } from '../components/DocumentGrid/DocumentGrid'
import { DocumentToolbar } from '../components/DocumentToolbar/DocumentToolbar'
import { DocumentFilters } from '../components/DocumentFilters/DocumentFilters'
import { DocumentUpload } from '../components/DocumentUpload/DocumentUpload'
import { DocumentPreview } from '../components/DocumentPreview/DocumentPreview'
import { DeleteDialog } from '../components/DeleteDialog/DeleteDialog'
import { BulkActions } from '../components/BulkActions/BulkActions'
import { PageSkeleton } from '../components/LoadingSkeleton/LoadingSkeleton'
import { deleteDocument, renameDocument as renameDoc, toggleFavorite } from '../slices/documentSlice'
import type { Document } from '../types/Document'

export function DocumentsPage() {
  const dispatch = useDispatch<AppDispatch>()

  const {
    documents,
    loading,
    error,
    searchTerm,
    sort,
    handleSearch,
    handleSort,
    refetch,
  } = useDocuments()

  const {
    filters,
    viewMode,
    handleFilterChange,
    handleResetFilters,
    handleViewModeChange,
    hasActiveFilters,
  } = useDocumentFilters()

  const {
    selectedIds,
    selectedCount,
    toggleSelect,
    selectAll,
    clearAll,
    bulkDelete,
    bulkChangeCategory,
    submitting,
  } = useBulkSelection()

  const [uploadOpen, setUploadOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Document | null>(null)
  const [previewTarget, setPreviewTarget] = useState<Document | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<Document | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const handleView = useCallback((doc: Document) => {
    setPreviewTarget(doc)
    setPreviewOpen(true)
  }, [])

  const handleDownload = useCallback(() => {
    notification.info({ message: 'Download started', description: 'Mock download initiated.', placement: 'topRight' })
  }, [])

  const handleDelete = useCallback((doc: Document) => {
    setDeleteTarget(doc)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return
    const result = await dispatch(deleteDocument(deleteTarget.id))
    if (deleteDocument.fulfilled.match(result)) {
      notification.success({ message: 'Document deleted', description: `"${deleteTarget.name}" has been removed.`, placement: 'topRight' })
      setDeleteTarget(null)
    }
  }, [dispatch, deleteTarget])

  const handleRename = useCallback((doc: Document) => {
    setRenameTarget(doc)
    setRenameValue(doc.name)
  }, [])

  const handleRenameConfirm = useCallback(async () => {
    if (!renameTarget || !renameValue.trim()) return
    const result = await dispatch(renameDoc({ id: renameTarget.id, name: renameValue.trim() }))
    if (renameDoc.fulfilled.match(result)) {
      notification.success({ message: 'Document renamed', description: `Renamed to "${renameValue.trim()}".`, placement: 'topRight' })
    }
    setRenameTarget(null)
  }, [dispatch, renameTarget, renameValue])

  const handleToggleFavorite = useCallback((id: number) => {
    dispatch(toggleFavorite(id))
  }, [dispatch])

  if (error && !loading) {
    return (
      <div className="doc-page">
        <Alert type="error" message="Unable to load documents" description="Please check your connection and try again." action={<Button size="small" onClick={refetch}>Try Again</Button>} showIcon />
      </div>
    )
  }

  return (
    <div className="doc-page">
      <div className="doc-page-header">
        <div className="doc-page-header-left">
          <div className="doc-page-eyebrow"><FolderOutlined /> KNOWLEDGE BASE</div>
          <h1 className="doc-page-title">Documents</h1>
          <p className="doc-page-subtitle">Manage company knowledge documents</p>
        </div>
      </div>

      <BulkActions
        selectedCount={selectedCount}
        onDelete={bulkDelete}
        onChangeCategory={bulkChangeCategory}
        onClearSelection={clearAll}
        submitting={submitting}
      />

      <div className="doc-toolbar-section">
        <DocumentToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          sort={sort}
          onSortChange={handleSort}
          onUploadClick={() => setUploadOpen(true)}
        />
        {hasActiveFilters && (
          <DocumentFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        )}
      </div>

      {loading ? (
        <PageSkeleton />
      ) : viewMode === 'table' ? (
        <DocumentTable
          documents={documents}
          loading={loading}
          selectedIds={selectedIds}
          onSelect={toggleSelect}
          onSelectAll={selectAll}
          onView={handleView}
          onRename={handleRename}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onToggleFavorite={handleToggleFavorite}
          onUploadClick={() => setUploadOpen(true)}
        />
      ) : (
        <DocumentGrid
          documents={documents}
          loading={loading}
          onView={handleView}
          onToggleFavorite={handleToggleFavorite}
          onUploadClick={() => setUploadOpen(true)}
        />
      )}

      <DocumentUpload open={uploadOpen} onCancel={() => setUploadOpen(false)} />

      <DocumentPreview
        open={previewOpen}
        document={previewTarget}
        onClose={() => { setPreviewOpen(false); setPreviewTarget(null) }}
        onRename={(doc) => { setPreviewOpen(false); handleRename(doc) }}
        onDownload={handleDownload}
        onToggleFavorite={handleToggleFavorite}
      />

      <DeleteDialog
        open={!!deleteTarget}
        documentName={deleteTarget?.name ?? ''}
        loading={submitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <Modal
        open={!!renameTarget}
        title="Rename Document"
        onOk={handleRenameConfirm}
        onCancel={() => setRenameTarget(null)}
        okText="Rename"
      >
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={handleRenameConfirm}
          id="rename-input"
        />
      </Modal>
    </div>
  )
}

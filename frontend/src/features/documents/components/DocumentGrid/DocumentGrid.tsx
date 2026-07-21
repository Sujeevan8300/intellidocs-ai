import { DocumentCard } from '../DocumentCard/DocumentCard'
import { EmptyState } from '../EmptyState/EmptyState'
import type { Document } from '../../types/Document'

interface DocumentGridProps {
  documents: Document[]
  loading: boolean
  onView: (doc: Document) => void
  onToggleFavorite: (id: number) => void
  onUploadClick: () => void
}

export function DocumentGrid({ documents, loading, onView, onToggleFavorite, onUploadClick }: DocumentGridProps) {
  if (!loading && documents.length === 0) {
    return <EmptyState onCreateClick={onUploadClick} />
  }

  return (
    <div className="doc-grid">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onView={onView}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

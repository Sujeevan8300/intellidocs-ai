import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Skeleton, Alert, Tag } from 'antd'
import {
  ArrowLeftOutlined,
  EditOutlined,
  FolderOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import type { RootState, AppDispatch } from '../../../store'
import { fetchCategoryById } from '../slices/categorySlice'
import { CategoryStatusBadge } from '../components/CategoryStatusBadge/CategoryStatusBadge'
import { formatDate } from '../utils/categoryFormatter'

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: '#ef4444',
  DOCX: '#3b82f6',
  XLSX: '#22c55e',
  PPTX: '#f97316',
  MD: '#8b5cf6',
  TF: '#6366f1',
  DEFAULT: '#6b7280',
}

export function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)
  const { selectedCategory, loading, error } = useSelector(
    (state: RootState) => state.categories,
  )

  const canEdit =
    user?.role === 'SUPER_ADMIN' || user?.role === 'KNOWLEDGE_MANAGER'

  useEffect(() => {
    if (id) dispatch(fetchCategoryById(Number(id)))
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="cat-page">
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate('/categories')}
          className="cat-back-btn"
        >
          Back to Categories
        </Button>
        <div className="cat-details-skeleton">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    )
  }

  if (error || !selectedCategory) {
    return (
      <div className="cat-page">
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate('/categories')}
          className="cat-back-btn"
        >
          Back to Categories
        </Button>
        <Alert
          type="error"
          message="Category not found"
          description="This category may have been deleted or the link is invalid."
          showIcon
        />
      </div>
    )
  }

  const cat = selectedCategory

  return (
    <div className="cat-page">
      {/* Back navigation */}
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        onClick={() => navigate('/categories')}
        className="cat-back-btn"
        id="back-to-categories-btn"
      >
        Back to Categories
      </Button>

      {/* Detail header */}
      <div className="cat-detail-header">
        <div className="cat-detail-icon">
          <FolderOutlined />
        </div>
        <div className="cat-detail-meta">
          <div className="cat-detail-eyebrow">Category Details</div>
          <h1 className="cat-detail-name">{cat.name}</h1>
          {cat.parentName && (
            <div className="cat-detail-parent">
              <PartitionOutlined /> {cat.parentName}
            </div>
          )}
        </div>
        <div className="cat-detail-header-actions">
          <CategoryStatusBadge status={cat.status} />
          {canEdit && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate('/categories')}
              id="detail-edit-btn"
            >
              Edit Category
            </Button>
          )}
        </div>
      </div>

      {/* Detail grid */}
      <div className="cat-detail-grid">
        {/* Left – info */}
        <div className="cat-detail-card">
          <h3 className="cat-detail-card-title">Information</h3>

          {cat.description && (
            <div className="cat-detail-field">
              <span className="cat-detail-label">Description</span>
              <p className="cat-detail-value cat-detail-value--desc">{cat.description}</p>
            </div>
          )}

          <div className="cat-detail-field-row">
            <div className="cat-detail-field">
              <span className="cat-detail-label">
                <FileTextOutlined /> Documents
              </span>
              <span className="cat-detail-value cat-detail-value--count">
                {cat.documentCount}
              </span>
            </div>
            <div className="cat-detail-field">
              <span className="cat-detail-label">Status</span>
              <CategoryStatusBadge status={cat.status} />
            </div>
          </div>

          <div className="cat-detail-field-row">
            <div className="cat-detail-field">
              <span className="cat-detail-label">
                <UserOutlined /> Created By
              </span>
              <span className="cat-detail-value">{cat.createdBy}</span>
            </div>
            <div className="cat-detail-field">
              <span className="cat-detail-label">
                <CalendarOutlined /> Created Date
              </span>
              <span className="cat-detail-value">{formatDate(cat.createdDate)}</span>
            </div>
          </div>

          {cat.parentName && (
            <div className="cat-detail-field">
              <span className="cat-detail-label">
                <PartitionOutlined /> Parent Category
              </span>
              <span className="cat-detail-value">{cat.parentName}</span>
            </div>
          )}
        </div>

        {/* Right – documents */}
        <div className="cat-detail-card">
          <h3 className="cat-detail-card-title">
            Related Documents
            <Tag className="cat-detail-doc-count-tag">{cat.relatedDocuments?.length ?? 0}</Tag>
          </h3>

          {cat.relatedDocuments && cat.relatedDocuments.length > 0 ? (
            <ul className="cat-related-docs">
              {cat.relatedDocuments.map((doc) => (
                <li key={doc.id} className="cat-related-doc-item">
                  <div
                    className="cat-related-doc-type"
                    style={{
                      background: `${FILE_TYPE_COLORS[doc.type] ?? FILE_TYPE_COLORS.DEFAULT}18`,
                      color: FILE_TYPE_COLORS[doc.type] ?? FILE_TYPE_COLORS.DEFAULT,
                    }}
                  >
                    {doc.type}
                  </div>
                  <span className="cat-related-doc-name">{doc.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cat-related-empty">
              <FileTextOutlined />
              <p>No documents linked to this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

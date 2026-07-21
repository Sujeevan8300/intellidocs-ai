import { Table, Button, Tooltip, Tag, Checkbox } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  FileTextOutlined,
  FileWordOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons'
import { EmptyState } from '../EmptyState/EmptyState'
import { formatFileSize, formatDate, getProcessingColor, getProcessingLabel, getFileTypeColor } from '../../utils/documentUtils'
import type { Document } from '../../types/Document'
import { DEFAULT_PAGE_SIZE } from '../../constants/document.constants'

function getFileIcon(fileType: string) {
  switch (fileType) {
    case 'PDF': return <FileTextOutlined />
    case 'DOCX': return <FileWordOutlined />
    case 'MD': return <FileMarkdownOutlined />
    default: return <FileTextOutlined />
  }
}

interface DocumentTableProps {
  documents: Document[]
  loading: boolean
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: () => void
  onView: (doc: Document) => void
  onRename: (doc: Document) => void
  onDelete: (doc: Document) => void
  onDownload: (doc: Document) => void
  onToggleFavorite: (id: number) => void
  onUploadClick: () => void
}

export function DocumentTable({
  documents,
  loading,
  selectedIds,
  onSelect,
  onSelectAll,
  onView,
  onRename,
  onDelete,
  onDownload,
  onToggleFavorite,
  onUploadClick,
}: DocumentTableProps) {
  const columns: ColumnsType<Document> = [
    {
      title: '',
      key: 'checkbox',
      width: 40,
      render: (_: unknown, record: Document) => (
        <Checkbox
          checked={selectedIds.includes(record.id)}
          onChange={() => onSelect(record.id)}
          id={`select-doc-${record.id}`}
        />
      ),
    },
    {
      title: 'Document Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Document) => (
        <div className="doc-table-name" onClick={() => onView(record)}>
          <div
            className="doc-table-icon"
            style={{ background: `${getFileTypeColor(record.fileType)}18`, color: getFileTypeColor(record.fileType) }}
          >
            {getFileIcon(record.fileType)}
          </div>
          <div>
            <div className="doc-table-name-text">{name}</div>
            <div className="doc-table-name-desc">{record.description?.slice(0, 50)}{record.description?.length > 50 ? '…' : ''}</div>
          </div>
        </div>
      ),
      sorter: true,
      width: 280,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <span className="doc-table-secondary">{cat}</span>,
      width: 140,
    },
    {
      title: 'Type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (type: string) => (
        <Tag style={{ color: getFileTypeColor(type), background: `${getFileTypeColor(type)}18`, border: 'none', fontWeight: 700, fontSize: 10 }}>
          {type}
        </Tag>
      ),
      width: 80,
    },
    {
      title: 'Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size: number) => <span className="doc-table-secondary">{formatFileSize(size)}</span>,
      sorter: true,
      width: 90,
    },
    {
      title: 'Uploaded By',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
      render: (by: string) => <span className="doc-table-secondary">{by}</span>,
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (date: string) => <span className="doc-table-secondary">{formatDate(date)}</span>,
      sorter: true,
      width: 110,
    },
    {
      title: 'Status',
      dataIndex: 'processingStatus',
      key: 'processingStatus',
      render: (status: string) => (
        <Tag color={getProcessingColor(status as never)} className="doc-status-tag">
          {getProcessingLabel(status as never)}
        </Tag>
      ),
      width: 110,
    },
    {
      title: 'AI',
      dataIndex: 'aiReady',
      key: 'aiReady',
      align: 'center',
      render: (ready: boolean) => (
        <Tag color={ready ? 'success' : 'default'} className="doc-ai-tag">
          {ready ? 'Ready' : '—'}
        </Tag>
      ),
      width: 70,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 140,
      render: (_: unknown, record: Document) => (
        <div className="doc-table-actions">
          <Tooltip title="View"><Button type="text" icon={<EyeOutlined />} size="small" onClick={() => onView(record)} id={`view-${record.id}`} /></Tooltip>
          <Tooltip title="Rename"><Button type="text" icon={<EditOutlined />} size="small" onClick={() => onRename(record)} id={`rename-${record.id}`} /></Tooltip>
          <Tooltip title="Download"><Button type="text" icon={<DownloadOutlined />} size="small" onClick={() => onDownload(record)} id={`download-${record.id}`} /></Tooltip>
          <Tooltip title={record.favorite ? 'Unfavorite' : 'Favorite'}>
            <Button
              type="text"
              size="small"
              icon={record.favorite ? <StarFilled className="doc-fav-active" /> : <StarOutlined />}
              onClick={() => onToggleFavorite(record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} size="small" danger onClick={() => onDelete(record)} id={`delete-${record.id}`} /></Tooltip>
        </div>
      ),
    },
  ]

  if (!loading && documents.length === 0) {
    return <EmptyState onCreateClick={onUploadClick} />
  }

  return (
    <Table<Document>
      dataSource={documents}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} documents`,
        showSizeChanger: false,
        className: 'doc-pagination',
      }}
      rowSelection={{
        selectedRowKeys: selectedIds,
        onChange: () => {
          onSelectAll()
        },
      }}
      scroll={{ x: 1400 }}
      className="doc-table"
      onRow={(record) => ({ onDoubleClick: () => onView(record) })}
    />
  )
}

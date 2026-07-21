import { Table, Button, Tooltip, Skeleton } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import { CategoryStatusBadge } from '../CategoryStatusBadge/CategoryStatusBadge'
import { EmptyState } from '../EmptyState/EmptyState'
import { formatDate } from '../../utils/categoryFormatter'
import type { Category } from '../../types/Category'
import { DEFAULT_PAGE_SIZE } from '../../constants/category.constants'

interface CategoryTableProps {
  categories: Category[]
  loading: boolean
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  onView: (category: Category) => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onCreateClick: () => void
}

function SkeletonRow() {
  return (
    <tr className="cat-skeleton-row">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i}>
          <Skeleton.Input active size="small" style={{ width: '80%', height: 16 }} />
        </td>
      ))}
    </tr>
  )
}

export function CategoryTable({
  categories,
  loading,
  canCreate,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
  onCreateClick,
}: CategoryTableProps) {
  const columns: ColumnsType<Category> = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Category) => (
        <div className="cat-table-name" onClick={() => onView(record)}>
          <div className="cat-table-icon">
            <FolderOutlined />
          </div>
          <div>
            <div className="cat-table-name-text">{name}</div>
            {record.parentName && (
              <div className="cat-table-parent-label">↳ {record.parentName}</div>
            )}
          </div>
        </div>
      ),
      width: 240,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => (
        <span className="cat-table-desc">
          {desc?.length > 70 ? `${desc.slice(0, 70)}…` : desc || '—'}
        </span>
      ),
      width: 280,
    },
    {
      title: 'Parent Category',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (parent: string) => (
        <span className="cat-table-secondary">{parent || '—'}</span>
      ),
      width: 160,
    },
    {
      title: 'Documents',
      dataIndex: 'documentCount',
      key: 'documentCount',
      align: 'center',
      render: (count: number) => (
        <span className="cat-table-doc-count">{count}</span>
      ),
      sorter: (a, b) => a.documentCount - b.documentCount,
      width: 110,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <CategoryStatusBadge status={status} />,
      width: 110,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (by: string) => (
        <span className="cat-table-secondary">{by}</span>
      ),
      width: 130,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => (
        <span className="cat-table-secondary">{formatDate(date)}</span>
      ),
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      width: 130,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (_: unknown, record: Category) => (
        <div className="cat-table-actions">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              className="cat-action-btn cat-action-btn--view"
              id={`view-btn-${record.id}`}
              size="small"
            />
          </Tooltip>
          {canEdit && (
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
                className="cat-action-btn cat-action-btn--edit"
                id={`edit-btn-${record.id}`}
                size="small"
              />
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(record)}
                className="cat-action-btn cat-action-btn--delete"
                id={`delete-btn-${record.id}`}
                size="small"
                danger
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="cat-table-skeleton">
        <table className="ant-table">
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Table<Category>
      dataSource={categories}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} categories`,
        showSizeChanger: false,
        className: 'cat-pagination',
      }}
      locale={{
        emptyText: (
          <EmptyState
            canCreate={canCreate}
            onCreateClick={onCreateClick}
            title="No categories found"
            description="Try adjusting your search or filters."
          />
        ),
      }}
      scroll={{ x: 1200 }}
      className="cat-table"
      onRow={(record) => ({
        onDoubleClick: () => onView(record),
      })}
    />
  )
}

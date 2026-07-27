import { ArrowRightOutlined, MoreOutlined, FilePdfOutlined } from '@ant-design/icons'
import { Button, Card, Table, Tag } from 'antd'
import type { TableColumnsType } from 'antd'
import { Link } from 'react-router-dom'
import type { DocumentRow } from '../../types'
import styles from '../../styles/dashboard.module.css'

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const fileTypeColor: Record<string, string> = {
  PDF: '#e46b63',
  DOCX: '#4a90d9',
  TXT: '#8b899c',
}

const statusTone: Record<string, 'success' | 'processing' | 'warning'> = {
  Processed: 'success',
  Processing: 'processing',
  'Needs review': 'warning',
}

interface RecentDocumentsProps {
  documents: DocumentRow[]
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  const columns: TableColumnsType<DocumentRow> = [
    {
      title: 'NAME',
      dataIndex: 'name',
      render: (name: string, record) => (
        <Link to={`/documents/${record.id}`} className={styles.documentName}>
          <span
            className={styles.fileIcon}
            style={{ color: fileTypeColor[record.type] ?? '#e46b63', background: `${fileTypeColor[record.type] ?? '#e46b63'}14` }}
          >
            <FilePdfOutlined />
          </span>
          <div>
            <strong>{name}</strong>
            <span>{record.type} &middot; {record.size}</span>
          </div>
        </Link>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (status: DocumentRow['status']) => (
        <Tag className={styles.statusTag} color={statusTone[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'UPDATED',
      dataIndex: 'updated',
      render: (updated: string) => timeAgo(updated),
    },
    {
      title: '',
      key: 'action',
      width: 44,
      render: () => <Button type="text" icon={<MoreOutlined />} aria-label="Document actions" />,
    },
  ]

  return (
    <Card
      className={`${styles.panel} ${styles.documentsPanel}`}
      bordered={false}
      title={
        <div>
          <h2>Recent documents</h2>
          <span>Latest additions to your knowledge base</span>
        </div>
      }
      extra={
        <Link to="/documents" className={styles.viewLink}>
          View all <ArrowRightOutlined />
        </Link>
      }
    >
      <Table
        columns={columns}
        dataSource={documents}
        rowKey="id"
        pagination={false}
        size="middle"
      />
    </Card>
  )
}

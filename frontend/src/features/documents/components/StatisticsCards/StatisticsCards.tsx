import { useSelector } from 'react-redux'
import { Skeleton } from 'antd'
import {
  FileTextOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudOutlined,
} from '@ant-design/icons'
import type { RootState } from '../../../../store'
import { formatFileSize } from '../../utils/documentUtils'
import { ProcessingStatus } from '../../types/ProcessingStatus'
import type { Document } from '../../types/Document'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  color: string
  bgColor: string
}

function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div className="doc-stat-card">
      <div className="doc-stat-icon" style={{ background: bgColor, color }}>{icon}</div>
      <div className="doc-stat-info">
        <span className="doc-stat-value">{value}</span>
        <span className="doc-stat-label">{label}</span>
      </div>
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="doc-stat-card">
      <Skeleton.Avatar active size={40} shape="square" />
      <div className="doc-stat-info">
        <Skeleton.Input active size="small" style={{ width: 48, height: 20 }} />
        <Skeleton.Input active size="small" style={{ width: 72, height: 12 }} />
      </div>
    </div>
  )
}

export function StatisticsCards() {
  const { documents, loading } = useSelector((state: RootState) => state.documents)

  const total = documents.length
  const processing = documents.filter((d: Document) =>
    ([ProcessingStatus.PROCESSING, ProcessingStatus.CHUNKING, ProcessingStatus.EMBEDDING, ProcessingStatus.UPLOADING] as string[]).includes(d.processingStatus),
  ).length
  const ready = documents.filter((d: Document) => d.processingStatus === ProcessingStatus.READY).length
  const failed = documents.filter((d: Document) => d.processingStatus === ProcessingStatus.FAILED).length
  const totalSize = documents.reduce((sum: number, d: Document) => sum + d.fileSize, 0)

  if (loading) {
    return <div className="doc-stats-cards"><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></div>
  }

  return (
    <div className="doc-stats-cards">
      <StatCard icon={<FileTextOutlined />} label="Total Documents" value={total} color="#6558e8" bgColor="#eeecff" />
      <StatCard icon={<SyncOutlined />} label="Processing" value={processing} color="#f97316" bgColor="#fff7ed" />
      <StatCard icon={<CheckCircleOutlined />} label="Ready for AI" value={ready} color="#10b981" bgColor="#ecfdf5" />
      <StatCard icon={<CloseCircleOutlined />} label="Failed" value={failed} color="#ef4444" bgColor="#fef2f2" />
      <StatCard icon={<CloudOutlined />} label="Storage Used" value={formatFileSize(totalSize)} color="#3b82f6" bgColor="#eff6ff" />
    </div>
  )
}

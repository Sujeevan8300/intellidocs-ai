import { Skeleton } from 'antd'

export function TableSkeleton() {
  return (
    <div className="usr-table-skeleton" role="status" aria-label="Loading users table">
      <Skeleton active paragraph={{ rows: 10 }} />
    </div>
  )
}

export function GridSkeleton() {
  return (
    <div className="usr-grid-skeleton" role="status" aria-label="Loading users grid">
      <div className="usr-grid-skeleton-row">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="usr-grid-skeleton-card">
            <Skeleton.Avatar active size={64} />
            <Skeleton.Input active style={{ width: '60%' }} />
            <Skeleton.Input active size="small" style={{ width: '80%' }} />
            <Skeleton.Input active size="small" style={{ width: '40%' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="usr-stats-skeleton" role="status" aria-label="Loading statistics">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="usr-stat-card">
          <Skeleton.Avatar active size={40} shape="square" />
          <div className="usr-stat-info">
            <Skeleton.Input active size="small" style={{ width: 48, height: 20 }} />
            <Skeleton.Input active size="small" style={{ width: 72, height: 12 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="usr-page-skeleton" role="status" aria-label="Loading page">
      <Skeleton.Input active style={{ width: 200, height: 32, marginBottom: 24 }} />
      <StatsSkeleton />
      <div style={{ marginTop: 24 }}>
        <Skeleton.Input active style={{ width: '100%', height: 48, marginBottom: 16 }} />
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    </div>
  )
}

import { Skeleton, Card } from 'antd'

export function TableSkeleton() {
  return (
    <div className="doc-skeleton-table">
      <table className="ant-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}><div className="doc-skeleton-cell" /></th>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i}><div className="doc-skeleton-cell" style={{ width: '60%' }} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              <td><div className="doc-skeleton-cell" style={{ width: 20, height: 20 }} /></td>
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <td key={colIdx}><div className="doc-skeleton-cell" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function GridSkeleton() {
  return (
    <div className="doc-skeleton-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="doc-skeleton-card" bordered={false}>
          <Skeleton.Avatar active size={48} shape="square" />
          <Skeleton.Input active style={{ width: '80%', height: 16, marginTop: 12 }} />
          <Skeleton.Input active style={{ width: '60%', height: 12, marginTop: 8 }} />
          <Skeleton.Input active style={{ width: '40%', height: 12, marginTop: 8 }} />
        </Card>
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="doc-skeleton-stats">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="doc-skeleton-stat-card">
          <Skeleton.Avatar active size={40} shape="square" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
    <div className="doc-page-skeleton">
      <StatsSkeleton />
      <div className="doc-skeleton-toolbar">
        <Skeleton.Input active style={{ width: 280, height: 38 }} />
        <Skeleton.Input active style={{ width: 140, height: 38 }} />
        <Skeleton.Input active style={{ width: 140, height: 38 }} />
        <Skeleton.Input active style={{ width: 120, height: 38 }} />
      </div>
      <TableSkeleton />
    </div>
  )
}

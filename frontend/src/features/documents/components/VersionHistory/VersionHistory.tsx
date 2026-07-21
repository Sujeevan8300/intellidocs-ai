import { Timeline, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const mockVersions = [
  { version: '2.0', date: '2026-06-15', updatedBy: 'Sarah Chen', notes: 'Major revision with updated compliance section' },
  { version: '1.1', date: '2026-03-20', updatedBy: 'James Park', notes: 'Minor corrections and formatting updates' },
  { version: '1.0', date: '2026-01-10', updatedBy: 'Admin', notes: 'Initial document upload' },
]

export function VersionHistory() {
  return (
    <div className="doc-version-history">
      <Typography.Title level={5} style={{ marginBottom: 16 }}>Version History</Typography.Title>
      <Timeline
        items={mockVersions.map((v) => ({
          color: 'green',
          dot: <CheckCircleOutlined />,
          children: (
            <div className="doc-version-item">
              <div className="doc-version-header">
                <span className="doc-version-tag">v{v.version}</span>
                <span className="doc-version-date">{v.date}</span>
              </div>
              <p className="doc-version-author">{v.updatedBy}</p>
              <p className="doc-version-notes">{v.notes}</p>
            </div>
          ),
        }))}
      />
    </div>
  )
}

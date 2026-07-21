import { ArrowRightOutlined, CheckCircleFilled, ClockCircleOutlined, FilePdfOutlined, FileTextOutlined, MoreOutlined, PlusOutlined, RobotOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Progress, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { MetricCard } from '../../../components/molecules/MetricCard'
import { Permission } from '../../../components/atoms/Permission'
import { StatusPill } from '../../../components/atoms/StatusPill'
import { Permissions } from '../../../constants/permissions'
import { UsageChart } from '../components/UsageChart'
import type { Activity, DocumentRow } from '../types'

const docs: DocumentRow[] = [
  { id: '1', name: 'Employee Handbook 2024', type: 'PDF', size: '4.2 MB', updated: '12 min ago', status: 'Processed', owner: 'SM' },
  { id: '2', name: 'Q2 Product Roadmap', type: 'DOCX', size: '1.8 MB', updated: '1 hour ago', status: 'Processed', owner: 'AM' },
  { id: '3', name: 'Information Security Policy', type: 'PDF', size: '2.6 MB', updated: 'Yesterday', status: 'Processing', owner: 'JL' },
  { id: '4', name: 'Customer Success Playbook', type: 'PDF', size: '8.1 MB', updated: 'Yesterday', status: 'Needs review', owner: 'SM' },
]
const activities: Activity[] = [
  { id: '1', type: 'upload', title: 'Sarah Miller uploaded a document', meta: 'Employee Handbook 2024 · 12 minutes ago' },
  { id: '2', type: 'chat', title: 'AI Assistant conversation completed', meta: '“Q2 marketing strategy” · 24 minutes ago' },
  { id: '3', type: 'edit', title: 'Document processing completed', meta: 'Annual Compliance Report · 42 minutes ago' },
  { id: '4', type: 'user', title: 'New team member joined', meta: 'Jordan Lee · 1 hour ago' },
]
const documentColumns: TableColumnsType<DocumentRow> = [
  { title: 'NAME', dataIndex: 'name', render: (name: string) => <div className="document-name"><span className="file-icon"><FilePdfOutlined /></span><div><strong>{name}</strong><span>{docs.find((item) => item.name === name)?.type} · {docs.find((item) => item.name === name)?.size}</span></div></div> },
  { title: 'STATUS', dataIndex: 'status', render: (status: DocumentRow['status']) => <StatusPill label={status} tone={status === 'Processed' ? 'success' : status === 'Processing' ? 'processing' : 'warning'} /> },
  { title: 'LAST UPDATED', dataIndex: 'updated' },
  { title: '', key: 'action', width: 44, render: () => <Button type="text" icon={<MoreOutlined />} aria-label="Document actions" /> },
]
const activityIcon = (type: Activity['type']) => ({ upload: <FileTextOutlined />, chat: <RobotOutlined />, edit: <CheckCircleFilled />, user: <TeamOutlined /> })[type]
export function DashboardPage() { return <><section className="welcome-row"><div><p className="eyebrow">MONDAY, MAY 30</p><h1>Good morning, Alex <span>✦</span></h1><p className="subtle">Here’s what’s happening with your knowledge base today.</p></div><Permission permission={Permissions.documentCreate}><Button type="primary" size="large" icon={<PlusOutlined />}>Upload document</Button></Permission></section><section className="metric-grid"><MetricCard label="Total documents" value="1,284" delta="12.5%" icon={<FileTextOutlined />} detail="vs. last month"/><MetricCard label="AI conversations" value="3,842" delta="18.2%" icon={<RobotOutlined />} detail="vs. last month"/><MetricCard label="Active users" value="248" delta="4.1%" icon={<TeamOutlined />} detail="vs. last month"/><MetricCard label="Processing queue" value="12" delta="2.4%" positive={false} icon={<ClockCircleOutlined />} detail="documents in progress"/></section><section className="dashboard-grid"><Card className="panel usage-panel" bordered={false} title={<div><h2>AI usage</h2><span>Requests made over the last 30 days</span></div>} extra={<Dropdown menu={{ items: [{ key: '30', label: 'Last 30 days' }] }}><button className="period-button">Last 30 days <ArrowRightOutlined /></button></Dropdown>}><div className="usage-total"><strong>84,392</strong><span><b>+18.2%</b> vs. previous period</span></div><UsageChart /></Card><Card className="panel health-panel" bordered={false} title={<div><h2>System health</h2><span>All systems operational</span></div>}><div className="health-score"><Progress type="circle" percent={99.9} size={116} strokeWidth={9} format={() => <><b>99.9%</b><span>uptime</span></>} /></div><div className="health-list"><div><span className="health-dot"/> API services <strong>Operational</strong></div><div><span className="health-dot"/> AI processing <strong>Operational</strong></div><div><span className="health-dot"/> Document indexing <strong>Operational</strong></div></div><a className="view-link" href="#status">View system status <ArrowRightOutlined /></a></Card></section><section className="lower-grid"><Card className="panel documents-panel" bordered={false} title={<div><h2>Recent documents</h2><span>Latest additions to your knowledge base</span></div>} extra={<a className="view-link" href="#documents">View all <ArrowRightOutlined /></a>}><Table columns={documentColumns} dataSource={docs} rowKey="id" pagination={false} size="middle" /></Card><Card className="panel activity-panel" bordered={false} title={<div><h2>Recent activity</h2><span>Latest updates across your workspace</span></div>} extra={<a className="view-link" href="#activity">View all</a>}>{activities.map((activity) => <div className="activity" key={activity.id}><span className={`activity-icon ${activity.type}`}>{activityIcon(activity.type)}</span><div><strong>{activity.title}</strong><span>{activity.meta}</span></div></div>)}<div className="tip"><ThunderboltOutlined /><div><strong>Get more from IntelliDocs</strong><span>Invite your team and unlock shared knowledge.</span></div><ArrowRightOutlined /></div></Card></section></> }

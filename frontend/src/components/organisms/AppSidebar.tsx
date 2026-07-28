import { AppstoreOutlined, BarChartOutlined, BookOutlined, FileTextOutlined, FolderOpenOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
const items: MenuProps['items'] = [
  { key: 'workspace', type: 'group', label: 'WORKSPACE', children: [{ key: 'dashboard', icon: <AppstoreOutlined />, label: 'Overview' }, { key: 'chat', icon: <BookOutlined />, label: 'AI Assistant' }, { key: 'search', icon: <FolderOpenOutlined />, label: 'Semantic Search' }] },
  { key: 'knowledge', type: 'group', label: 'KNOWLEDGE', children: [{ key: 'documents', icon: <FileTextOutlined />, label: 'Documents' }, { key: 'categories', icon: <FolderOpenOutlined />, label: 'Categories' }] },
  { key: 'management', type: 'group', label: 'MANAGEMENT', children: [{ key: 'users', icon: <TeamOutlined />, label: 'Users' }, { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' }] },
]

const ROUTE_MAP: Record<string, string> = {
  dashboard: '/',
  analytics: '/analytics',
  chat: '/assistant',
  search: '/search',
  documents: '/documents',
  categories: '/categories',
  users: '/users',
}

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = (() => {
    if (location.pathname.startsWith('/analytics')) return 'analytics'
    if (location.pathname.startsWith('/users')) return 'users'
    if (location.pathname.startsWith('/categories')) return 'categories'
    if (location.pathname.startsWith('/documents')) return 'documents'
    if (location.pathname === '/assistant') return 'chat'
    if (location.pathname === '/search') return 'search'
    return 'dashboard'
  })()

  return (
    <aside className="app-sidebar">
      <div className="brand">
        <span className="brand__mark">i</span>
        <span>IntelliDocs</span>
        <span className="brand__ai">AI</span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => {
          const route = ROUTE_MAP[key]
          if (route) navigate(route)
        }}
        items={items}
        className="sidebar-menu"
      />
      <div className="sidebar-bottom">
        <button className="bottom-link" onClick={() => navigate('/settings')}><SettingOutlined /> Settings</button>
        <button className="bottom-link" onClick={() => navigate('/help')}><UserOutlined /> Help & support</button>
        <div className="storage">
          <div className="storage__labels"><span>Storage used</span><strong>68%</strong></div>
          <div className="storage__track"><i /></div>
          <span>6.8 GB of 10 GB</span>
        </div>
      </div>
    </aside>
  )
}

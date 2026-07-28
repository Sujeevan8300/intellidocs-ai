import { useState, useEffect } from 'react'
import { BarChartOutlined, DashboardOutlined, FileTextOutlined, LeftOutlined, QuestionCircleOutlined, RightOutlined, RobotOutlined, SearchOutlined, SettingOutlined, TagsOutlined, TeamOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSidebar } from './SidebarContext'

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { key: 'dashboard', icon: <DashboardOutlined />, label: 'Overview', route: '/' },
      { key: 'chat', icon: <RobotOutlined />, label: 'AI Assistant', route: '/assistant' },
      { key: 'search', icon: <SearchOutlined />, label: 'Semantic Search', route: '/search' },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { key: 'documents', icon: <FileTextOutlined />, label: 'Documents', route: '/documents' },
      { key: 'categories', icon: <TagsOutlined />, label: 'Categories', route: '/categories' },
    ],
  },
  {
    label: 'Team',
    items: [
      { key: 'users', icon: <TeamOutlined />, label: 'Users', route: '/users' },
      { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics', route: '/analytics' },
    ],
  },
]

const COLLAPSED_KEY = 'sidebar-collapsed'

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mobileOpen, closeMobile } = useSidebar()
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSED_KEY) === 'true' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(COLLAPSED_KEY, String(collapsed)) } catch { /* noop */ }
  }, [collapsed])

  const selectedKey = (() => {
    if (location.pathname.startsWith('/analytics')) return 'analytics'
    if (location.pathname.startsWith('/users')) return 'users'
    if (location.pathname.startsWith('/categories')) return 'categories'
    if (location.pathname.startsWith('/documents')) return 'documents'
    if (location.pathname === '/assistant') return 'chat'
    if (location.pathname === '/search') return 'search'
    return 'dashboard'
  })()

  const handleNav = (route: string) => {
    navigate(route)
    closeMobile()
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobile} />}

      <aside className={[
        'app-sidebar',
        collapsed ? 'app-sidebar--collapsed' : '',
        mobileOpen ? 'app-sidebar--mobile-open' : '',
      ].filter(Boolean).join(' ')}>
        {/* Brand */}
        <div className="sb-brand">
          <span className="sb-brand__logo">i</span>
          {!collapsed && <span className="sb-brand__text">IntelliDocs<span className="sb-brand__ai">AI</span></span>}
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="sb-section">
              {!collapsed && <span className="sb-section__label">{section.label}</span>}
              {collapsed && <div className="sb-section__divider" />}
              {section.items.map((item) => (
                <Tooltip
                  key={item.key}
                  title={collapsed ? item.label : ''}
                  placement="right"
                  arrow={false}
                  overlayInnerStyle={{ borderRadius: 6, fontSize: 12 }}
                >
                  <button
                    className={`sb-nav__item${selectedKey === item.key ? ' sb-nav__item--active' : ''}`}
                    onClick={() => handleNav(item.route)}
                  >
                    <span className="sb-nav__icon">{item.icon}</span>
                    {!collapsed && <span className="sb-nav__label">{item.label}</span>}
                  </button>
                </Tooltip>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sb-footer">
          <Tooltip title={collapsed ? 'Settings' : ''} placement="right" arrow={false} overlayInnerStyle={{ borderRadius: 6, fontSize: 12 }}>
            <button className="sb-footer__item" onClick={() => handleNav('/settings')}>
              <span className="sb-nav__icon"><SettingOutlined /></span>
              {!collapsed && <span className="sb-nav__label">Settings</span>}
            </button>
          </Tooltip>
          <Tooltip title={collapsed ? 'Help & Support' : ''} placement="right" arrow={false} overlayInnerStyle={{ borderRadius: 6, fontSize: 12 }}>
            <button className="sb-footer__item" onClick={() => handleNav('/help')}>
              <span className="sb-nav__icon"><QuestionCircleOutlined /></span>
              {!collapsed && <span className="sb-nav__label">Help & Support</span>}
            </button>
          </Tooltip>

          <Tooltip title={collapsed ? 'Alex Morgan — Admin' : ''} placement="right" arrow={false} overlayInnerStyle={{ borderRadius: 6, fontSize: 12 }}>
            <button className="sb-footer__user" onClick={() => handleNav('/users/profile')}>
              <Avatar size={30} className="sb-user__avatar">AM</Avatar>
              {!collapsed && (
                <div className="sb-user__info">
                  <span className="sb-user__name">Alex Morgan</span>
                  <span className="sb-user__role">Admin</span>
                </div>
              )}
            </button>
          </Tooltip>

          {/* Collapse toggle */}
          <button
            className="sb-collapse"
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </button>
        </div>
      </aside>
    </>
  )
}

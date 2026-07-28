import { BellOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Input } from 'antd'
import { ProfileDropdown } from '../../features/profile-menu'
import { useSidebar } from './SidebarContext'

export function AppHeader() {
  const { openMobile } = useSidebar()

  return (
    <header className="app-header">
      <button className="sb-mobile-hamburger" onClick={openMobile} aria-label="Open menu">
        <MenuOutlined />
      </button>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search documents, conversations, or anything..."
        className="global-search"
      />
      <div className="header-actions">
        <Badge dot>
          <button className="icon-button" aria-label="Notifications">
            <BellOutlined />
          </button>
        </Badge>
        <span className="header-divider" />
        <ProfileDropdown />
      </div>
    </header>
  )
}

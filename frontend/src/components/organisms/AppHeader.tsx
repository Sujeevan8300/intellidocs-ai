import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Input } from 'antd'
import { ProfileDropdown } from '../../features/profile-menu'

export function AppHeader() {
  return (
    <header className="app-header">
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

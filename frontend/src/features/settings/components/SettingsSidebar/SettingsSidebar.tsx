import {
  SettingOutlined, RobotOutlined, FileTextOutlined, SearchOutlined,
  CloudOutlined, SafetyOutlined, LockOutlined, BellOutlined,
  BgColorsOutlined, PictureOutlined, MailOutlined, AuditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { SIDEBAR_ITEMS } from '../../constants/settings.constants'
import styles from '../../styles/settings.module.css'

const ICON_MAP: Record<string, React.ReactNode> = {
  SettingOutlined: <SettingOutlined />,
  RobotOutlined: <RobotOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  SearchOutlined: <SearchOutlined />,
  CloudOutlined: <CloudOutlined />,
  SafetyOutlined: <SafetyOutlined />,
  LockOutlined: <LockOutlined />,
  BellOutlined: <BellOutlined />,
  BgColorsOutlined: <BgColorsOutlined />,
  PictureOutlined: <PictureOutlined />,
  MailOutlined: <MailOutlined />,
  AuditOutlined: <AuditOutlined />,
  InfoCircleOutlined: <InfoCircleOutlined />,
}

interface SettingsSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  dirtySections: Set<string>
}

export function SettingsSidebar({ activeSection, onSectionChange, dirtySections }: SettingsSidebarProps) {
  return (
    <nav className={styles.settingsSidebar} aria-label="Settings navigation">
      <div className={styles.sidebarNav} role="tablist" aria-label="Settings sections">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.key}
            role="tab"
            aria-selected={activeSection === item.key}
            aria-controls={`settings-panel-${item.key}`}
            className={`${styles.sidebarItem} ${activeSection === item.key ? styles.sidebarItemActive : ''}`}
            onClick={() => onSectionChange(item.key)}
            tabIndex={0}
          >
            <span className={styles.sidebarItemIcon}>{ICON_MAP[item.icon]}</span>
            {item.label}
            {dirtySections.has(item.key) && <span className={styles.sidebarDirtyDot} aria-label="Unsaved changes" />}
          </button>
        ))}
      </div>
    </nav>
  )
}

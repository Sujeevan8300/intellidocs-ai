import { BellOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Badge, Input } from 'antd'
import { useAppSelector } from '../../hooks/store'
export function AppHeader() { const user = useAppSelector((state) => state.auth.user); return <header className="app-header"><Input prefix={<SearchOutlined />} placeholder="Search documents, conversations, or anything..." className="global-search" /><div className="header-actions"><Badge dot><button className="icon-button" aria-label="Notifications"><BellOutlined /></button></Badge><span className="header-divider" /><Avatar className="user-avatar">{user?.initials}</Avatar><div className="user-meta"><strong>{user?.name}</strong><span>Knowledge Manager</span></div><DownOutlined className="chevron" /></div></header> }

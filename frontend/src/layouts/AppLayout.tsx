import type { PropsWithChildren } from 'react'
import { AppHeader } from '../components/organisms/AppHeader'
import { AppSidebar } from '../components/organisms/AppSidebar'
export function AppLayout({ children }: PropsWithChildren) { return <div className="application-shell"><AppSidebar /><div className="main-shell"><AppHeader /><main className="page-content">{children}</main></div></div> }

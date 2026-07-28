import type { PropsWithChildren } from 'react'
import { AppHeader } from '../components/organisms/AppHeader'
import { AppSidebar } from '../components/organisms/AppSidebar'
import { SidebarProvider } from '../components/organisms/SidebarContext'
export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="application-shell">
        <AppSidebar />
        <div className="main-shell">
          <AppHeader />
          <main className="page-content">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

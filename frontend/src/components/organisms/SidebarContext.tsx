import { createContext, useContext, useState, useCallback, type PropsWithChildren } from 'react'

interface SidebarCtx {
  mobileOpen: boolean
  openMobile: () => void
  closeMobile: () => void
}

const Ctx = createContext<SidebarCtx>({ mobileOpen: false, openMobile() {}, closeMobile() {} })

export function SidebarProvider({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  return <Ctx.Provider value={{ mobileOpen, openMobile, closeMobile }}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar(): SidebarCtx { return useContext(Ctx) }

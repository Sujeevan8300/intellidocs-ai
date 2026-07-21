import { ConfigProvider, App as AntApp } from 'antd'
import { Provider } from 'react-redux'
import type { PropsWithChildren } from 'react'
import { store } from '../store'

export function AppProviders({ children }: PropsWithChildren) {
  return <Provider store={store}><ConfigProvider theme={{ token: { colorPrimary: '#6558e8', borderRadius: 10, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' } }}><AntApp>{children}</AntApp></ConfigProvider></Provider>
}

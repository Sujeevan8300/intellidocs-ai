import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { ChatPage } from '../features/ai-chat'
import { SemanticSearchPage } from '../features/semantic-search'
import { CategoryListPage, CategoryDetailsPage } from '../features/categories'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/assistant" element={<ChatPage />} />
          <Route path="/search" element={<SemanticSearchPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/:id" element={<CategoryDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import { AuthLayout, LoginPage, RegisterPage } from '../features/auth'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { ChatPage } from '../features/ai-chat'
import { SemanticSearchPage } from '../features/semantic-search'
import { CategoryListPage, CategoryDetailsPage } from '../features/categories'
import { DocumentsPage, DocumentDetailsPage, UploadPage } from '../features/documents'
import { UsersPage, UserDetailsPage, UserProfilePage } from '../features/users'
import { AnalyticsDashboardPage } from '../features/analytics'
import { SettingsPage, HelpPage } from '../features/settings'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

        {/* Protected app routes */}
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsDashboardPage />} />
                <Route path="/assistant" element={<ChatPage />} />
                <Route path="/search" element={<SemanticSearchPage />} />
                <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/:id" element={<CategoryDetailsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/documents/upload" element={<UploadPage />} />
                <Route path="/documents/:id" element={<DocumentDetailsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/profile" element={<UserProfilePage />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

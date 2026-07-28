import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from '../features/ai-chat/slices/chatSlice'
import semanticSearchReducer from '../features/semantic-search/slices/searchSlice'
import categoryReducer from '../features/categories/slices/categorySlice'
import documentReducer from '../features/documents/slices/documentSlice'
import userReducer from '../features/users/slices/userSlice'
import analyticsReducer from '../features/analytics/slices/analyticsSlice'
import dashboardReducer from '../features/dashboard/slices/dashboardSlice'
import profileReducer from '../features/profile-menu/slices/profileSlice'
import settingsReducer from '../features/settings/slices/settingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    semanticSearch: semanticSearchReducer,
    categories: categoryReducer,
    documents: documentReducer,
    users: userReducer,
    analytics: analyticsReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    settings: settingsReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

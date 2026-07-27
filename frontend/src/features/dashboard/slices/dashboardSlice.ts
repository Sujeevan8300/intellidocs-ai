import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DashboardState, DashboardMetrics, DocumentRow, Activity, UsageMetric, HealthService } from '../types'
import { metricsData, recentDocuments, recentActivities, usageData, healthServices } from '../mocks/dashboardData'

const initialState: DashboardState = {
  metrics: metricsData,
  recentDocuments,
  activities: recentActivities,
  usage: usageData,
  healthServices,
  loading: false,
  error: undefined,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<DashboardMetrics[]>) => {
      state.metrics = action.payload
    },
    setRecentDocuments: (state, action: PayloadAction<DocumentRow[]>) => {
      state.recentDocuments = action.payload
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload
    },
    setUsage: (state, action: PayloadAction<UsageMetric>) => {
      state.usage = action.payload
    },
    setHealthServices: (state, action: PayloadAction<HealthService[]>) => {
      state.healthServices = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload
    },
  },
})

export const {
  setMetrics,
  setRecentDocuments,
  setActivities,
  setUsage,
  setHealthServices,
  setLoading,
  setError,
} = dashboardSlice.actions

export default dashboardSlice.reducer

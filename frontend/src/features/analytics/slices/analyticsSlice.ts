import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardData, AnalyticsFilters } from '../types/analytics.types';
import { analyticsService } from '../api';

export interface AnalyticsState {
  data: DashboardData | null;
  filters: AnalyticsFilters;
  loading: boolean;
  refreshing: boolean;
  exporting: boolean;
  error: string | null;
  expandedChartId: string | null;
  lastRefreshedAt: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  filters: {
    dateRange: '30d',
  },
  loading: false,
  refreshing: false,
  exporting: false,
  error: null,
  expandedChartId: null,
  lastRefreshedAt: null,
};

export const fetchAnalyticsDashboard = createAsyncThunk(
  'analytics/fetchDashboard',
  async (filters: AnalyticsFilters | undefined, { rejectWithValue }) => {
    try {
      const data = await analyticsService.getDashboard(filters);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch analytics dashboard';
      return rejectWithValue(message);
    }
  }
);

export const refreshAnalyticsDashboard = createAsyncThunk(
  'analytics/refreshDashboard',
  async (filters: AnalyticsFilters | undefined, { rejectWithValue }) => {
    try {
      const data = await analyticsService.getDashboard(filters);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to refresh analytics dashboard';
      return rejectWithValue(message);
    }
  }
);

export const exportAnalyticsReport = createAsyncThunk(
  'analytics/exportReport',
  async (
    { format, filters }: { format: 'pdf' | 'excel' | 'csv'; filters?: AnalyticsFilters },
    { rejectWithValue }
  ) => {
    try {
      const result = await analyticsService.exportReport(format, filters);
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Export failed';
      return rejectWithValue(message);
    }
  }
);

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<AnalyticsFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { dateRange: '30d' };
    },
    setExpandedChartId: (state, action: PayloadAction<string | null>) => {
      state.expandedChartId = action.payload;
    },
    clearAnalyticsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard
      .addCase(fetchAnalyticsDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsDashboard.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.loading = false;
        state.data = action.payload;
        state.lastRefreshedAt = new Date().toISOString();
      })
      .addCase(fetchAnalyticsDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load analytics';
      })

      // Refresh Dashboard
      .addCase(refreshAnalyticsDashboard.pending, (state) => {
        state.refreshing = true;
        state.error = null;
      })
      .addCase(refreshAnalyticsDashboard.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.refreshing = false;
        state.data = action.payload;
        state.lastRefreshedAt = new Date().toISOString();
      })
      .addCase(refreshAnalyticsDashboard.rejected, (state, action) => {
        state.refreshing = false;
        state.error = (action.payload as string) || 'Refresh failed';
      })

      // Export
      .addCase(exportAnalyticsReport.pending, (state) => {
        state.exporting = true;
      })
      .addCase(exportAnalyticsReport.fulfilled, (state) => {
        state.exporting = false;
      })
      .addCase(exportAnalyticsReport.rejected, (state, action) => {
        state.exporting = false;
        state.error = (action.payload as string) || 'Export failed';
      });
  },
});

export const { setFilters, resetFilters, setExpandedChartId, clearAnalyticsError } =
  analyticsSlice.actions;

export default analyticsSlice.reducer;

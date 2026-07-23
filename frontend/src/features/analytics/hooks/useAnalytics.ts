import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchAnalyticsDashboard,
  refreshAnalyticsDashboard,
  exportAnalyticsReport,
  setFilters,
  resetFilters,
  setExpandedChartId,
} from '../slices/analyticsSlice';
import { AnalyticsFilters } from '../types/analytics.types';

export function useAnalytics() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data,
    filters,
    loading,
    refreshing,
    exporting,
    error,
    expandedChartId,
    lastRefreshedAt,
  } = useSelector((state: RootState) => state.analytics);

  const loadDashboard = useCallback(
    (currentFilters?: AnalyticsFilters) => {
      dispatch(fetchAnalyticsDashboard(currentFilters || filters));
    },
    [dispatch, filters]
  );

  const refreshDashboard = useCallback(() => {
    dispatch(refreshAnalyticsDashboard(filters));
  }, [dispatch, filters]);

  const updateFilters = useCallback(
    (newFilters: Partial<AnalyticsFilters>) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const exportData = useCallback(
    async (format: 'pdf' | 'excel' | 'csv') => {
      return dispatch(exportAnalyticsReport({ format, filters })).unwrap();
    },
    [dispatch, filters]
  );

  const toggleExpandChart = useCallback(
    (chartId: string | null) => {
      dispatch(setExpandedChartId(chartId));
    },
    [dispatch]
  );

  // Auto-fetch when filters change
  useEffect(() => {
    loadDashboard(filters);
  }, [filters, loadDashboard]);

  return {
    dashboard: data,
    kpis: data?.kpis || [],
    charts: data?.charts || null,
    timeline: data?.timeline || [],
    filters,
    loading,
    refreshing,
    exporting,
    error,
    expandedChartId,
    lastRefreshedAt,
    refreshDashboard,
    updateFilters,
    clearFilters,
    exportData,
    toggleExpandChart,
  };
}

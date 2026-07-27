import type { DashboardData, AnalyticsFilters, KPIItem } from '../types/analytics.types';

export interface IAnalyticsService {
  getDashboard(filters?: AnalyticsFilters): Promise<DashboardData>;
  getKPIs(filters?: AnalyticsFilters): Promise<KPIItem[]>;
  exportReport(format: 'pdf' | 'excel' | 'csv', filters?: AnalyticsFilters): Promise<{ downloadUrl: string; filename: string }>;
}

import { IAnalyticsService } from './analytics.service.interface';
import { DashboardData, AnalyticsFilters, KPIItem } from '../types/analytics.types';
import { generateMockDashboardData } from '../mocks/mockAnalyticsData';

export class MockAnalyticsService implements IAnalyticsService {
  private delayMs: number;

  constructor(delayMs: number = 400) {
    this.delayMs = delayMs;
  }

  private async simulateDelay(): Promise<void> {
    if (this.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }
  }

  async getDashboard(filters?: AnalyticsFilters): Promise<DashboardData> {
    await this.simulateDelay();
    return generateMockDashboardData(filters);
  }

  async getKPIs(filters?: AnalyticsFilters): Promise<KPIItem[]> {
    await this.simulateDelay();
    const dashboard = generateMockDashboardData(filters);
    return dashboard.kpis;
  }

  async exportReport(
    format: 'pdf' | 'excel' | 'csv',
    filters?: AnalyticsFilters
  ): Promise<{ downloadUrl: string; filename: string }> {
    await this.simulateDelay();
    const range = filters?.dateRange || '30d';
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `intellidocs-analytics-${range}-${timestamp}.${format === 'excel' ? 'xlsx' : format}`;
    return {
      downloadUrl: `blob:mock-export-url-${format}`,
      filename,
    };
  }
}

export const mockAnalyticsService = new MockAnalyticsService();

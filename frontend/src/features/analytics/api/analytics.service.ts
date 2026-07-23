import axios from 'axios';
import { IAnalyticsService } from './analytics.service.interface';
import { DashboardData, AnalyticsFilters, KPIItem } from '../types/analytics.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class AnalyticsApiService implements IAnalyticsService {
  private client = axios.create({
    baseURL: `${API_BASE_URL}/analytics`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getDashboard(filters?: AnalyticsFilters): Promise<DashboardData> {
    const response = await this.client.get<DashboardData>('/dashboard', { params: filters });
    return response.data;
  }

  async getKPIs(filters?: AnalyticsFilters): Promise<KPIItem[]> {
    const response = await this.client.get<KPIItem[]>('/kpis', { params: filters });
    return response.data;
  }

  async exportReport(
    format: 'pdf' | 'excel' | 'csv',
    filters?: AnalyticsFilters
  ): Promise<{ downloadUrl: string; filename: string }> {
    const response = await this.client.post<{ downloadUrl: string; filename: string }>(
      '/export',
      { format, filters },
      { responseType: 'json' }
    );
    return response.data;
  }
}

export const analyticsApiService = new AnalyticsApiService();

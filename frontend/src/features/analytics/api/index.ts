import { mockAnalyticsService } from './mockAnalytics.service';
import { analyticsApiService } from './analytics.service';
import { IAnalyticsService } from './analytics.service.interface';

// Set to true to use real backend API endpoints when backend is available
const USE_REAL_BACKEND = false;

export const analyticsService: IAnalyticsService = USE_REAL_BACKEND
  ? analyticsApiService
  : mockAnalyticsService;

export * from './analytics.service.interface';
export * from './mockAnalytics.service';
export * from './analytics.service';

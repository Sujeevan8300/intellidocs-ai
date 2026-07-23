export type TrendDirection = 'UP' | 'DOWN' | 'NEUTRAL';

export interface KPIItem {
  id: string;
  title: string;
  value: number | string;
  change: number; // e.g. +12.5 or -3.2
  trend: TrendDirection;
  icon: string; // key for Antd icon lookup
  tooltip: string;
  unit?: string;
  format?: 'number' | 'currency' | 'bytes' | 'percentage' | 'time';
}

export interface TimeSeriesPoint {
  date: string;
  label?: string;
  [key: string]: string | number | undefined;
}

export interface DistributionPoint {
  name: string;
  value: number;
  color?: string;
  percentage?: number;
}

export interface HorizontalBarPoint {
  query: string;
  count: number;
  avgLatencyMs: number;
}

export interface QueueProcessingPoint {
  stage: string;
  count: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

export interface StorageBreakdown {
  totalBytes: number;
  usedBytes: number;
  remainingBytes: number;
  byFileType: DistributionPoint[];
}

export interface ChartDataSets {
  aiUsageTrend: TimeSeriesPoint[]; // Conversations, Prompt Length, Response Time
  userActivityTrend: TimeSeriesPoint[]; // Daily Logins, Active Users, New Users
  documentUploadTrend: TimeSeriesPoint[]; // Uploaded, Processed, Failed
  documentTypes: DistributionPoint[]; // PDF, DOCX, TXT, etc.
  categoryDistribution: DistributionPoint[]; // HR, Legal, Tech, Finance, etc.
  semanticSearchTrend: TimeSeriesPoint[]; // Total searches, avg latency
  topSearchQueries: HorizontalBarPoint[];
  aiAssistantMetrics: TimeSeriesPoint[]; // Conversations, messages, satisfaction %
  topPrompts: { prompt: string; count: number; avgRating: number }[];
  processingPipeline: QueueProcessingPoint[];
  storage: StorageBreakdown;
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // ISO or formatted HH:mm
  title: string;
  description: string;
  category: 'DOCUMENT' | 'AI' | 'USER' | 'SEARCH' | 'SYSTEM';
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  user?: string;
}

export interface DateRangePreset {
  label: string;
  value: 'today' | '7d' | '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
}

export interface AnalyticsFilters {
  dateRange: 'today' | '7d' | '30d' | '90d' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  department?: string;
  category?: string;
  userRole?: string;
  documentType?: string;
}

export interface DashboardData {
  kpis: KPIItem[];
  charts: ChartDataSets;
  timeline: TimelineEvent[];
  lastUpdated: string;
}

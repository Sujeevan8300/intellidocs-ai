import dayjs from 'dayjs';
import type { DashboardData, AnalyticsFilters, KPIItem } from '../types/analytics.types';

/**
 * Generates realistic enterprise analytics datasets for IntelliDocs AI.
 * Simulates:
 * - 500 Total Users (340 Active)
 * - 2,500 Total Documents (2,380 AI Ready)
 * - 15,420 AI Conversations
 * - 35,890 Semantic Searches
 * - 1.25s Avg Response Time
 * - 412.8 GB Storage Used
 */
export const generateMockDashboardData = (filters?: AnalyticsFilters): DashboardData => {
  const isCustomOrShort = filters?.dateRange === 'today' || filters?.dateRange === '7d';
  const multiplier = filters?.dateRange === 'today' ? 0.2 : filters?.dateRange === '7d' ? 0.7 : 1.0;

  const kpis: KPIItem[] = [
    {
      id: 'kpi-users',
      title: 'Total Users',
      value: Math.round(500 * (0.9 + Math.random() * 0.1)),
      change: 14.2,
      trend: 'UP',
      icon: 'UserOutlined',
      tooltip: 'Registered system users across all roles and departments',
      format: 'number',
    },
    {
      id: 'kpi-active-users',
      title: 'Active Users',
      value: Math.round(340 * multiplier),
      change: 8.5,
      trend: 'UP',
      icon: 'TeamOutlined',
      tooltip: 'Users actively engaging with document search or AI chat in selected period',
      format: 'number',
    },
    {
      id: 'kpi-total-docs',
      title: 'Total Documents',
      value: 2500,
      change: 18.7,
      trend: 'UP',
      icon: 'FileTextOutlined',
      tooltip: 'Total files uploaded into the knowledge base repository',
      format: 'number',
    },
    {
      id: 'kpi-ai-ready-docs',
      title: 'AI Ready Documents',
      value: 2380,
      change: 95.2,
      trend: 'UP',
      icon: 'CheckCircleOutlined',
      tooltip: 'Documents fully parsed, chunked, and vector-embedded for RAG Q&A',
      unit: '%',
      format: 'percentage',
    },
    {
      id: 'kpi-ai-conversations',
      title: 'AI Conversations',
      value: Math.round(15420 * multiplier),
      change: 23.4,
      trend: 'UP',
      icon: 'MessageOutlined',
      tooltip: 'Total multi-turn AI assistant conversations initiated',
      format: 'number',
    },
    {
      id: 'kpi-semantic-searches',
      title: 'Semantic Searches',
      value: Math.round(35890 * multiplier),
      change: 31.8,
      trend: 'UP',
      icon: 'SearchOutlined',
      tooltip: 'Vector search queries executed across indexed documents',
      format: 'number',
    },
    {
      id: 'kpi-avg-response-time',
      title: 'Avg Response Time',
      value: '1.24s',
      change: -12.4, // Improvement
      trend: 'DOWN',
      icon: 'ThunderboltOutlined',
      tooltip: 'Average end-to-end latency for AI response generation',
      format: 'time',
    },
    {
      id: 'kpi-storage-used',
      title: 'Storage Used',
      value: '412.8 GB',
      change: 6.3,
      trend: 'UP',
      icon: 'CloudServerOutlined',
      tooltip: 'Total binary storage occupied by original files & vector indices (Out of 1 TB)',
      format: 'bytes',
    },
  ];

  // Generate daily time series for 14 intervals
  const days = isCustomOrShort ? 7 : 14;
  const aiUsageTrend = Array.from({ length: days }).map((_, i) => {
    const d = dayjs().subtract(days - 1 - i, 'day').format('MMM DD');
    return {
      date: d,
      conversations: Math.floor(800 + Math.random() * 400),
      avgPromptLength: Math.floor(45 + Math.random() * 25),
      avgResponseTimeMs: Math.floor(1100 + Math.random() * 300),
    };
  });

  const userActivityTrend = Array.from({ length: days }).map((_, i) => {
    const d = dayjs().subtract(days - 1 - i, 'day').format('MMM DD');
    return {
      date: d,
      dailyLogins: Math.floor(320 + Math.random() * 150),
      activeUsers: Math.floor(210 + Math.random() * 90),
      newUsers: Math.floor(5 + Math.random() * 12),
    };
  });

  const documentUploadTrend = Array.from({ length: days }).map((_, i) => {
    const d = dayjs().subtract(days - 1 - i, 'day').format('MMM DD');
    return {
      date: d,
      uploaded: Math.floor(40 + Math.random() * 35),
      processed: Math.floor(38 + Math.random() * 30),
      failed: Math.floor(Math.random() * 3),
    };
  });

  const semanticSearchTrend = Array.from({ length: days }).map((_, i) => {
    const d = dayjs().subtract(days - 1 - i, 'day').format('MMM DD');
    return {
      date: d,
      totalSearches: Math.floor(2200 + Math.random() * 800),
      avgLatencyMs: Math.floor(180 + Math.random() * 80),
      zeroResults: Math.floor(12 + Math.random() * 20),
    };
  });

  const aiAssistantMetrics = Array.from({ length: days }).map((_, i) => {
    const d = dayjs().subtract(days - 1 - i, 'day').format('MMM DD');
    return {
      date: d,
      conversations: Math.floor(600 + Math.random() * 300),
      messagesSent: Math.floor(2400 + Math.random() * 900),
      satisfactionRate: Math.floor(92 + Math.random() * 7),
    };
  });

  return {
    kpis,
    charts: {
      aiUsageTrend,
      userActivityTrend,
      documentUploadTrend,
      documentTypes: [
        { name: 'PDF Documents', value: 1450, color: '#1677ff', percentage: 58 },
        { name: 'DOCX / Word', value: 520, color: '#52c41a', percentage: 20.8 },
        { name: 'Plain Text / MD', value: 310, color: '#faad14', percentage: 12.4 },
        { name: 'Spreadsheets (XLSX)', value: 140, color: '#13c2c2', percentage: 5.6 },
        { name: 'Presentations (PPTX)', value: 80, color: '#722ed1', percentage: 3.2 },
      ],
      categoryDistribution: [
        { name: 'HR & Policies', value: 620, color: '#1677ff', percentage: 24.8 },
        { name: 'Technical & Engineering', value: 840, color: '#722ed1', percentage: 33.6 },
        { name: 'Legal & Compliance', value: 410, color: '#fa541c', percentage: 16.4 },
        { name: 'Finance & Accounting', value: 380, color: '#52c41a', percentage: 15.2 },
        { name: 'Security & Operations', value: 250, color: '#faad14', percentage: 10.0 },
      ],
      semanticSearchTrend,
      topSearchQueries: [
        { query: 'Remote work policy & expense reimbursement', count: 1420, avgLatencyMs: 210 },
        { query: 'API authentication JWT refresh tokens', count: 1180, avgLatencyMs: 165 },
        { query: 'Q3 Financial forecast revenue breakdown', count: 940, avgLatencyMs: 195 },
        { query: 'SOC2 Type II compliance audit checklist', count: 820, avgLatencyMs: 240 },
        { query: 'Employee benefits health insurance claim', count: 760, avgLatencyMs: 150 },
        { query: 'Kubernetes cluster deployment guidelines', count: 690, avgLatencyMs: 185 },
      ],
      aiAssistantMetrics,
      topPrompts: [
        { prompt: 'Summarize key clauses in vendor NDA contracts', count: 3200, avgRating: 4.8 },
        { prompt: 'Compare Q2 vs Q3 revenue projections', count: 2450, avgRating: 4.7 },
        { prompt: 'Extract technical requirements for SSO integration', count: 1980, avgRating: 4.9 },
        { prompt: 'Draft email response regarding leave policy', count: 1620, avgRating: 4.6 },
      ],
      processingPipeline: [
        { stage: 'Upload Queue', count: 12, status: 'PENDING' },
        { stage: 'OCR & Text Extraction', count: 8, status: 'PROCESSING' },
        { stage: 'Chunking & Tokenization', count: 15, status: 'PROCESSING' },
        { stage: 'Vector Embedding Generation', count: 24, status: 'PROCESSING' },
        { stage: 'Successfully Indexed', count: 2380, status: 'COMPLETED' },
        { stage: 'Processing Errors', count: 61, status: 'FAILED' },
      ],
      storage: {
        totalBytes: 1073741824000, // 1 TB
        usedBytes: 443249033216, // ~412.8 GB
        remainingBytes: 630492790784,
        byFileType: [
          { name: 'PDF Files', value: 245, color: '#1677ff' },
          { name: 'Vector Database Index', value: 98, color: '#722ed1' },
          { name: 'DOCX / Office Docs', value: 48, color: '#52c41a' },
          { name: 'Text & Markdown', value: 21.8, color: '#faad14' },
        ],
      },
    },
    timeline: [
      {
        id: 'evt-1',
        timestamp: '10:55 AM',
        title: 'Semantic Search Executed',
        description: 'User sarah.dev executed query: "Kubernetes ingress routing rules"',
        category: 'SEARCH',
        status: 'SUCCESS',
        user: 'Sarah Jenkins',
      },
      {
        id: 'evt-2',
        timestamp: '10:42 AM',
        title: 'AI Batch Processing Completed',
        description: 'Processed 45 technical documentation PDFs into vector index',
        category: 'AI',
        status: 'SUCCESS',
      },
      {
        id: 'evt-3',
        timestamp: '09:45 AM',
        title: 'New User Registered',
        description: 'Account created for alex.m@enterprise.com with Role: Knowledge Manager',
        category: 'USER',
        status: 'INFO',
        user: 'Alex Mercer',
      },
      {
        id: 'evt-4',
        timestamp: '09:15 AM',
        title: 'File Upload Completed',
        description: 'Employee_Handbook_2026_V4.pdf uploaded into HR Category',
        category: 'DOCUMENT',
        status: 'SUCCESS',
        user: 'Emma Watson',
      },
      {
        id: 'evt-5',
        timestamp: '08:30 AM',
        title: 'Document Parse Warning',
        description: 'Large file scanned_contract_sc99.pdf required OCR fallback',
        category: 'DOCUMENT',
        status: 'WARNING',
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
};

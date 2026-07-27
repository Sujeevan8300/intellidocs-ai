import React from 'react';
import { Button, notification } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAnalytics } from '../hooks/useAnalytics';
import { KPISection } from '../components/KPISection/KPISection';
import { AIUsageChart } from '../components/AIUsageChart/AIUsageChart';
import { UserActivityChart } from '../components/UserActivityChart/UserActivityChart';
import { DocumentAnalyticsChart } from '../components/DocumentAnalyticsChart/DocumentAnalyticsChart';
import { SearchAnalyticsChart } from '../components/SearchAnalyticsChart/SearchAnalyticsChart';
import { CategoryAnalyticsChart } from '../components/CategoryAnalyticsChart/CategoryAnalyticsChart';
import { ProcessingStatusChart } from '../components/ProcessingStatusChart/ProcessingStatusChart';
import { StorageChart } from '../components/StorageChart/StorageChart';
import { TimelineCard } from '../components/TimelineCard/TimelineCard';
import { AnalyticsFiltersBar } from '../components/AnalyticsFilters/AnalyticsFiltersBar';
import { ExportButton } from '../components/ExportButton/ExportButton';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { ChartModal } from '../components/ChartModal';
import styles from '../styles/analytics.module.css';

export const AnalyticsDashboardPage: React.FC = () => {
  const {
    kpis,
    charts,
    timeline,
    filters,
    loading,
    refreshing,
    exporting,
    expandedChartId,
    lastRefreshedAt,
    refreshDashboard,
    updateFilters,
    clearFilters,
    exportData,
    toggleExpandChart,
  } = useAnalytics();

  const handleRefresh = () => {
    refreshDashboard();
    notification.success({
      message: 'Dashboard Refreshed',
      description: 'Analytics metrics updated with latest data.',
      duration: 2,
    });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>Analytics Dashboard</h1>
          <span className={styles.headerSubtitle}>
            Real-time RAG platform insights, user search activity & AI processing metrics
            {lastRefreshedAt && <> · Updated {dayjs(lastRefreshedAt).format('HH:mm:ss')}</>}
          </span>
        </div>
        <div className={styles.headerActions}>
          <Button
            className={styles.refreshBtn}
            icon={<ReloadOutlined spin={refreshing} />}
            onClick={handleRefresh}
            loading={refreshing}
          >
            Refresh
          </Button>
          <ExportButton onExport={exportData} exporting={exporting} />
        </div>
      </div>

      {/* Filters */}
      <AnalyticsFiltersBar
        filters={filters}
        onChange={updateFilters}
        onReset={clearFilters}
        loading={loading || refreshing}
      />

      {/* Empty State */}
      {!loading && !charts && <EmptyState onRefresh={handleRefresh} />}

      {/* Dashboard Content */}
      {charts && (
        <>
          {/* KPIs */}
          <div className={styles.section}>
            <KPISection kpis={kpis} loading={loading} />
          </div>

          {/* AI Usage & User Activity */}
          <div className={styles.chartGrid + ' ' + styles.section}>
            <AIUsageChart
              data={charts.aiUsageTrend}
              onExpand={toggleExpandChart}
              loading={loading}
            />
            <UserActivityChart
              data={charts.userActivityTrend}
              onExpand={toggleExpandChart}
              loading={loading}
            />
          </div>

          {/* Document Analytics & Semantic Search */}
          <div className={styles.chartGrid + ' ' + styles.section}>
            <DocumentAnalyticsChart
              uploadTrend={charts.documentUploadTrend}
              documentTypes={charts.documentTypes}
              onExpand={toggleExpandChart}
              loading={loading}
            />
            <SearchAnalyticsChart
              topQueries={charts.topSearchQueries}
              onExpand={toggleExpandChart}
              loading={loading}
            />
          </div>

          {/* Category Distribution & Processing Pipeline */}
          <div className={styles.chartGrid + ' ' + styles.section}>
            <CategoryAnalyticsChart
              categories={charts.categoryDistribution}
              onExpand={toggleExpandChart}
              loading={loading}
            />
            <ProcessingStatusChart
              pipeline={charts.processingPipeline}
              onExpand={toggleExpandChart}
              loading={loading}
            />
          </div>

          {/* Storage & Timeline */}
          <div className={styles.chartGrid + ' ' + styles.sectionLast}>
            <StorageChart storage={charts.storage} onExpand={toggleExpandChart} loading={loading} />
            <TimelineCard events={timeline} loading={loading} />
          </div>
        </>
      )}

      {/* Full-screen modal */}
      <ChartModal
        expandedChartId={expandedChartId}
        charts={charts}
        onClose={() => toggleExpandChart(null)}
      />
    </div>
  );
};

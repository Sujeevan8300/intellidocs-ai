import React from 'react';
import { Row, Col, Typography, Space, Button, notification, Card } from 'antd';
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

const { Title, Text } = Typography;

export const AnalyticsDashboardPage: React.FC = () => {
  const {
    kpis,
    charts,
    timeline,
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
    <div style={{ padding: '24px 32px', background: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#141414' }}>
            Analytics Dashboard
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Real-time RAG platform insights, user search activity & AI processing metrics
            {lastRefreshedAt && ` • Updated ${dayjs(lastRefreshedAt).format('HH:mm:ss')}`}
          </Text>
        </div>

        <Space size="middle" style={{ marginTop: 8 }}>
          <Button
            icon={<ReloadOutlined spin={refreshing} />}
            onClick={handleRefresh}
            loading={refreshing}
          >
            Refresh
          </Button>
          <ExportButton onExport={exportData} exporting={exporting} />
        </Space>
      </div>

      {/* Filter Options Bar */}
      <AnalyticsFiltersBar
        filters={filters}
        onChange={updateFilters}
        onReset={clearFilters}
        loading={loading || refreshing}
      />

      {/* Empty State */}
      {!loading && !charts && <EmptyState onRefresh={handleRefresh} />}

      {/* Main Grid Content */}
      {charts && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* KPI Row */}
          <KPISection kpis={kpis} loading={loading} />

          {/* AI Usage & User Activity */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <AIUsageChart
                data={charts.aiUsageTrend}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
            <Col xs={24} lg={12}>
              <UserActivityChart
                data={charts.userActivityTrend}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
          </Row>

          {/* Document Analytics & Semantic Search */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <DocumentAnalyticsChart
                uploadTrend={charts.documentUploadTrend}
                documentTypes={charts.documentTypes}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
            <Col xs={24} lg={12}>
              <SearchAnalyticsChart
                topQueries={charts.topSearchQueries}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
          </Row>

          {/* Category Distribution & Processing Pipeline */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <CategoryAnalyticsChart
                categories={charts.categoryDistribution}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
            <Col xs={24} lg={12}>
              <ProcessingStatusChart
                pipeline={charts.processingPipeline}
                onExpand={toggleExpandChart}
                loading={loading}
              />
            </Col>
          </Row>

          {/* Storage Breakdown & System Timeline */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <StorageChart storage={charts.storage} onExpand={toggleExpandChart} loading={loading} />
            </Col>
            <Col xs={24} lg={12}>
              <TimelineCard events={timeline} loading={loading} />
            </Col>
          </Row>
        </Space>
      )}

      {/* Full screen modal for chart expansion */}
      <ChartModal
        expandedChartId={expandedChartId}
        charts={charts}
        onClose={() => toggleExpandChart(null)}
      />
    </div>
  );
};

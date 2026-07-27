import React from 'react';
import { Modal } from 'antd';
import { AIUsageChart } from './AIUsageChart/AIUsageChart';
import { UserActivityChart } from './UserActivityChart/UserActivityChart';
import { DocumentAnalyticsChart } from './DocumentAnalyticsChart/DocumentAnalyticsChart';
import { SearchAnalyticsChart } from './SearchAnalyticsChart/SearchAnalyticsChart';
import { CategoryAnalyticsChart } from './CategoryAnalyticsChart/CategoryAnalyticsChart';
import { ProcessingStatusChart } from './ProcessingStatusChart/ProcessingStatusChart';
import { StorageChart } from './StorageChart/StorageChart';
import type { ChartDataSets } from '../types/analytics.types';
import styles from '../styles/analytics.module.css';

interface ChartModalProps {
  expandedChartId: string | null;
  charts: ChartDataSets | null;
  onClose: () => void;
}

export const ChartModal: React.FC<ChartModalProps> = ({ expandedChartId, charts, onClose }) => {
  if (!expandedChartId || !charts) return null;

  const renderExpandedChart = () => {
    switch (expandedChartId) {
      case 'ai-usage-chart':
        return <AIUsageChart data={charts.aiUsageTrend} />;
      case 'user-activity-chart':
        return <UserActivityChart data={charts.userActivityTrend} />;
      case 'document-analytics-chart':
        return (
          <DocumentAnalyticsChart
            uploadTrend={charts.documentUploadTrend}
            documentTypes={charts.documentTypes}
          />
        );
      case 'search-analytics-chart':
        return <SearchAnalyticsChart topQueries={charts.topSearchQueries} />;
      case 'category-analytics-chart':
        return <CategoryAnalyticsChart categories={charts.categoryDistribution} />;
      case 'processing-status-chart':
        return <ProcessingStatusChart pipeline={charts.processingPipeline} />;
      case 'storage-chart':
        return <StorageChart storage={charts.storage} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={!!expandedChartId}
      onCancel={onClose}
      footer={null}
      width="85vw"
      style={{ top: 40 }}
      styles={{ body: { padding: '16px 24px' } }}
      destroyOnClose
    >
      <div className={styles.modalContent}>{renderExpandedChart()}</div>
    </Modal>
  );
};

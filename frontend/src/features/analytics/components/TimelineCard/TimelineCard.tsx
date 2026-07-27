import React from 'react';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { TimelineEvent } from '../../types/analytics.types';
import styles from '../../styles/analytics.module.css';

interface TimelineCardProps {
  events: TimelineEvent[];
  loading?: boolean;
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  SUCCESS: <CheckCircleOutlined style={{ color: '#22c55e', fontSize: 12 }} />,
  WARNING: <WarningOutlined style={{ color: '#f59e0b', fontSize: 12 }} />,
  ERROR: <CloseCircleOutlined style={{ color: '#ef4444', fontSize: 12 }} />,
  INFO: <InfoCircleOutlined style={{ color: '#6366f1', fontSize: 12 }} />,
};

const CATEGORY_COLOR: Record<string, string> = {
  AI: 'purple',
  DOCUMENT: 'blue',
  USER: 'cyan',
  SEARCH: 'geekblue',
  SYSTEM: 'default',
};

export const TimelineCard: React.FC<TimelineCardProps> = ({ events, loading }) => {
  if (loading) {
    return (
      <div className={styles.chartCard}>
        <div className={styles.chartCardHeader}>
          <div className={styles.chartCardHeaderLeft}>
            <span className={styles.chartCardTitle}>System Activity Timeline</span>
          </div>
        </div>
        <div className={styles.chartCardBody}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartCardHeader}>
        <div className={styles.chartCardHeaderLeft}>
          <span className={styles.chartCardTitle}>System Activity Timeline</span>
          <span className={styles.chartCardSubtitle}>Recent platform events and operations</span>
        </div>
      </div>
      <div className={styles.chartCardBody}>
        <div className={styles.timelineScroll}>
          {events.map((evt) => (
            <div
              key={evt.id}
              style={{
                display: 'flex',
                gap: 12,
                padding: '10px 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div style={{ paddingTop: 2, flexShrink: 0 }}>
                {STATUS_ICON[evt.status] || STATUS_ICON.INFO}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span className={styles.timelineTime}>{evt.timestamp}</span>
                  <Tag
                    color={CATEGORY_COLOR[evt.category] || 'default'}
                    className={styles.timelineTag}
                  >
                    {evt.category}
                  </Tag>
                </div>
                <div className={styles.timelineTitle}>{evt.title}</div>
                <div className={styles.timelineDesc}>{evt.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

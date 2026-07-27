import React from 'react';
import { Empty, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../../styles/analytics.module.css';

interface EmptyStateProps {
  onRefresh?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <div className={styles.emptyState}>
      <Empty
        description={
          <span style={{ color: '#64748b' }}>
            <strong style={{ color: '#1e293b' }}>No analytics available</strong>
            <br />
            Data will appear as users begin using the system.
          </span>
        }
      >
        {onRefresh && (
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRefresh} style={{ borderRadius: 10 }}>
            Refresh Dashboard
          </Button>
        )}
      </Empty>
    </div>
  );
};

import React from 'react';
import { Empty, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface EmptyStateProps {
  onRefresh?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <div
      style={{
        padding: '60px 0',
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: 8,
        margin: '24px 0',
      }}
    >
      <Empty
        description={
          <span>
            <strong>No analytics available</strong>
            <br />
            Data will appear as users begin using the system.
          </span>
        }
      >
        {onRefresh && (
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRefresh}>
            Refresh Dashboard
          </Button>
        )}
      </Empty>
    </div>
  );
};

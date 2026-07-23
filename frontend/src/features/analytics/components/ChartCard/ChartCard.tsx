import React from 'react';
import { Card, Typography, Space, Tooltip, Button } from 'antd';
import { ExpandOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ChartCardProps {
  id: string;
  title: string;
  subtitle?: string;
  tooltip?: string;
  extraActions?: React.ReactNode;
  onExpand?: (id: string) => void;
  children: React.ReactNode;
  loading?: boolean;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  tooltip,
  extraActions,
  onExpand,
  children,
  loading = false,
}) => {
  return (
    <Card
      loading={loading}
      style={{
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        height: '100%',
      }}
      title={
        <Space align="center">
          <Text strong style={{ fontSize: 15 }}>
            {title}
          </Text>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined style={{ fontSize: 13, color: '#bfbfbf' }} />
            </Tooltip>
          )}
        </Space>
      }
      extra={
        <Space size="small">
          {extraActions}
          {onExpand && (
            <Tooltip title="Expand Full Screen">
              <Button
                type="text"
                size="small"
                icon={<ExpandOutlined style={{ color: '#595959' }} />}
                onClick={() => onExpand(id)}
              />
            </Tooltip>
          )}
        </Space>
      }
    >
      {subtitle && (
        <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 12 }}>
          {subtitle}
        </Text>
      )}
      <div style={{ width: '100%', height: 280 }}>{children}</div>
    </Card>
  );
};

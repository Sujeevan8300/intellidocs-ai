import React from 'react';
import { Card, Typography, Tooltip, Space, Badge } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  CloudServerOutlined,
  RiseOutlined,
  FallOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { KPIItem } from '../../types/analytics.types';

const { Text, Title } = Typography;

const ICON_MAP: Record<string, React.ReactNode> = {
  UserOutlined: <UserOutlined style={{ color: '#1677ff', fontSize: 20 }} />,
  TeamOutlined: <TeamOutlined style={{ color: '#52c41a', fontSize: 20 }} />,
  FileTextOutlined: <FileTextOutlined style={{ color: '#faad14', fontSize: 20 }} />,
  CheckCircleOutlined: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />,
  MessageOutlined: <MessageOutlined style={{ color: '#722ed1', fontSize: 20 }} />,
  SearchOutlined: <SearchOutlined style={{ color: '#13c2c2', fontSize: 20 }} />,
  ThunderboltOutlined: <ThunderboltOutlined style={{ color: '#fa541c', fontSize: 20 }} />,
  CloudServerOutlined: <CloudServerOutlined style={{ color: '#eb2f96', fontSize: 20 }} />,
};

interface KPICardProps {
  kpi: KPIItem;
  loading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, loading = false }) => {
  const isUp = kpi.trend === 'UP';
  const isDown = kpi.trend === 'DOWN';
  const isPositive = kpi.change >= 0;

  const formattedValue = typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value;

  return (
    <Card
      loading={loading}
      hoverable
      size="small"
      style={{
        borderRadius: 8,
        height: '100%',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Space align="center">
          <div
            style={{
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {ICON_MAP[kpi.icon] || <FileTextOutlined style={{ fontSize: 20 }} />}
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
              {kpi.title}
            </Text>
            <Tooltip title={kpi.tooltip}>
              <InfoCircleOutlined style={{ marginLeft: 6, fontSize: 12, color: '#bfbfbf' }} />
            </Tooltip>
          </div>
        </Space>
      </div>

      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {formattedValue}
        </Title>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {isUp && <RiseOutlined style={{ color: '#52c41a', fontSize: 14 }} />}
          {isDown && <FallOutlined style={{ color: isPositive ? '#52c41a' : '#ff4d4f', fontSize: 14 }} />}
          <Badge
            count={`${isPositive ? '+' : ''}${kpi.change}%`}
            style={{
              backgroundColor: isPositive ? '#f6ffed' : '#fff2f0',
              color: isPositive ? '#389e0d' : '#cf1322',
              borderColor: isPositive ? '#b7eb8f' : '#ffa39e',
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

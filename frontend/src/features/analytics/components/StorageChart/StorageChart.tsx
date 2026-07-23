import React from 'react';
import { Row, Col, Progress, Typography } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { StorageBreakdown } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';

const { Text } = Typography;

interface StorageChartProps {
  storage: StorageBreakdown;
  onExpand?: (id: string) => void;
  loading?: boolean;
}

export const StorageChart: React.FC<StorageChartProps> = ({ storage, onExpand, loading }) => {
  const percentUsed = Math.round((storage.usedBytes / storage.totalBytes) * 100);

  return (
    <ChartCard
      id="storage-chart"
      title="Storage Analytics"
      subtitle="Capacity usage and storage consumption by file category"
      tooltip="Total storage allocation and vector store index sizes"
      onExpand={onExpand}
      loading={loading}
    >
      <Row height="100%" align="middle">
        <Col span={10} style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={percentUsed}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            width={140}
          />
          <Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }}>
            412.8 GB / 1 TB Used
          </Text>
        </Col>
        <Col span={14}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={storage.byFileType}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {storage.byFileType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#1677ff'} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number) => [`${val} GB`, 'Space']} />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </ChartCard>
  );
};

import React from 'react';
import { Progress } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { StorageBreakdown } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface StorageChartProps {
  storage: StorageBreakdown;
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#06b6d4', '#8b5cf6'];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: string | number; color?: string }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.customTooltip}>
      <div className={styles.customTooltipItem}>
        <span className={styles.customTooltipDot} style={{ background: payload[0].color || '#6366f1' }} />
        <span>{payload[0].name}</span>
        <span className={styles.customTooltipValue}>
          {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value} GB
        </span>
      </div>
    </div>
  );
};

export const StorageChart: React.FC<StorageChartProps> = ({ storage, onExpand, loading }) => {
  const percentUsed = Math.round((storage.usedBytes / storage.totalBytes) * 100);
  const usedGB = (storage.usedBytes / (1024 ** 3)).toFixed(1);
  const totalGB = (storage.totalBytes / (1024 ** 3)).toFixed(0);

  return (
    <ChartCard
      id="storage-chart"
      title="Storage Analytics"
      subtitle="Capacity usage & storage by file category"
      tooltip="Total storage allocation and vector store index sizes"
      onExpand={onExpand}
      loading={loading}
    >
      <div className={styles.storageLayout}>
        <div className={styles.storageGauge}>
          <Progress
            type="dashboard"
            percent={percentUsed}
            strokeColor={{
              '0%': '#6366f1',
              '100%': '#22c55e',
            }}
            trailColor="#f1f5f9"
            size={130}
            strokeWidth={10}
          />
          <span className={styles.storageGaugeLabel}>
            {usedGB} GB / {totalGB} GB Used
          </span>
        </div>
        <div className={styles.storageDonut}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={storage.byFileType}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {storage.byFileType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import type { QueueProcessingPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface ProcessingStatusChartProps {
  pipeline: QueueProcessingPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  PROCESSING: '#6366f1',
  COMPLETED: '#22c55e',
  FAILED: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: string | number; color?: string; payload?: QueueProcessingPoint }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  if (!data) return null;
  return (
    <div className={styles.customTooltip}>
      <div className={styles.customTooltipLabel}>{data.stage}</div>
      <div className={styles.customTooltipItem}>
        <span className={styles.customTooltipDot} style={{ background: STATUS_COLORS[data.status] }} />
        <span>{STATUS_LABELS[data.status] || data.status}</span>
        <span className={styles.customTooltipValue}>{data.count.toLocaleString()} items</span>
      </div>
    </div>
  );
};

export const ProcessingStatusChart: React.FC<ProcessingStatusChartProps> = ({
  pipeline,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="processing-status-chart"
      title="Processing Pipeline"
      subtitle="Document processing queue (OCR, Chunking, Embeddings)"
      tooltip="Real-time status of document parsing and embedding creation"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={pipeline} margin={{ top: 8, right: 16, left: -4, bottom: 16 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
            interval={0}
            angle={-12}
            textAnchor="end"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }} />
          <Bar dataKey="count" name="Queue Count" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {pipeline.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

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
import { QueueProcessingPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';

interface ProcessingStatusChartProps {
  pipeline: QueueProcessingPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#faad14',
  PROCESSING: '#1677ff',
  COMPLETED: '#52c41a',
  FAILED: '#ff4d4f',
};

export const ProcessingStatusChart: React.FC<ProcessingStatusChartProps> = ({
  pipeline,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="processing-status-chart"
      title="Processing Pipeline Analytics"
      subtitle="Document processing queue breakdown (OCR, Chunking, Embeddings)"
      tooltip="Real-time status of document parsing, chunking, and embedding creation"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={pipeline} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(val: number) => [`${val} items`, 'Count']} />
          <Bar dataKey="count" name="Queue Count" radius={[4, 4, 0, 0]}>
            {pipeline.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || '#1677ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

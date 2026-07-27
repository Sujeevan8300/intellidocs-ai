import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { TimeSeriesPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';

interface AIUsageChartProps {
  data: TimeSeriesPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

export const AIUsageChart: React.FC<AIUsageChartProps> = ({ data, onExpand, loading }) => {
  return (
    <ChartCard
      id="ai-usage-chart"
      title="AI Usage Analytics"
      subtitle="Daily AI conversations, average prompt length, and response latency"
      tooltip="Tracks workload metrics for AI RAG assistant operations"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversations"
            name="Conversations"
            stroke="#1677ff"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgPromptLength"
            name="Avg Prompt Words"
            stroke="#722ed1"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

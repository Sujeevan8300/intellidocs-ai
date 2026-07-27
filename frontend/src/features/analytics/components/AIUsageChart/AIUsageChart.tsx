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
import styles from '../../styles/analytics.module.css';

interface AIUsageChartProps {
  data: TimeSeriesPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: string | number; color?: string }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.customTooltip}>
      <div className={styles.customTooltipLabel}>{label}</div>
      {payload.map((entry, i) => (
        <div className={styles.customTooltipItem} key={i}>
          <span className={styles.customTooltipDot} style={{ background: entry.color }} />
          <span>{entry.name}</span>
          <span className={styles.customTooltipValue}>
            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const AIUsageChart: React.FC<AIUsageChartProps> = ({ data, onExpand, loading }) => {
  return (
    <ChartCard
      id="ai-usage-chart"
      title="AI Usage Analytics"
      subtitle="Daily conversations, prompt length & response latency"
      tooltip="Tracks workload metrics for AI RAG assistant operations"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 24, left: -4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversations"
            name="Conversations"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#6366f1' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgPromptLength"
            name="Avg Prompt Words"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

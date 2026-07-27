import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { HorizontalBarPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface SearchAnalyticsChartProps {
  topQueries: HorizontalBarPoint[];
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
          <span className={styles.customTooltipDot} style={{ background: '#06b6d4' }} />
          <span>{entry.name === 'count' ? 'Searches' : 'Avg Latency'}</span>
          <span className={styles.customTooltipValue}>
            {entry.name === 'count'
              ? `${typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}`
              : `${entry.value}ms`}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SearchAnalyticsChart: React.FC<SearchAnalyticsChartProps> = ({
  topQueries,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="search-analytics-chart"
      title="Semantic Search Analytics"
      subtitle="Top vector search queries & average latency"
      tooltip="Top user query patterns across indexed enterprise documents"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topQueries}
          margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="query"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={150}
            tickFormatter={(val: string) => (val.length > 20 ? `${val.substring(0, 20)}...` : val)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }} />
          <Bar
            dataKey="count"
            name="count"
            fill="#06b6d4"
            radius={[0, 6, 6, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

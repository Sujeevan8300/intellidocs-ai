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

interface SearchAnalyticsChartProps {
  topQueries: HorizontalBarPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

export const SearchAnalyticsChart: React.FC<SearchAnalyticsChartProps> = ({
  topQueries,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="search-analytics-chart"
      title="Semantic Search Analytics"
      subtitle="Most frequent vector search queries and query latency"
      tooltip="Top user query patterns across indexed enterprise documents"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topQueries}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="query"
            tick={{ fontSize: 11 }}
            width={160}
            tickFormatter={(val: string) => (val.length > 22 ? `${val.substring(0, 22)}...` : val)}
          />
          <Tooltip
            formatter={(value: any, name: any) => [
              name === 'count' ? `${value} searches` : `${value} ms`,
              name === 'count' ? 'Frequency' : 'Avg Latency',
            ]}
          />
          <Bar dataKey="count" name="count" fill="#13c2c2" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

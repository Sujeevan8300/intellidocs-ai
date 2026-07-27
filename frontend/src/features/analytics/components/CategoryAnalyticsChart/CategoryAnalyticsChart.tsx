import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { DistributionPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';

interface CategoryAnalyticsChartProps {
  categories: DistributionPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const DEFAULT_COLORS = ['#1677ff', '#722ed1', '#fa541c', '#52c41a', '#faad14'];

export const CategoryAnalyticsChart: React.FC<CategoryAnalyticsChartProps> = ({
  categories,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="category-analytics-chart"
      title="Category Analytics"
      subtitle="Document distribution across enterprise departments"
      tooltip="Breakdown of documents categorized by HR, Tech, Legal, Finance, etc."
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categories}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={(entry: any) => `${entry.name} (${entry.percentage ?? 0}%)`}
          >
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => [`${value} files`, 'Documents']} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

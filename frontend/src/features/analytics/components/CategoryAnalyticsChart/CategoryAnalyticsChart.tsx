import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { DistributionPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface CategoryAnalyticsChartProps {
  categories: DistributionPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const DEFAULT_COLORS = ['#6366f1', '#8b5cf6', '#f97316', '#22c55e', '#f59e0b'];

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
          {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value} docs
        </span>
      </div>
    </div>
  );
};

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  name?: string;
  percent?: number;
}

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, percent }: PieLabelProps) => {
  if (cx == null || cy == null || midAngle == null || outerRadius == null) return null;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 22;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (!percent || percent < 0.05) return null;
  return (
    <text
      x={x}
      y={y}
      fill="#475569"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={500}
    >
      {name} ({Math.round(percent * 100)}%)
    </text>
  );
};

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
      tooltip="Breakdown of documents by HR, Tech, Legal, Finance, etc."
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categories}
            cx="50%"
            cy="50%"
            outerRadius={85}
            innerRadius={40}
            dataKey="value"
            stroke="none"
            paddingAngle={2}
            label={renderCustomLabel}
          >
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

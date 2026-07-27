import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { TimeSeriesPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface UserActivityChartProps {
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

export const UserActivityChart: React.FC<UserActivityChartProps> = ({ data, onExpand, loading }) => {
  return (
    <ChartCard
      id="user-activity-chart"
      title="User Activity Analytics"
      subtitle="Daily logins, active users & new user onboarding"
      tooltip="Monitors platform user adoption and engagement"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 24, left: -4, bottom: 0 }}>
          <defs>
            <linearGradient id="gradLogins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
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
          <Area
            type="monotone"
            dataKey="dailyLogins"
            name="Daily Logins"
            stroke="#22c55e"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#gradLogins)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#22c55e' }}
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            name="Active Users"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#gradActive)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#6366f1' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

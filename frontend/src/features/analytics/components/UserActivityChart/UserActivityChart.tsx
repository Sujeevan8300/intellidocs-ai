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

interface UserActivityChartProps {
  data: TimeSeriesPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

export const UserActivityChart: React.FC<UserActivityChartProps> = ({ data, onExpand, loading }) => {
  return (
    <ChartCard
      id="user-activity-chart"
      title="User Activity Analytics"
      subtitle="Daily logins, active users, and new user onboarding"
      tooltip="Monitors platform user adoption and engagement"
      onExpand={onExpand}
      loading={loading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#52c41a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1677ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area
            type="monotone"
            dataKey="dailyLogins"
            name="Daily Logins"
            stroke="#52c41a"
            fillOpacity={1}
            fill="url(#colorLogins)"
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            name="Active Users"
            stroke="#1677ff"
            fillOpacity={1}
            fill="url(#colorActive)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

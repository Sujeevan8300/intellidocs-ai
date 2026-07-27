import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { TimeSeriesPoint, DistributionPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';
import styles from '../../styles/analytics.module.css';

interface DocumentAnalyticsChartProps {
  uploadTrend: TimeSeriesPoint[];
  documentTypes: DistributionPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#06b6d4', '#8b5cf6'];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: string | number; color?: string }>;
  label?: string | number;
}

const BarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

const PieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.customTooltip}>
      <div className={styles.customTooltipItem}>
        <span>{payload[0].name}</span>
        <span className={styles.customTooltipValue}>
          {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value} files
        </span>
      </div>
    </div>
  );
};

export const DocumentAnalyticsChart: React.FC<DocumentAnalyticsChartProps> = ({
  uploadTrend,
  documentTypes,
  onExpand,
  loading,
}) => {
  return (
    <ChartCard
      id="document-analytics-chart"
      title="Document Analytics"
      subtitle="Uploads vs AI-processed documents & file type breakdown"
      tooltip="Document ingestion trends and file type distribution"
      onExpand={onExpand}
      loading={loading}
    >
      <div className={styles.docChartSplit}>
        <div className={styles.docChartBar}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={uploadTrend} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
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
                width={36}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="uploaded"
                name="Uploaded"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="processed"
                name="AI Processed"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.docChartPie}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={documentTypes}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {documentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                iconType="circle"
                iconSize={7}
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

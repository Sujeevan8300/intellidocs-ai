import React from 'react';
import { Row, Col } from 'antd';
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
import { TimeSeriesPoint, DistributionPoint } from '../../types/analytics.types';
import { ChartCard } from '../ChartCard/ChartCard';

interface DocumentAnalyticsChartProps {
  uploadTrend: TimeSeriesPoint[];
  documentTypes: DistributionPoint[];
  onExpand?: (id: string) => void;
  loading?: boolean;
}

const COLORS = ['#1677ff', '#52c41a', '#faad14', '#13c2c2', '#722ed1'];

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
      subtitle="Uploaded vs AI-processed documents and breakdown by file type"
      tooltip="Document ingestion trends and file type distribution"
      onExpand={onExpand}
      loading={loading}
    >
      <Row height="100%">
        <Col span={14}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={uploadTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="uploaded" name="Uploaded" fill="#1677ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="processed" name="AI Processed" fill="#52c41a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col span={10}>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={documentTypes}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {documentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} files`, 'Count']} />
              <Legend wrapperStyle={{ fontSize: 10 }} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </ChartCard>
  );
};

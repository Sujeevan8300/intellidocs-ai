import React from 'react';
import { Card, Timeline, Typography, Tag, Space } from 'antd';
import {
  FileTextOutlined,
  RobotOutlined,
  UserOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { TimelineEvent } from '../../types/analytics.types';

const { Text } = Typography;

interface TimelineCardProps {
  events: TimelineEvent[];
  loading?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  DOCUMENT: <FileTextOutlined style={{ color: '#1677ff' }} />,
  AI: <RobotOutlined style={{ color: '#722ed1' }} />,
  USER: <UserOutlined style={{ color: '#52c41a' }} />,
  SEARCH: <SearchOutlined style={{ color: '#13c2c2' }} />,
};

export const TimelineCard: React.FC<TimelineCardProps> = ({ events, loading }) => {
  return (
    <Card
      loading={loading}
      title="System Activity Timeline"
      style={{
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        height: '100%',
      }}
    >
      <div style={{ height: 260, overflowY: 'auto', paddingRight: 8 }}>
        <Timeline
          items={events.map((evt) => ({
            dot:
              evt.status === 'WARNING' ? (
                <WarningOutlined style={{ color: '#faad14' }} />
              ) : (
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
              ),
            children: (
              <div>
                <Space size="small">
                  <Text strong style={{ fontSize: 13 }}>
                    {evt.timestamp}
                  </Text>
                  <Tag color={evt.category === 'AI' ? 'purple' : 'blue'}>{evt.category}</Tag>
                </Space>
                <Text style={{ display: 'block', fontWeight: 600, fontSize: 13, marginTop: 2 }}>
                  {evt.title}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {evt.description}
                </Text>
              </div>
            ),
          }))}
        />
      </div>
    </Card>
  );
};

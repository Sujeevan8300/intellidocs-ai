import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import { KPIItem } from '../../types/analytics.types';
import { KPICard } from '../KPICard/KPICard';

interface KPISectionProps {
  kpis: KPIItem[];
  loading?: boolean;
}

export const KPISection: React.FC<KPISectionProps> = ({ kpis, loading = false }) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <Col xs={24} sm={12} md={6} lg={3} key={idx}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {kpis.map((kpi) => (
        <Col xs={24} sm={12} md={6} lg={6} xl={3} key={kpi.id}>
          <KPICard kpi={kpi} loading={loading} />
        </Col>
      ))}
    </Row>
  );
};

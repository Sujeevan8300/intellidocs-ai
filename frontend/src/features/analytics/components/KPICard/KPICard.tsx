import React from 'react';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  CloudServerOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import type { KPIItem } from '../../types/analytics.types';
import styles from '../../styles/analytics.module.css';

const ICON_MAP: Record<string, { icon: React.ReactNode; colorClass: string }> = {
  UserOutlined: { icon: <UserOutlined />, colorClass: styles.kpiIconBlue },
  TeamOutlined: { icon: <TeamOutlined />, colorClass: styles.kpiIconGreen },
  FileTextOutlined: { icon: <FileTextOutlined />, colorClass: styles.kpiIconAmber },
  CheckCircleOutlined: { icon: <CheckCircleOutlined />, colorClass: styles.kpiIconGreen },
  MessageOutlined: { icon: <MessageOutlined />, colorClass: styles.kpiIconPurple },
  SearchOutlined: { icon: <SearchOutlined />, colorClass: styles.kpiIconCyan },
  ThunderboltOutlined: { icon: <ThunderboltOutlined />, colorClass: styles.kpiIconOrange },
  CloudServerOutlined: { icon: <CloudServerOutlined />, colorClass: styles.kpiIconPink },
};

interface KPICardProps {
  kpi: KPIItem;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const isPositive = kpi.change >= 0;
  const trendClass = kpi.trend === 'UP'
    ? styles.kpiTrendUp
    : kpi.trend === 'DOWN'
      ? styles.kpiTrendDown
      : styles.kpiTrendNeutral;

  const formattedValue = typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value;

  const iconEntry = ICON_MAP[kpi.icon] || { icon: <FileTextOutlined />, colorClass: styles.kpiIconAmber };

  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiCardHeader}>
        <div className={`${styles.kpiIconWrap} ${iconEntry.colorClass}`}>
          {iconEntry.icon}
        </div>
        <span className={styles.kpiTitle} title={kpi.tooltip}>{kpi.title}</span>
      </div>
      <div className={styles.kpiCardBody}>
        <span className={styles.kpiValue}>
          {formattedValue}
          {kpi.unit && <span className={styles.kpiUnit}>{kpi.unit}</span>}
        </span>
        <span className={`${styles.kpiTrend} ${trendClass}`}>
          {kpi.trend === 'UP' && <RiseOutlined style={{ fontSize: 11 }} />}
          {kpi.trend === 'DOWN' && <FallOutlined style={{ fontSize: 11 }} />}
          {kpi.trend === 'NEUTRAL' && <MinusOutlined style={{ fontSize: 11 }} />}
          {isPositive ? '+' : ''}{kpi.change}%
        </span>
      </div>
    </div>
  );
};

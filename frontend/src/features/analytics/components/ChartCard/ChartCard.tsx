import React from 'react';
import { Tooltip, Button } from 'antd';
import { ExpandOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from '../../styles/analytics.module.css';

interface ChartCardProps {
  id: string;
  title: string;
  subtitle?: string;
  tooltip?: string;
  extraActions?: React.ReactNode;
  onExpand?: (id: string) => void;
  children: React.ReactNode;
  loading?: boolean;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  tooltip,
  extraActions,
  onExpand,
  children,
  loading = false,
}) => {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartCardHeader}>
        <div className={styles.chartCardHeaderLeft}>
          <span className={styles.chartCardTitle}>{title}</span>
          {subtitle && <span className={styles.chartCardSubtitle}>{subtitle}</span>}
        </div>
        <div className={styles.chartCardActions}>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined style={{ fontSize: 14, color: '#94a3b8', marginRight: 4 }} />
            </Tooltip>
          )}
          {extraActions}
          {onExpand && (
            <Tooltip title="Expand Full Screen">
              <Button
                type="text"
                size="small"
                icon={<ExpandOutlined style={{ color: '#94a3b8', fontSize: 14 }} />}
                onClick={() => onExpand(id)}
                style={{ borderRadius: 6 }}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <div className={styles.chartCardBody}>
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
            Loading...
          </div>
        ) : (
          <div className={styles.chartContainer}>{children}</div>
        )}
      </div>
    </div>
  );
};

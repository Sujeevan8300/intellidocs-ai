import React from 'react';
import type { KPIItem } from '../../types/analytics.types';
import { KPICard } from '../KPICard/KPICard';
import styles from '../../styles/analytics.module.css';

interface KPISectionProps {
  kpis: KPIItem[];
  loading?: boolean;
}

export const KPISection: React.FC<KPISectionProps> = ({ kpis, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.kpiSkeleton}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div className={styles.kpiSkeletonCard} key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.kpiGrid}>
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
};

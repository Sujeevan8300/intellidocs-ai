import React from 'react';
import { Space, Select, DatePicker, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { AnalyticsFilters } from '../../types/analytics.types';
import {
  DATE_RANGE_PRESETS,
  DEPARTMENT_OPTIONS,
  ROLE_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '../../hooks/useDateRange';

const { RangePicker } = DatePicker;

interface AnalyticsFiltersProps {
  filters: AnalyticsFilters;
  onChange: (filters: Partial<AnalyticsFilters>) => void;
  onReset: () => void;
  loading?: boolean;
}

export const AnalyticsFiltersBar: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onChange,
  onReset,
  loading = false,
}) => {
  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Select
        value={filters.dateRange}
        onChange={(val) => onChange({ dateRange: val })}
        options={DATE_RANGE_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
        style={{ width: 140 }}
      />

      {filters.dateRange === 'custom' && (
        <RangePicker
          value={[
            filters.customStartDate ? dayjs(filters.customStartDate) : null,
            filters.customEndDate ? dayjs(filters.customEndDate) : null,
          ]}
          onChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              onChange({
                customStartDate: dates[0].toISOString(),
                customEndDate: dates[1].toISOString(),
              });
            }
          }}
        />
      )}

      <Select
        placeholder="Department"
        value={filters.department || ''}
        onChange={(val) => onChange({ department: val })}
        options={DEPARTMENT_OPTIONS}
        style={{ width: 180 }}
      />

      <Select
        placeholder="User Role"
        value={filters.userRole || ''}
        onChange={(val) => onChange({ userRole: val })}
        options={ROLE_OPTIONS}
        style={{ width: 150 }}
      />

      <Select
        placeholder="Document Type"
        value={filters.documentType || ''}
        onChange={(val) => onChange({ documentType: val })}
        options={DOCUMENT_TYPE_OPTIONS}
        style={{ width: 170 }}
      />

      <Button icon={<ReloadOutlined />} onClick={onReset} disabled={loading}>
        Reset Filters
      </Button>
    </Space>
  );
};

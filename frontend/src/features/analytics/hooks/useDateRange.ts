import type { DateRangePreset } from '../types/analytics.types';

export const DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Custom Range', value: 'custom' },
];

export const DEPARTMENT_OPTIONS = [
  { label: 'All Departments', value: '' },
  { label: 'Engineering & Technology', value: 'engineering' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Legal & Compliance', value: 'legal' },
  { label: 'Finance & Operations', value: 'finance' },
];

export const ROLE_OPTIONS = [
  { label: 'All Roles', value: '' },
  { label: 'Administrator', value: 'admin' },
  { label: 'Knowledge Manager', value: 'km' },
  { label: 'Standard User', value: 'user' },
];

export const DOCUMENT_TYPE_OPTIONS = [
  { label: 'All File Types', value: '' },
  { label: 'PDF Documents (.pdf)', value: 'pdf' },
  { label: 'Word Documents (.docx)', value: 'docx' },
  { label: 'Text / Markdown (.txt, .md)', value: 'txt' },
  { label: 'Spreadsheets (.xlsx)', value: 'xlsx' },
];

export function useDateRange() {
  return {
    presets: DATE_RANGE_PRESETS,
  };
}

import { Button, Select } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import type { UserFilter } from '../../constants/user.constants'
import {
  STATUS_OPTIONS,
  ROLE_OPTIONS,
  DEPARTMENT_OPTIONS,
  LOGIN_STATUS_OPTIONS,
} from '../../constants/user.constants'

interface UserFiltersProps {
  filters: UserFilter
  onFilterChange: (filters: Partial<UserFilter>) => void
  onReset: () => void
}

export function UserFilters({ filters, onFilterChange, onReset }: UserFiltersProps) {
  return (
    <div className="usr-filters" role="toolbar" aria-label="User filters">
      <Select
        className="usr-filter-select"
        value={filters.status}
        onChange={(val) => onFilterChange({ status: val })}
        options={STATUS_OPTIONS}
        aria-label="Filter by status"
      />
      <Select
        className="usr-filter-select"
        value={filters.role}
        onChange={(val) => onFilterChange({ role: val })}
        options={ROLE_OPTIONS}
        aria-label="Filter by role"
      />
      <Select
        className="usr-filter-select"
        value={filters.department}
        onChange={(val) => onFilterChange({ department: val })}
        options={DEPARTMENT_OPTIONS}
        aria-label="Filter by department"
      />
      <Select
        className="usr-filter-select"
        value={filters.loginStatus}
        onChange={(val) => onFilterChange({ loginStatus: val })}
        options={LOGIN_STATUS_OPTIONS}
        aria-label="Filter by login status"
      />
      <Button
        icon={<ReloadOutlined />}
        onClick={onReset}
        aria-label="Reset filters"
      >
        Reset
      </Button>
    </div>
  )
}

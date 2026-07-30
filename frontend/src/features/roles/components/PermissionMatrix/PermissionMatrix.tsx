import { useMemo, useState, useCallback } from 'react'
import { Checkbox, Input, Tag, Button, Space } from 'antd'
import { PERMISSION_GROUPS, PERMISSION_LABELS } from '../../../../core/permissions/permission.constants'
import type { Permission } from '../../../../core/permissions/permission.constants'

interface PermissionMatrixProps {
  selected: string[]
  onChange: (privileges: string[]) => void
}

export function PermissionMatrix({ selected, onChange }: PermissionMatrixProps) {
  const [search, setSearch] = useState('')
  const selectedSet = useMemo(() => new Set(selected), [selected])

  const groups = useMemo(() => {
    return Object.entries(PERMISSION_GROUPS).filter(([, perms]) =>
      !search || perms.some(p => p.toLowerCase().includes(search.toLowerCase()) || (PERMISSION_LABELS[p as Permission] ?? p).toLowerCase().includes(search.toLowerCase())),
    )
  }, [search])

  const allSelected = useMemo(() => {
    return Object.values(PERMISSION_GROUPS).flat().every(p => selectedSet.has(p))
  }, [selectedSet])

  const toggleAll = useCallback(() => {
    if (allSelected) onChange([])
    else onChange(Object.values(PERMISSION_GROUPS).flat())
  }, [allSelected, onChange])

  const toggleGroup = useCallback((perms: Permission[]) => {
    const allInGroup = perms.every(p => selectedSet.has(p))
    const newSet = new Set(selected)
    if (allInGroup) perms.forEach(p => newSet.delete(p))
    else perms.forEach(p => newSet.add(p))
    onChange(Array.from(newSet))
  }, [selected, selectedSet, onChange])

  const toggleOne = useCallback((perm: Permission) => {
    const newSet = new Set(selected)
    if (newSet.has(perm)) newSet.delete(perm)
    else newSet.add(perm)
    onChange(Array.from(newSet))
  }, [selected, onChange])

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Input.Search placeholder="Search permissions..." style={{ width: 260 }} value={search} onChange={(e) => setSearch(e.target.value)} allowClear />
        <Button size="small" onClick={toggleAll}>{allSelected ? 'Deselect All' : 'Select All'}</Button>
      </Space>

      {groups.map(([group, perms]) => {
        const groupAll = perms.every(p => selectedSet.has(p))
        const groupSome = perms.some(p => selectedSet.has(p)) && !groupAll
        return (
          <div key={group} style={{ marginBottom: 16, padding: '12px 16px', background: '#fafafe', borderRadius: 10, border: '1px solid #f0eff4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Checkbox
                checked={groupAll}
                indeterminate={groupSome}
                onChange={() => toggleGroup(perms)}
              />
              <strong style={{ fontSize: 13, color: '#222137' }}>{group}</strong>
              <Tag style={{ marginLeft: 'auto' }}>{selectedSet.size > 0 ? perms.filter(p => selectedSet.has(p)).length : 0}/{perms.length}</Tag>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {perms.map(perm => (
                <Checkbox
                  key={perm}
                  checked={selectedSet.has(perm)}
                  onChange={() => toggleOne(perm)}
                  style={{ marginRight: 8, fontSize: 12, lineHeight: '30px' }}
                >
                  <code style={{ fontSize: 11 }}>{perm}</code>
                </Checkbox>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

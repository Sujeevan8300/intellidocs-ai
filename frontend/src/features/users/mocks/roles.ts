export const roles = [
  { id: 1, name: 'Super Admin', description: 'Full system access', level: 1 },
  { id: 2, name: 'Knowledge Manager', description: 'Manage knowledge base', level: 2 },
  { id: 3, name: 'Employee', description: 'Basic access', level: 3 },
]

export const ROLE_NAMES = roles.map((r) => r.name)

import type { Role } from '../types/Role'

export const MOCK_ROLES: Role[] = [
  {
    id: 1, name: 'Super Admin', description: 'Full system access with all privileges', status: 'ACTIVE', usersCount: 2,
    createdAt: '2026-01-15',
    privileges: [
      'DOCUMENT_VIEW','DOCUMENT_CREATE','DOCUMENT_UPDATE','DOCUMENT_DELETE','DOCUMENT_DOWNLOAD',
      'CATEGORY_VIEW','CATEGORY_CREATE','CATEGORY_UPDATE','CATEGORY_DELETE',
      'USER_VIEW','USER_CREATE','USER_UPDATE','USER_DELETE','USER_ASSIGN_ROLE',
      'AI_CHAT_ACCESS','AI_HISTORY_VIEW','AI_EXPORT',
      'SEARCH_ACCESS','SEARCH_ADVANCED','SEARCH_EXPORT',
      'ANALYTICS_VIEW','ANALYTICS_EXPORT',
      'SETTINGS_VIEW','SETTINGS_UPDATE',
      'ROLE_VIEW','ROLE_CREATE','ROLE_UPDATE','ROLE_DELETE',
      'PRIVILEGE_VIEW','PRIVILEGE_CREATE','PRIVILEGE_UPDATE','PRIVILEGE_DELETE',
    ],
  },
  {
    id: 2, name: 'Knowledge Manager', description: 'Manages documents, categories, and content', status: 'ACTIVE', usersCount: 5,
    createdAt: '2026-02-01',
    privileges: [
      'DOCUMENT_VIEW','DOCUMENT_CREATE','DOCUMENT_UPDATE','DOCUMENT_DELETE','DOCUMENT_DOWNLOAD',
      'CATEGORY_VIEW','CATEGORY_CREATE','CATEGORY_UPDATE','CATEGORY_DELETE',
      'USER_VIEW','USER_CREATE','USER_UPDATE',
      'AI_CHAT_ACCESS','AI_HISTORY_VIEW','AI_EXPORT',
      'SEARCH_ACCESS','SEARCH_ADVANCED','SEARCH_EXPORT',
      'ANALYTICS_VIEW',
      'SETTINGS_VIEW','SETTINGS_UPDATE',
      'ROLE_VIEW',
      'PRIVILEGE_VIEW',
    ],
  },
  {
    id: 3, name: 'Analyst', description: 'View analytics and search documents', status: 'ACTIVE', usersCount: 8,
    createdAt: '2026-02-15',
    privileges: [
      'DOCUMENT_VIEW','DOCUMENT_DOWNLOAD',
      'AI_CHAT_ACCESS','AI_HISTORY_VIEW',
      'SEARCH_ACCESS','SEARCH_ADVANCED',
      'ANALYTICS_VIEW','ANALYTICS_EXPORT',
    ],
  },
  {
    id: 4, name: 'Editor', description: 'Create and edit documents and categories', status: 'ACTIVE', usersCount: 12,
    createdAt: '2026-03-01',
    privileges: [
      'DOCUMENT_VIEW','DOCUMENT_CREATE','DOCUMENT_UPDATE',
      'CATEGORY_VIEW','CATEGORY_CREATE','CATEGORY_UPDATE',
      'AI_CHAT_ACCESS',
      'SEARCH_ACCESS',
    ],
  },
  {
    id: 5, name: 'Employee', description: 'Basic read-only access for regular employees', status: 'ACTIVE', usersCount: 45,
    createdAt: '2026-03-10',
    privileges: [
      'DOCUMENT_VIEW','DOCUMENT_CREATE',
      'CATEGORY_VIEW',
      'AI_CHAT_ACCESS',
      'SEARCH_ACCESS',
    ],
  },
  {
    id: 6, name: 'Viewer', description: 'Read-only access to approved content', status: 'INACTIVE', usersCount: 0,
    createdAt: '2026-04-01',
    privileges: [
      'DOCUMENT_VIEW',
      'CATEGORY_VIEW',
      'SEARCH_ACCESS',
    ],
  },
]

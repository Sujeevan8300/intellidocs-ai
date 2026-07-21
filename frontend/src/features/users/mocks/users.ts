import type { User, UserStatus } from '../types/User'
import { departments } from './departments'

const randomDate = (startDaysAgo: number, endDaysAgo: number): string => {
  const now = Date.now()
  const start = now - startDaysAgo * 86_400_000
  const end = now - endDaysAgo * 86_400_000
  const timestamp = start + Math.random() * (end - start)
  return new Date(timestamp).toISOString().slice(0, 10)
}

const randomStatus = (): UserStatus => {
  const rand = Math.random()
  if (rand < 0.7) return 'ACTIVE'
  if (rand < 0.86) return 'INACTIVE'
  if (rand < 0.94) return 'LOCKED'
  return 'PENDING'
}

const pick = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const FIRST_NAMES = [
  'James', 'Maria', 'Wei', 'Aisha', 'Carlos', 'Yuki', 'Olga',
  'Raj', 'Fatima', 'Daniel', 'Soo-Jin', 'Alejandro', 'Priya',
  'Liam', 'Amara', 'Chen', 'Isabella', 'Tariq', 'Mei', 'Andre',
  'Nadia', 'Kofi', 'Sophia', 'Dmitri', 'Valentina', 'Hiroshi',
  'Elena', 'Kwame', 'Lucia', 'Sven', 'Aaliyah', 'Tomas',
  'Ji-Hye', 'Marco', 'Deepa', 'Emeka', 'Hana', 'Ivan',
  'Rosa', 'Takeshi', 'Leila', 'Sergio', 'Mina', 'Omar',
  'Thandiwe', 'Akira', 'Petra', 'Rashid', 'Vera', 'Joon',
]

const LAST_NAMES = [
  'Anderson', 'Nguyen', 'Zhang', 'Khan', 'Rodriguez', 'Tanaka',
  'Petrova', 'Sharma', 'Al-Farsi', 'Müller', 'Kim', 'Garcia',
  'Patel', "O'Brien", 'Okafor', 'Li', 'Fernandez', 'Hassan',
  'Sato', 'Costa', 'Sokolov', 'Johansson', 'Yamamoto', 'Torres',
  'Adeyemi', 'Nakamura', 'Ivanova', 'Diaz', 'Watanabe', 'Lee',
  'Moreau', 'Chandra', 'Bergström', 'Kowalski', 'Rivera',
  'Ishikawa', 'Popov', 'Herrera', 'Nishimura', 'Svensson',
  'Volkov', 'Morales', 'Takahashi', 'Abbas', 'Varga', 'Cho',
  'Medina', 'Suzuki', 'Björk', 'Ferreira', 'Park',
]

const DEPT_NAMES = departments.map((d) => d.name)

const NOTES = [
  'Exceeds expectations in quarterly reviews.',
  'Mentoring two junior team members.',
  'Completed advanced security training.',
  'Key contributor to Q2 migration project.',
  'On extended leave until further notice.',
  'Requesting transfer to IT department.',
  'Certified in project management.',
  'Leads the diversity & inclusion committee.',
  'Strong background in data analytics.',
  'Promotion under review.',
]

const buildUser = (index: number): User => {
  const firstName = FIRST_NAMES[index]
  const lastName = LAST_NAMES[index]
  const department = pick(DEPT_NAMES)
  const isEmployee = index >= 10
  const role = isEmployee ? 'Employee' : index >= 2 ? 'Knowledge Manager' : 'Super Admin'
  const status = randomStatus()
  const createdAt = randomDate(540, 0)
  const isActiveOrLocked = status === 'ACTIVE' || status === 'LOCKED'
  const lastLogin = isActiveOrLocked ? randomDate(30, 0) : ''

  return {
    id: index + 1,
    employeeId: `EMP-${String(index + 1).padStart(4, '0')}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    department,
    role,
    status,
    online: status === 'ACTIVE' && Math.random() < 0.43,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}+${lastName}`,
    lastLogin,
    loginCount: Math.floor(Math.random() * 496) + 5,
    createdAt,
    updatedAt: createdAt,
    notes: Math.random() < 0.3 ? pick(NOTES) : '',
    deleted: false,
  }
}

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) =>
  buildUser(i),
)

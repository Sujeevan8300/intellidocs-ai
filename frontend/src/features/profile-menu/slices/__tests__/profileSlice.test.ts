import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import profileReducer, {
  fetchProfile,
  logoutUser,
  setUser,
  clearError,
} from '../profileSlice'
import type { ProfileState } from '../../types/UserProfile'

vi.mock('../../api', () => ({
  profileService: {
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  },
}))

import { profileService } from '../../api'
import type { UserProfile } from '../../types/UserProfile'

const mockedService = vi.mocked(profileService)

const MOCK_USER: UserProfile = {
  id: 'usr_01',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@intellidocs.ai',
  role: 'Knowledge Manager',
  department: 'Engineering',
  avatar: '',
  online: true,
}

function createTestStore(preloadedState?: { profile: ProfileState }) {
  return configureStore({
    reducer: { profile: profileReducer },
    preloadedState,
  })
}

function getState(store: ReturnType<typeof createTestStore>): ProfileState {
  return (store.getState() as { profile: ProfileState }).profile
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('profileSlice - initial state', () => {
  it('has correct initial state', () => {
    const state = getState(createTestStore())
    expect(state.user).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.authenticated).toBe(true)
    expect(state.error).toBeUndefined()
  })
})

describe('profileSlice - synchronous reducers', () => {
  it('setUser sets the user', () => {
    const store = createTestStore()
    store.dispatch(setUser(MOCK_USER))
    expect(getState(store).user).toEqual(MOCK_USER)
  })

  it('setUser clears user when null', () => {
    const store = createTestStore({
      profile: { user: MOCK_USER, loading: false, authenticated: true, error: undefined },
    })
    store.dispatch(setUser(null))
    expect(getState(store).user).toBeNull()
  })

  it('clearError removes error', () => {
    const store = createTestStore({
      profile: { user: null, loading: false, authenticated: true, error: 'Some error' },
    })
    store.dispatch(clearError())
    expect(getState(store).error).toBeUndefined()
  })
})

describe('profileSlice - fetchProfile thunk', () => {
  it('sets loading on pending', () => {
    mockedService.getCurrentUser.mockRejectedValue(new Error('never resolves'))
    const store = createTestStore()
    store.dispatch(fetchProfile())
    expect(getState(store).loading).toBe(true)
  })

  it('sets user on fulfilled', async () => {
    mockedService.getCurrentUser.mockResolvedValue(MOCK_USER)
    const store = createTestStore()
    await store.dispatch(fetchProfile())
    const state = getState(store)
    expect(state.loading).toBe(false)
    expect(state.user).toEqual(MOCK_USER)
    expect(state.authenticated).toBe(true)
  })

  it('sets error on rejected', async () => {
    mockedService.getCurrentUser.mockRejectedValue(new Error('Network error'))
    const store = createTestStore()
    await store.dispatch(fetchProfile())
    const state = getState(store)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Network error')
  })
})

describe('profileSlice - logoutUser thunk', () => {
  it('clears user on fulfilled', async () => {
    mockedService.logout.mockResolvedValue()
    const store = createTestStore({
      profile: { user: MOCK_USER, loading: false, authenticated: true, error: undefined },
    })
    await store.dispatch(logoutUser())
    const state = getState(store)
    expect(state.user).toBeNull()
    expect(state.authenticated).toBe(false)
    expect(state.loading).toBe(false)
  })

  it('sets error on rejected', async () => {
    mockedService.logout.mockRejectedValue(new Error('Logout failed'))
    const store = createTestStore({
      profile: { user: MOCK_USER, loading: false, authenticated: true, error: undefined },
    })
    await store.dispatch(logoutUser())
    const state = getState(store)
    expect(state.error).toBe('Logout failed')
    expect(state.loading).toBe(false)
  })
})

import { vi } from 'vitest'

export function setupStorage(theme: string | null = null): void {
  const mockStorage = {
    getItem: vi.fn().mockReturnValue(theme),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: theme ? 1 : 0,
    key: vi.fn()
  }

  Object.defineProperty(window, 'sessionStorage', {
    value: mockStorage,
    writable: true
  })
}

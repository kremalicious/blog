import { vi } from 'vitest'

type ListenerRecord = Record<string, ((e: MediaQueryListEvent) => void)[]>

export function setupMatchMedia(
  isDarkMode = false,
  trackListeners = false
): ListenerRecord | undefined {
  const listeners: ListenerRecord = {}

  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: query.includes('dark') ? isDarkMode : !isDarkMode,
    addEventListener: trackListeners
      ? vi.fn((event, listener) => {
          if (!listeners[event]) listeners[event] = []
          listeners[event].push(listener as (e: MediaQueryListEvent) => void)
        })
      : vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    media: query
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock
  })

  return trackListeners ? listeners : undefined
}

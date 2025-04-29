import { beforeEach, describe, expect, it, vi } from 'vitest'

const baseHtml = `
  <html>
    <head>
      <meta name="theme-color">
    </head>
    <body>
    </body>
  </html>
`

const themeToggleHtml = `
  <html>
    <head>
      <meta name="theme-color">
    </head>
    <body>
      <div id="theme-toggle">
        <label for="toggle" class="checkbox">
          <input type="checkbox" name="toggle" id="toggle" aria-describedby="theme-toggle" />
          <div aria-live="assertive">
            <div id="sun"></div>
            <div id="moon"></div>
          </div>
        </label>
      </div>
    </body>
  </html>
`

type ListenerRecord = Record<string, ((e: MediaQueryListEvent) => void)[]>

function setupDocument(template: string): void {
  document.documentElement.innerHTML = template
}

function setupStorage(theme: string | null = null): void {
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

function setupMatchMedia(
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

async function loadThemeModule(): Promise<typeof import('./theme')> {
  vi.resetModules()
  return await import('./theme')
}

function triggerWindowLoad(): void {
  window.onload?.(new Event('load') as any)
}

beforeEach(() => {
  vi.restoreAllMocks()
  setupDocument(baseHtml)
  setupStorage(null)
  setupMatchMedia(false)
})

describe('Theme module', () => {
  it('exports the correct session storage name', async () => {
    const { sessionStorageName } = await loadThemeModule()
    expect(sessionStorageName).toBe('@kremalicious/theme')
  })

  describe('Initial theme setup', () => {
    it('sets light theme when system preference is light and no stored preference', async () => {
      setupMatchMedia(false) // Light mode
      await loadThemeModule()
      triggerWindowLoad()

      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(document.documentElement.getAttribute('data-theme-color')).toBe(
        '#e7eef4'
      )
      expect(
        document
          .querySelector('meta[name="theme-color"]')
          ?.getAttribute('content')
      ).toBe('#e7eef4')
    })

    it('sets dark theme when system preference is dark and no stored preference', async () => {
      setupMatchMedia(true) // Dark mode
      await loadThemeModule()
      triggerWindowLoad()

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.getAttribute('data-theme-color')).toBe(
        '#1d2224'
      )
      expect(
        document
          .querySelector('meta[name="theme-color"]')
          ?.getAttribute('content')
      ).toBe('#1d2224')
    })

    it('uses stored theme preference over system preference', async () => {
      setupStorage('dark')
      setupMatchMedia(false) // Light mode system preference

      await loadThemeModule()
      triggerWindowLoad()

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.getAttribute('data-theme-color')).toBe(
        '#1d2224'
      )
    })
  })

  describe('Theme toggle', () => {
    beforeEach(() => {
      setupDocument(themeToggleHtml)
    })

    it('sets up toggle elements correctly for light theme', async () => {
      setupMatchMedia(false) // Light mode
      await loadThemeModule()
      triggerWindowLoad()

      const sunElement = document.querySelector('#sun') as HTMLElement
      const moonElement = document.querySelector('#moon') as HTMLElement

      expect(sunElement.style.display).toBe('none')
      expect(moonElement.style.display).toBe('block')
      expect(
        document.querySelector('#theme-toggle')?.getAttribute('checked')
      ).toBe('false')
    })

    it('sets up toggle elements correctly for dark theme', async () => {
      setupMatchMedia(true) // Dark mode
      await loadThemeModule()
      triggerWindowLoad()

      const sunElement = document.querySelector('#sun') as HTMLElement
      const moonElement = document.querySelector('#moon') as HTMLElement

      expect(sunElement.style.display).toBe('block')
      expect(moonElement.style.display).toBe('none')
      expect(
        document.querySelector('#theme-toggle')?.getAttribute('checked')
      ).toBe('true')
    })

    it('toggles theme when toggle is clicked', async () => {
      setupMatchMedia(false) // Light mode
      const { sessionStorageName } = await loadThemeModule()
      triggerWindowLoad()

      // Verify initial state is light
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')

      // Toggle theme
      const themeToggleElement = document.getElementById('theme-toggle')
      themeToggleElement?.dispatchEvent(new Event('change'))

      // Verify theme changed to dark
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.getAttribute('data-theme-color')).toBe(
        '#1d2224'
      )
      expect(
        document
          .querySelector('meta[name="theme-color"]')
          ?.getAttribute('content')
      ).toBe('#1d2224')

      // Verify toggle UI updated
      const sunElement = document.querySelector('#sun') as HTMLElement
      const moonElement = document.querySelector('#moon') as HTMLElement
      expect(sunElement.style.display).toBe('block')
      expect(moonElement.style.display).toBe('none')
      expect(
        document.querySelector('#theme-toggle')?.getAttribute('checked')
      ).toBe('true')

      // Verify preference saved
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        sessionStorageName,
        'dark'
      )
    })
  })

  describe('System preference changes', () => {
    it('updates theme when system preference changes', async () => {
      const listeners = setupMatchMedia(false, true) // Start with light mode, track listeners
      await loadThemeModule()
      triggerWindowLoad()

      // Verify initial state is light
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')

      // Simulate system preference change to dark
      if (listeners?.change && listeners.change.length > 0) {
        listeners.change[0]({ matches: true } as MediaQueryListEvent)
      }

      // Verify theme changed to dark
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.getAttribute('data-theme-color')).toBe(
        '#1d2224'
      )
    })
  })
})

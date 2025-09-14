import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

// Ensure the custom element gets defined
import './relative-date'

type CleanupFn = () => void

describe('relative-date web component', () => {
  const fixedNow = new Date('2025-01-01T00:00:00.000Z')

  let restoreVisibility: CleanupFn
  let setVisibility: (state: DocumentVisibilityState) => void

  function mockVisibility(): {
    restore: CleanupFn
    set: (state: DocumentVisibilityState) => void
  } {
    const original = Object.getOwnPropertyDescriptor(
      document,
      'visibilityState'
    )

    let current: DocumentVisibilityState = 'visible'
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => current
    })

    const set = (state: DocumentVisibilityState) => {
      current = state
    }

    const restore = () => {
      if (original) Object.defineProperty(document, 'visibilityState', original)
    }

    return { restore, set }
  }

  function createRelativeDate(
    attrs: { datetime?: string | number; lang?: string } = {}
  ): HTMLElement {
    const el = document.createElement('relative-date')
    if (attrs.datetime != null)
      el.setAttribute('datetime', String(attrs.datetime))
    if (attrs.lang) el.setAttribute('lang', attrs.lang)
    document.body.appendChild(el)
    return el
  }

  function getTimeEl(host: HTMLElement): HTMLTimeElement | null {
    return host.shadowRoot?.querySelector('time') ?? null
  }

  function captureScheduledDelay(run: () => void): number {
    const spy = vi.spyOn(globalThis, 'setTimeout')
    run()
    const delay = spy.mock.calls[0]?.[1] as number | undefined
    spy.mockRestore()
    return delay ?? -1
  }

  beforeAll(() => {
    ;({ restore: restoreVisibility, set: setVisibility } = mockVisibility())
  })

  afterAll(() => {
    restoreVisibility()
  })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
    setVisibility('visible')
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('registers the custom element', () => {
    expect(customElements.get('relative-date')).toBeDefined()
  })

  it('renders <time> with absolute ISO and title', () => {
    const d = new Date(fixedNow.getTime() - 30_000) // 30s ago
    const el = createRelativeDate({ datetime: d.toISOString() })

    const time = getTimeEl(el)
    expect(time).not.toBeNull()
    expect(time?.dateTime).toBe(d.toISOString())
    expect(time?.getAttribute('title')).toBe(d.toLocaleString())
    expect(time?.textContent).toBeTruthy()
  })

  it('accepts epoch milliseconds in datetime attribute', () => {
    const d = new Date(fixedNow.getTime() - 5_000)
    const el = createRelativeDate({ datetime: d.getTime() })

    const time = getTimeEl(el)
    expect(time).not.toBeNull()
    expect(time?.dateTime).toBe(d.toISOString())
  })

  it('uses lang attribute for title locale', () => {
    const d = new Date(fixedNow.getTime() - 10_000)
    const el = createRelativeDate({ datetime: d.toISOString(), lang: 'de' })
    const time = getTimeEl(el)
    expect(time?.getAttribute('title')).toBe(d.toLocaleString('de'))
  })

  it('does not schedule when document is hidden', () => {
    setVisibility('hidden')
    const d = new Date(fixedNow.getTime() - 10_000)
    createRelativeDate({ datetime: d.toISOString() })

    expect(vi.getTimerCount()).toBe(0)
  })

  it('schedules updates when visible', () => {
    setVisibility('visible')
    const d = new Date(fixedNow.getTime() - 10_000)
    createRelativeDate({ datetime: d.toISOString() })

    expect(vi.getTimerCount()).toBeGreaterThan(0)
  })

  it('stops timers when visibility changes to hidden', () => {
    setVisibility('visible')
    const d = new Date(fixedNow.getTime() - 10_000)
    createRelativeDate({ datetime: d.toISOString() })
    expect(vi.getTimerCount()).toBeGreaterThan(0)

    setVisibility('hidden')
    document.dispatchEvent(new Event('visibilitychange'))

    expect(vi.getTimerCount()).toBe(0)
  })

  it('restarts timers when visibility changes back to visible', () => {
    setVisibility('hidden')
    const d = new Date(fixedNow.getTime() - 10_000)
    createRelativeDate({ datetime: d.toISOString() })
    expect(vi.getTimerCount()).toBe(0)

    setVisibility('visible')
    document.dispatchEvent(new Event('visibilitychange'))

    expect(vi.getTimerCount()).toBeGreaterThan(0)
  })

  it('responds to pageshow by ticking when visible', () => {
    setVisibility('visible')
    const d = new Date(fixedNow.getTime() - 10_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
      window.dispatchEvent(new Event('pageshow'))
    })
    expect(delay).toBeGreaterThan(0)
  })

  it('keeps custom title if already set on <time>', () => {
    const d = new Date(fixedNow.getTime() - 10_000)
    const el = createRelativeDate({ datetime: d.toISOString() })
    const time = getTimeEl(el)
    if (!time) throw new Error('time element missing')

    time.setAttribute('title', 'custom')

    // Trigger another tick without changing visibility (still visible)
    document.dispatchEvent(new Event('visibilitychange'))

    expect(time.getAttribute('title')).toBe('custom')
  })

  it('cleans up timers on disconnect', () => {
    const d = new Date(fixedNow.getTime() - 10_000)
    const el = createRelativeDate({ datetime: d.toISOString() })
    expect(vi.getTimerCount()).toBeGreaterThan(0)

    document.body.removeChild(el)

    expect(vi.getTimerCount()).toBe(0)
  })

  it('does nothing for missing datetime', () => {
    createRelativeDate()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('does nothing for invalid datetime', () => {
    createRelativeDate({ datetime: 'not-a-date' })
    expect(vi.getTimerCount()).toBe(0)
  })

  // ---- unit coverage: verify next delay per unit ----
  it('uses 1s delay when within seconds range', () => {
    const d = new Date(fixedNow.getTime() - 30_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(1000)
  })

  it('uses 60s delay when within minutes range', () => {
    const d = new Date(fixedNow.getTime() - 5 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(60_000)
  })

  it('uses 1h delay when within hours range', () => {
    const d = new Date(fixedNow.getTime() - 2 * 60 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(60 * 60_000)
  })

  it('uses 1d delay when within days range', () => {
    const d = new Date(fixedNow.getTime() - 3 * 24 * 60 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(24 * 60 * 60_000)
  })

  it('uses 1w delay when within weeks range', () => {
    const d = new Date(fixedNow.getTime() - 2 * 7 * 24 * 60 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(7 * 24 * 60 * 60_000)
  })

  it('uses 30d delay when within months range', () => {
    const d = new Date(fixedNow.getTime() - 3 * 30 * 24 * 60 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(30 * 24 * 60 * 60_000)
  })

  it('uses 365d delay when within years range', () => {
    const d = new Date(fixedNow.getTime() - 365 * 24 * 60 * 60_000)
    const delay = captureScheduledDelay(() => {
      createRelativeDate({ datetime: d.toISOString() })
    })
    expect(delay).toBe(365 * 24 * 60 * 60_000)
  })
})

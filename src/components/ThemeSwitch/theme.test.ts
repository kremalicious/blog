import { beforeAll, expect, test } from 'vitest'

function resetDocument() {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {}
  } as any

  document.documentElement.innerHTML = `
      <html>
        <head>
          <meta name="theme-color">
          <meta name="msapplication-TileColor">
        </head>
        <body>
          <div id="sun"></div>
          <div id="moon"></div>
        </body>
      </html>
    `
}

beforeAll(() => {
  resetDocument()
})

test('data-theme attribute is set as quickly as possible', async () => {
  globalThis.localStorage = {
    getItem: () => 'dark', // or 'dark'/'light' to simulate saved theme
    setItem: () => {}
  } as any

  globalThis.window.matchMedia = () =>
    ({ matches: true, addEventListener: () => {} }) as any

  await import('./theme.cjs')

  // Check the data-theme attribute
  const htmlEl = document.querySelector('html')
  expect(htmlEl?.getAttribute('data-theme')).toBe('dark') // or 'light'
})

test('data-theme attribute is set based on localStorage', async () => {
  globalThis.localStorage = {
    getItem: () => 'dark',
    setItem: () => {}
  } as any

  await import('./theme.cjs')

  const htmlEl = document.querySelector('html')
  expect(htmlEl?.getAttribute('data-theme')).toBe('dark')
})

test('data-theme attribute is set based on system preference', async () => {
  globalThis.window.matchMedia = () =>
    ({ matches: true, addEventListener: () => {} }) as any

  await import('./theme.cjs')

  const htmlEl = document.querySelector('html')
  expect(htmlEl?.getAttribute('data-theme')).toBe('dark')
})

test('data-theme attribute changes on system preference change', async () => {
  let changeCallback: ({ matches }: { matches: boolean }) => void = () => {}
  globalThis.window.matchMedia = () =>
    ({
      matches: false,
      addEventListener: (
        _: any,
        callback: ({ matches }: { matches: boolean }) => void
      ) => {
        changeCallback = callback
      }
    }) as any

  await import('./theme.cjs')

  // Simulate a system preference change
  changeCallback({ matches: true })

  const htmlEl = document.querySelector('html')
  expect(htmlEl?.getAttribute('data-theme')).toBe('dark')
})

test('meta tags are updated', async () => {
  globalThis.window.matchMedia = () =>
    ({ matches: true, addEventListener: () => {} }) as any

  await import('./theme.cjs')

  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  const metaThemeColorMs = document.querySelector(
    'meta[name=msapplication-TileColor]'
  )

  expect(metaThemeColor?.getAttribute('content')).toBe('#1d2224')
  expect(metaThemeColorMs?.getAttribute('content')).toBe('#1d2224')
})

test('sun and moon hidden attributes are updated', async () => {
  globalThis.window.matchMedia = () =>
    ({ matches: true, addEventListener: () => {} }) as any

  await import('./theme.cjs')

  const sun = document.querySelector('#sun')
  const moon = document.querySelector('#moon')

  expect(sun?.hasAttribute('hidden')).toBe(false)
  expect(moon?.hasAttribute('hidden')).toBe(true)
})

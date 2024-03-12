const htmlEl = document.documentElement
const currentTheme = localStorage.getItem('@kremalicious/theme')

function getPreferTheme() {
  if (currentTheme) return currentTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getThemeColor(theme) {
  return theme === 'dark' ? '#1d2224' : '#e7eef4'
}

let themeValue = getPreferTheme()
let themeColor = getThemeColor(themeValue)

function reflectPreference() {
  const sun = document.querySelector('#sun')
  const moon = document.querySelector('#moon')
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  const metaThemeColorMs = document.querySelector(
    'meta[name=msapplication-TileColor]'
  )

  htmlEl?.setAttribute('data-theme', themeValue)
  htmlEl?.setAttribute('data-theme-color', themeColor)
  metaThemeColor?.setAttribute('content', themeColor)
  metaThemeColorMs?.setAttribute('content', themeColor)

  const themeToggle = document.querySelector('#theme-toggle')
  themeToggle?.setAttribute('checked', `${themeValue === 'dark'}`)

  if (themeValue === 'dark') {
    sun?.removeAttribute('hidden')
    moon?.setAttribute('hidden', '')
  } else {
    sun?.setAttribute('hidden', '')
    moon?.removeAttribute('hidden')
  }
}

function setPreference() {
  localStorage.setItem('@kremalicious/theme', themeValue)
  reflectPreference()
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load again so screen readers
  // can get the latest value on the button
  reflectPreference()

  const themeToggle = document.querySelector('#theme-toggle')

  themeToggle?.addEventListener('change', () => {
    console.log('themeToggle change')
    themeValue = themeValue === 'light' ? 'dark' : 'light'
    themeColor = getThemeColor(themeValue)
    setPreference()
  })

  // sync with system changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
      themeValue = isDark ? 'dark' : 'light'
      themeColor = getThemeColor(themeValue)
      setPreference()
    })
}

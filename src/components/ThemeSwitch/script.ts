import { $theme, $themeColor, type Theme, type ThemeColor } from '@stores/theme'

const themeToggle = document.querySelector('#theme-toggle')
const themeToggleInput = document.querySelector('#theme-toggle input')
const sun = document.querySelector('#sun')
const moon = document.querySelector('#moon')

const currentTheme = localStorage.getItem('theme') as Theme

function getPreferTheme(): Theme {
  if (currentTheme) return currentTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getThemeColor(theme: Theme): ThemeColor {
  return theme === 'dark' ? '#1d2224' : '#e7eef4'
}

let themeValue = getPreferTheme()
let themeColor = getThemeColor(themeValue)

function setPreference() {
  localStorage.setItem('theme', themeValue)
  $theme.set(themeValue)
  $themeColor.set(themeColor)
  reflectPreference()
}

function reflectPreference() {
  const htmlEl = document.querySelector('html')
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  const metaThemeColorMs = document.querySelector(
    'meta[name=msapplication-TileColor]'
  )

  htmlEl?.setAttribute('data-theme', themeValue)
  htmlEl?.setAttribute('data-theme-color', themeColor)
  metaThemeColor?.setAttribute('content', themeColor)
  metaThemeColorMs?.setAttribute('content', themeColor)

  themeToggle?.setAttribute('aria-label', themeValue)
  themeToggleInput?.setAttribute('checked', `${themeValue === 'dark'}`)

  if (themeValue === 'dark') {
    sun?.removeAttribute('hidden')
    moon?.setAttribute('hidden', '')
  } else {
    sun?.setAttribute('hidden', '')
    moon?.removeAttribute('hidden')
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference()

  themeToggle?.addEventListener('click', () => {
    themeValue = themeValue === 'light' ? 'dark' : 'light'
    themeColor = getThemeColor(themeValue)
    setPreference()
  })
}

// subscribe to store changes
$theme.listen((theme) => {
  themeColor = getThemeColor(theme)
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

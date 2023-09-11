import { $theme, $themeColor, getThemeColor, type Theme } from '@stores/theme'

const htmlEl = document.documentElement
const themeToggle = document.querySelector('#toggle')
const currentTheme = localStorage.getItem('theme') as Theme

function getPreferTheme(): Theme {
  if (currentTheme) return currentTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
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

  themeToggle?.setAttribute('checked', `${themeValue === 'dark'}`)

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

  themeToggle?.addEventListener('change', () => {
    themeValue = themeValue === 'light' ? 'dark' : 'light'
    themeColor = getThemeColor(themeValue)
    setPreference()
  })

  // subscribe to store changes
  // $theme.listen((theme) => {
  //   themeValue = theme
  //   themeColor = getThemeColor(theme)
  //   setPreference()
  // })

  // sync with system changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
      themeValue = isDark ? 'dark' : 'light'
      themeColor = getThemeColor(themeValue)
      setPreference()
    })
}

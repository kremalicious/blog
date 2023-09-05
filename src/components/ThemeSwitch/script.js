const themeToggle = document.querySelector('#theme-toggle')
const themeToggleInput = document.querySelector('#theme-toggle input')
const sun = document.querySelector('#sun')
const moon = document.querySelector('#moon')

const primaryColorScheme = null // "light" | "dark"
const currentTheme = localStorage.getItem('theme')

function getPreferTheme() {
  if (currentTheme) return currentTheme
  if (primaryColorScheme) return primaryColorScheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

let themeValue = getPreferTheme()
let themeColor = themeValue === 'dark' ? '#1d2224' : '#e7eef4'

function setPreference() {
  localStorage.setItem('theme', themeValue)
  reflectPreference()
}

function reflectPreference() {
  const htmlEl = document.querySelector('html')
  htmlEl.setAttribute('data-theme', themeValue)
  htmlEl.setAttribute('data-theme-color', themeColor)

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
    themeColor = themeValue === 'light' ? '#1d2224' : '#e7eef4'
    setPreference()
  })
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    themeValue = isDark ? 'dark' : 'light'
    themeColor = isDark ? '#1d2224' : '#e7eef4'
    setPreference()
  })

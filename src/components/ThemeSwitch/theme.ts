//
// Main script to handle all light/dark theme switching
//   1. based on system preference, listens for system changes
//   2. based on user action, if user switches theme via theme toggle,
//      preference is saved to sessionStorage.
//
// - Does not require the theme toggle component to be present in DOM.
// - Script is imported into the <head> of the site for earliest possible load.
//

export const sessionStorageName = '@kremalicious/theme'
const themeToggle = document.querySelector(
  '#theme-toggle'
) as HTMLElement | null

function getPreferTheme() {
  const savedTheme = sessionStorage.getItem(sessionStorageName)
  if (savedTheme) return savedTheme

  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isSystemDark ? 'dark' : 'light'
}

function getThemeColor(theme: string) {
  return theme === 'dark' ? '#1d2224' : '#e7eef4'
}

let themeValue = getPreferTheme()
let themeColor = getThemeColor(themeValue)

function reflectPreference() {
  const htmlEl = document.documentElement
  const metaThemeColor = document.querySelector('meta[name=theme-color]')

  htmlEl.setAttribute('data-theme', themeValue)
  htmlEl.setAttribute('data-theme-color', themeColor)
  metaThemeColor?.setAttribute('content', themeColor)

  // ignore the rest if we don't have the toggle
  if (!themeToggle) return

  const lightSwitch = themeToggle.querySelector('#sun') as HTMLElement
  const darkSwitch = themeToggle.querySelector('#moon') as HTMLElement
  themeToggle?.setAttribute('checked', `${themeValue === 'dark'}`)

  if (themeValue === 'dark') {
    lightSwitch.style.display = 'block'
    darkSwitch.style.display = 'none'
  } else {
    lightSwitch.style.display = 'none'
    darkSwitch.style.display = 'block'
  }
}

function setPreference() {
  sessionStorage.setItem(sessionStorageName, themeValue)
  reflectPreference()
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load again so screen readers
  // can get the latest value on the button
  reflectPreference()

  // sync with system changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
      themeValue = isDark ? 'dark' : 'light'
      themeColor = getThemeColor(themeValue)
      setPreference()
    })

  // ignore the rest if we don't have the toggle
  if (!themeToggle) return

  themeToggle?.addEventListener('change', () => {
    themeValue = themeValue === 'light' ? 'dark' : 'light'
    themeColor = getThemeColor(themeValue)
    setPreference()
  })
}

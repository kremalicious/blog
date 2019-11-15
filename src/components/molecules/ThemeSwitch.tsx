import React from 'react'
import Helmet from 'react-helmet'
import useDarkMode from 'use-dark-mode'
import styles from './ThemeSwitch.module.scss'
import Icon from '../atoms/Icon'

const ThemeToggle = () => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Icon name="Sun" />
    <span className={styles.checkboxFake} />
    <Icon name="Moon" />
  </span>
)

const ThemeToggleInput = ({
  isDark,
  toggleDark
}: {
  isDark: boolean
  toggleDark(): void
}) => (
  <input
    onChange={toggleDark}
    type="checkbox"
    name="toggle"
    value="toggle"
    aria-describedby="toggle"
    checked={isDark}
  />
)

export default function ThemeSwitch() {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  const themeColor = darkMode.value ? '#1d2224' : '#e7eef4'

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={themeColor} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Helmet>
      <aside className={styles.themeSwitch}>
        <label
          htmlFor="toggle"
          className={styles.checkbox}
          onClick={darkMode.toggle}
        >
          <span className={styles.label}>Toggle Dark Mode</span>
          <ThemeToggleInput
            isDark={darkMode.value}
            toggleDark={darkMode.toggle}
          />
          <ThemeToggle />
        </label>
      </aside>
    </>
  )
}

import React from 'react'
import useDarkMode from 'use-dark-mode'

import { ReactComponent as Day } from '../../images/day.svg'
import { ReactComponent as Night } from '../../images/night.svg'
import styles from './ThemeSwitch.module.scss'

const ThemeToggle = () => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Day />
    <span className={styles.checkboxFake} />
    <Night />
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

  return (
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
  )
}

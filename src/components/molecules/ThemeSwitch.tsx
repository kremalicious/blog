import React, { ReactElement } from 'react'
import * as styles from './ThemeSwitch.module.css'
import Icon from '../atoms/Icon'
import useDarkMode from '../../hooks/useDarkMode'

export default function ThemeSwitch(): ReactElement {
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  return (
    <div className={styles.themeSwitch} title="Toggle Dark Mode">
      <label
        htmlFor="toggle"
        className={styles.checkbox}
        onClick={() => setIsDarkMode(!isDarkMode)}
        onKeyPress={() => setIsDarkMode(!isDarkMode)}
        role="presentation"
      >
        <span className={styles.label}>Toggle Dark Mode</span>
        <input
          onChange={() => setIsDarkMode(!isDarkMode)}
          type="checkbox"
          name="toggle"
          value="toggle"
          aria-describedby="toggle"
          checked={isDarkMode}
        />
        <div aria-live="assertive">
          {isDarkMode ? <Icon name="Sun" /> : <Icon name="Moon" />}
        </div>
      </label>
    </div>
  )
}

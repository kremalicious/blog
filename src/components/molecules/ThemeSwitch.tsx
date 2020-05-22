import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import useDarkMode from 'use-dark-mode'
import styles from './ThemeSwitch.module.scss'
import Icon from '../atoms/Icon'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

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

const HeadMarkup = ({ themeColor }: { themeColor: string }) => (
  <Helmet>
    <meta name="theme-color" content={themeColor} />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
  </Helmet>
)

export default function ThemeSwitch(): ReactElement {
  const { darkModeConfig } = useSiteMetadata()
  const darkMode = useDarkMode(false, darkModeConfig)
  const themeColor = darkMode.value ? '#1d2224' : '#e7eef4'

  return (
    <>
      <HeadMarkup themeColor={themeColor} />
      <aside className={styles.themeSwitch} title="Toggle Dark Mode">
        <label
          htmlFor="toggle"
          className={styles.checkbox}
          onClick={darkMode.toggle}
          onKeyPress={darkMode.toggle}
          role="presentation"
        >
          <span className={styles.label}>Toggle Dark Mode</span>
          <ThemeToggleInput
            isDark={darkMode.value}
            toggleDark={darkMode.toggle}
          />
          <div aria-live="assertive">
            {darkMode.value ? <Icon name="Sun" /> : <Icon name="Moon" />}
          </div>
        </label>
      </aside>
    </>
  )
}

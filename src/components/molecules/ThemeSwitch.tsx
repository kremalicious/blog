import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { themeSwitch, checkbox, label } from './ThemeSwitch.module.css'
import Icon from '../atoms/Icon'
import useDarkMode from '../../hooks/useDarkMode'

const ThemeToggleInput = ({
  isDark,
  toggleDark
}: {
  isDark: boolean
  toggleDark: () => void
}) => (
  <input
    onChange={() => toggleDark()}
    type="checkbox"
    name="toggle"
    value="toggle"
    aria-describedby="toggle"
    checked={isDark}
  />
)

const HeadMarkup = ({
  bodyClass,
  themeColor
}: {
  bodyClass: string
  themeColor: string
}) => (
  <Helmet>
    <body className={bodyClass} />
    <meta name="theme-color" content={themeColor} />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
  </Helmet>
)

export default function ThemeSwitch(): ReactElement {
  const { value, toggle } = useDarkMode()
  const [themeColor, setThemeColor] = useState('')
  const [bodyClass, setBodyClass] = useState('')

  useEffect(() => {
    setBodyClass(value ? 'dark' : null)
    setThemeColor(value ? '#1d2224' : '#e7eef4')
  }, [value])

  return (
    <>
      <HeadMarkup themeColor={themeColor} bodyClass={bodyClass} />
      <aside className={themeSwitch} title="Toggle Dark Mode">
        <label
          htmlFor="toggle"
          className={checkbox}
          onClick={toggle}
          onKeyPress={toggle}
          role="presentation"
        >
          <span className={label}>Toggle Dark Mode</span>
          <ThemeToggleInput isDark={value} toggleDark={toggle} />
          <div aria-live="assertive">
            {value ? <Icon name="Sun" /> : <Icon name="Moon" />}
          </div>
        </label>
      </aside>
    </>
  )
}

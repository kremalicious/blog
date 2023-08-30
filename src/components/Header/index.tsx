import React from 'react'
import { ReactComponent as Logo } from '../../images/logo.svg'
import Menu from './Menu'
import Search from './Search'
import ThemeSwitch from './ThemeSwitch'
import styles from './index.module.css'

export default function Header(): JSX.Element {
  return (
    <header role="banner" className={styles.header}>
      <div className={styles.headerContent}>
        <a href="/" className={styles.title}>
          <Logo className={styles.logo} /> kremalicious
        </a>

        <nav aria-label="Menu" className={styles.nav}>
          <ThemeSwitch />
          <Search />
          <Menu />
        </nav>
      </div>
    </header>
  )
}

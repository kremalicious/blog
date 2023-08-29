import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as Logo } from '../../images/logo.svg'
import Menu from './Menu'
import Search from './Search'
import ThemeSwitch from '../molecules/ThemeSwitch'
import styles from './Header.module.css'

export default function Header(): JSX.Element {
  return (
    <header role="banner" className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.title}>
          <Logo className={styles.logo} /> kremalicious
        </Link>

        <nav aria-label="Menu" className={styles.nav}>
          <ThemeSwitch />
          <Search />
          <Menu />
        </nav>
      </div>
    </header>
  )
}

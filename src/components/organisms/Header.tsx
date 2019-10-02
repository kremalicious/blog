import React from 'react'
import { Link } from 'gatsby'
import Container from '../atoms/Container'
import Search from '../Search'
import Menu from '../molecules/Menu'

import styles from './Header.module.scss'

export default function Header() {
  return (
    <header role="banner" className={styles.header}>
      <Container>
        <div className={styles.header__content}>
          <h1 className={styles.title}>
            <Link className={styles.header__logo} to="/">
              kremalicious
            </Link>
          </h1>

          <nav role="navigation" className={styles.nav}>
            <Search lng="en" />
            <Menu />
          </nav>
        </div>
      </Container>
    </header>
  )
}

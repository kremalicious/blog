import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import Container from '../atoms/Container'
import Search from '../molecules/Search'
import Menu from '../molecules/Menu'
import { ReactComponent as Logo } from '../../images/logo.svg'

import styles from './Header.module.scss'

export default class Header extends PureComponent {
  render() {
    return (
      <header role="banner" className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <Link to="/">
                <Logo /> kremalicious
              </Link>
            </h1>

            <nav role="navigation" className={styles.nav}>
              <Search />
              <Menu />
            </nav>
          </div>
        </Container>
      </header>
    )
  }
}
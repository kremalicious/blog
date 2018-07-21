import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import Container from '../atoms/Container'
import Menu from '../molecules/Menu'
import Search from '../svg/MagnifyingGlass'

import styles from './Header.module.scss'

class Header extends PureComponent {
  render() {
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
              <button type="button" className={styles.search}>
                <Search />
              </button>

              <Menu />
            </nav>

            {/* <section class="site-search">
                        <div class="search-area">
                            <input type="search" id="search-input" class="form-control input-search search-field" placeholder="Search everything">
                            <button class="close search-close">&times;</button>
                        </div>
                    </section> */}

            {/* <ul class="nav-popover grid grid--half grid-medium--third">
                        <li class="grid__col">
                            <a class="nav-link" href="/{{ category | first }}/">
                                {{ category | first }}
                            </a>
                        </li>
                </ul> */}

            {/* <div id="search-popover" class="search-popover hide">
        <div class="container">
            <nav id="search-results" class="search-results"></nav>
        </div>
    </div> */}
          </div>
        </Container>
      </header>
    )
  }
}

Header.propTypes = {}

export default Header

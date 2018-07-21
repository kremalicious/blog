import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styles from './Header.module.scss'
import layout from '../Layout.module.scss'

const Header = () => {
  return (
    <header role="banner" className={styles.header}>
      <div className={layout.header__content}>
        <h1 className={styles.title}>
          <Link className={styles.header__logo} to="/">
            kremalicious
          </Link>
        </h1>

        {/* <nav role="navigation" className="nav-main grid__col">
          <button type="button" className="menu-btn">
            <div className="hamburger">
              <span />
              <span />
              <span />
            </div>
          </button>
        </nav> */}

        {/* <section class="site-search">
                    <button type="button" class="search-btn">
                        <svg class="icon icon-search" role="img" aria-labelledby="title">
                            <title id="title">Search</title>
                            <use xlink:href="/assets/img/sprite.svg#magnifying-glass"></use>
                        </svg>
                    </button>
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
    </header>
  )
}

Header.propTypes = {}

export default Header

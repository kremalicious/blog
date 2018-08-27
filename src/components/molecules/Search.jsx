import React, { PureComponent, Fragment } from 'react'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import Input from '../atoms/Input'
import SearchIcon from '../svg/MagnifyingGlass'
import styles from './Search.module.scss'

class Search extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchOpen: false
    }
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      searchOpen: !prevState.searchOpen
    }))
  }

  isSearchOpen = () => this.state.searchOpen === true

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.isSearchOpen() ? 'has-search-open' : null} />
        </Helmet>

        <button
          type="button"
          className={styles.searchButton}
          onClick={this.toggleSearch}
        >
          <SearchIcon />
        </button>

        {this.state.searchOpen && (
          <CSSTransition
            appear={this.state.searchOpen}
            in={this.state.searchOpen}
            timeout={200}
            classNames={styles}
          >
            <section className={styles.search}>
              <Input
                autoFocus
                type="search"
                placeholder="Search everything"
                onBlur={this.toggleSearch}
                // value={this.state.query}
                // onChange={this.search}
              />
              <button
                className={styles.searchInputClose}
                onClick={this.toggleSearch}
              >
                &times;
              </button>
            </section>
          </CSSTransition>
        )}
      </Fragment>
    )
  }
}

export default Search

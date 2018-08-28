import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import SearchInput from '../atoms/SearchInput'
import SearchButton from '../atoms/SearchButton'
import SearchResults from '../atoms/SearchResults'

import styles from './Search.module.scss'

class Search extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchOpen: false,
      query: '',
      results: []
    }
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      searchOpen: !prevState.searchOpen
    }))
  }

  closeSearch = () => {
    this.setState({
      searchOpen: false,
      query: '',
      results: []
    })
  }

  isSearchOpen = () => this.state.searchOpen === true

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const lunrIndex = window.__LUNR__[this.props.lng]
    const results = lunrIndex.index.search(query)
    return results.map(({ ref }) => lunrIndex.store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState({
      results,
      query
    })
  }

  render() {
    const { searchOpen, query, results } = this.state

    return (
      <Fragment>
        <Helmet>
          <body className={this.isSearchOpen() ? 'has-search-open' : null} />
        </Helmet>

        <SearchButton onClick={this.toggleSearch} />

        {searchOpen && (
          <CSSTransition
            appear={searchOpen}
            in={searchOpen}
            timeout={200}
            classNames={styles}
          >
            <section className={styles.search}>
              <SearchInput
                value={query}
                onChange={this.search}
                onToggle={this.closeSearch}
              />
            </section>
          </CSSTransition>
        )}

        {query && (
          <SearchResults results={results} onClose={this.closeSearch} />
        )}
      </Fragment>
    )
  }
}

Search.propTypes = {
  lng: PropTypes.string.isRequired
}

export default Search

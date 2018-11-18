import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import SearchResults from './SearchResults'

import styles from './Search.module.scss'

export default class Search extends PureComponent {
  state = {
    searchOpen: false,
    query: '',
    results: []
  }

  static propTypes = {
    lng: PropTypes.string.isRequired
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      searchOpen: !prevState.searchOpen
    }))
  }

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
      <>
        <SearchButton onClick={this.toggleSearch} />

        {searchOpen && (
          <>
            <Helmet>
              <body className="hasSearchOpen" />
            </Helmet>
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
                  onToggle={this.toggleSearch}
                />
              </section>
            </CSSTransition>
            <SearchResults results={results} onClose={this.toggleSearch} />
          </>
        )}
      </>
    )
  }
}

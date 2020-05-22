import React, { useState, useEffect, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import SearchResults from './SearchResults'

import styles from './index.module.scss'

export default function Search(): ReactElement {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query || !window.__LUNR__) {
      setResults([])
      return
    }

    const lunrIndex = window.__LUNR__['en']
    const searchResults = lunrIndex.index.search(query)
    setResults(
      searchResults.map(({ ref }) => {
        return lunrIndex.store[ref]
      })
    )
  }, [query])

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  return (
    <>
      <SearchButton onClick={toggleSearch} />

      {searchOpen && (
        <>
          <Helmet>
            <html className="hasSearchOpen" lang="en" />
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
                onChange={(e: any) => setQuery(e.target.value)}
                onToggle={toggleSearch}
              />
            </section>
          </CSSTransition>

          <SearchResults
            searchQuery={query}
            results={results}
            toggleSearch={toggleSearch}
          />
        </>
      )}
    </>
  )
}

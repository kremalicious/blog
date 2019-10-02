import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import SearchResults from './SearchResults'

import styles from './index.module.scss'

function getSearchResults(query: string, lng: string) {
  if (!query || !window.__LUNR__) return []
  const lunrIndex = window.__LUNR__[lng]
  const results = lunrIndex.index.search(query)
  return results.map(({ ref }: { ref: string }) => lunrIndex.store[ref])
}

export default function Search({ lng }: { lng: string }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const search = (event: any) => {
    const query = event.target.value
    // wildcard search https://lunrjs.com/guides/searching.html#wildcards
    const results = query.length > 1 ? getSearchResults(`${query}*`, lng) : []
    setQuery(query)
    setResults(results)
  }

  return (
    <>
      <SearchButton onClick={toggleSearch} />

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
                onChange={(e: Event) => search(e)}
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

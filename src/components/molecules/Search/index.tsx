import React, { useState, useEffect, ReactElement } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import SearchInput from './SearchInput'
import SearchButton from './SearchButton'
import SearchResults from './SearchResults'
import * as styles from './index.module.css'
import { getAnimationProps, moveInTop } from '../../atoms/Transitions'

export default function Search(): ReactElement {
  const shouldReduceMotion = useReducedMotion()
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

  useEffect(() => {
    if (searchOpen) {
      document.body.classList.add('hasSearchOpen')
    } else {
      document.body.classList.remove('hasSearchOpen')
    }
  }, [searchOpen])

  function toggleSearch(): void {
    setSearchOpen(!searchOpen)
  }

  return (
    <>
      <SearchButton onClick={toggleSearch} />

      {searchOpen && (
        <>
          <LazyMotion features={domAnimation}>
            <m.section
              variants={moveInTop}
              {...getAnimationProps(shouldReduceMotion)}
              className={styles.search}
            >
              <SearchInput
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
                onToggle={toggleSearch}
              />
            </m.section>
          </LazyMotion>

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

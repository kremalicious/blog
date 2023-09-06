import { type ReactElement, useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { getAnimationProps, moveInTop } from '../../Transitions'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import styles from './index.module.css'

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
              {...getAnimationProps(Boolean(shouldReduceMotion))}
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

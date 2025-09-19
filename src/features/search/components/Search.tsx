import { useStore } from '@nanostores/react'
import Fuse from 'fuse.js'
import { type ReactElement, useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import { getAllPostsForSearch } from '../api/get-all-posts'
import { isSearchOpen } from '../stores'
import type { SearchResultItem } from '../types'
import { SearchResults } from './Results/SearchResults'
import styles from './Search.module.css'

// Configure fuse.js
// https://fusejs.io/api/options.html
const fuseOptions = {
  keys: ['data.title', 'data.lead', 'slug'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5
}

export function Search(): ReactElement | null {
  const $isSearchOpen = useStore(isSearchOpen)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>()
  const [allPosts, setAllPosts] = useState<SearchResultItem[]>()

  // fetch all post data on open
  useEffect(() => {
    if (!$isSearchOpen) return

    getAllPostsForSearch().then((json) => setAllPosts(json))
  }, [$isSearchOpen])

  // Handle search and set results
  const fuse = allPosts ? new Fuse(allPosts, fuseOptions) : null

  useEffect(() => {
    if (!query || query === '' || !fuse) {
      setResults([])
      return
    }

    const results = fuse
      .search(query)
      .map((result) => result.item)
      .slice(0, 6)

    setResults(results)
  }, [query])

  // animate closing of search
  async function toggleSearch(): Promise<void> {
    isSearchOpen.set(!$isSearchOpen)
  }

  return $isSearchOpen ? (
    <>
      <form className={styles.search}>
        <Input
          className={styles.searchInput}
          type="search"
          placeholder="Search everything"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className={styles.searchInputClose}
          onClick={toggleSearch}
          title="Close search"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: the button has title already */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </form>

      <SearchResults query={query} results={results} />
    </>
  ) : null
}

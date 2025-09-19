import { useStore } from '@nanostores/react'
import { type ReactElement, useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import { Icon as X } from '@/images/components/react/X'
import { getAllPostsForSearch } from '../api/get-search-posts'
import { getFuseInstance } from '../lib/get-fuse-instance'
import { isSearchOpen } from '../stores'
import type { SearchResultItem } from '../types'
import { SearchResults } from './Results/SearchResults'
import styles from './Search.module.css'

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
  const fuse = allPosts ? getFuseInstance(allPosts) : null

  useEffect(() => {
    if (!query || query === '' || !fuse) {
      setResults([])
      return
    }

    const results = fuse.search(query).map((result) => result.item)
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
          <X />
        </button>
      </form>

      <SearchResults query={query} results={results} />
    </>
  ) : null
}

import { type ReactElement, useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import Fuse from 'fuse.js'
import { getAnimationProps, moveInTop } from '@components/Transitions'
import { useStore } from '@nanostores/react'
import { isSearchOpen } from '@stores/search'
import SearchInput from './Input'
import SearchResults from './Results'
import styles from './Search.module.css'
import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'articles' | 'links' | 'photos'>

// Configure fuse.js
// https://fusejs.io/api/options.html
const fuseOptions = {
  keys: ['data.title', 'data.lead', 'slug'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5
}

export default function Search({
  allPosts
}: {
  allPosts: Post[]
}): ReactElement {
  const shouldReduceMotion = useReducedMotion()
  const $isSearchOpen = useStore(isSearchOpen)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])

  const fuse = new Fuse(allPosts, fuseOptions)

  useEffect(() => {
    if (!query || query === '') {
      setResults([])
      return
    }

    const results = fuse
      .search(query)
      .map((result) => result.item)
      .slice(0, 6)

    setResults(results)
  }, [query])

  function toggleSearch(): void {
    isSearchOpen.set(!$isSearchOpen)
  }

  return (
    <>
      {$isSearchOpen && (
        <>
          <LazyMotion features={domAnimation}>
            <m.section
              variants={moveInTop}
              {...getAnimationProps(Boolean(shouldReduceMotion))}
              className={styles.search}
            >
              <SearchInput
                query={query}
                onChange={(e: any) => setQuery(e.target.value)}
                onToggle={toggleSearch}
              />
            </m.section>
          </LazyMotion>

          <SearchResults query={query} results={results} />
        </>
      )}
    </>
  )
}

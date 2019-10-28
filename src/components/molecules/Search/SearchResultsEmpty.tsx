import React from 'react'
import styles from './SearchResultsEmpty.module.scss'
import { Results } from './SearchResults'

const SearchResultsEmpty = ({
  searchQuery,
  results
}: {
  searchQuery: string
  results: Results[]
}) => (
  <div className={styles.empty}>
    <header className={styles.emptyMessage}>
      <p className={styles.emptyMessageText}>
        {searchQuery.length > 1 && results.length === 0
          ? 'No results found'
          : searchQuery.length === 1
          ? 'Just one more character'
          : 'Awaiting your input'}
      </p>
    </header>
  </div>
)

export default SearchResultsEmpty

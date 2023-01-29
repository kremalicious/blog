import React, { ReactElement } from 'react'
import { Results } from './SearchResults'
import * as styles from './SearchResultsEmpty.module.css'

const SearchResultsEmpty = ({
  searchQuery,
  results
}: {
  searchQuery: string
  results: Results[]
}): ReactElement => (
  <div className={styles.empty}>
    <header className={styles.emptyMessage}>
      <p className={styles.emptyMessageText}>
        {searchQuery.length > 0 && results.length === 0
          ? 'No results found'
          : 'Awaiting your input'}
      </p>
    </header>
  </div>
)

export default SearchResultsEmpty

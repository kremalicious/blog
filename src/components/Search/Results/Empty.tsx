import { type ReactElement } from 'react'
import styles from './Empty.module.css'
import type { Post } from '../Search'

const SearchResultsEmpty = ({
  query,
  results
}: {
  query: string
  results: Post[]
}): ReactElement => (
  <div className={styles.empty}>
    <header className={styles.emptyMessage}>
      <p className={styles.emptyMessageText}>
        {query.length > 0 && results.length === 0
          ? 'No results found'
          : 'Awaiting your input'}
      </p>
    </header>
  </div>
)

export default SearchResultsEmpty

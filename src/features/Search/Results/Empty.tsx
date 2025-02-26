import type { ReactElement } from 'react'
import type { Post } from '../Search'
import styles from './Empty.module.css'

const SearchResultsEmpty = ({
  query,
  results
}: {
  query: string
  results: Post[] | undefined
}): ReactElement => (
  <div className={styles.empty}>
    <header className={styles.emptyMessage}>
      <p className={styles.emptyMessageText}>
        {query.length > 0 && results?.length === 0
          ? 'No results found'
          : 'Awaiting your input fellow web wanderer'}
      </p>
    </header>
  </div>
)

export default SearchResultsEmpty

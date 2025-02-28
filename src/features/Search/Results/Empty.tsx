import type { SearchResultItem } from '@/lib/astro/getAllPostsForSearch'
import type { ReactElement } from 'react'
import styles from './Empty.module.css'

const SearchResultsEmpty = ({
  query,
  results
}: {
  query: string
  results: SearchResultItem[] | undefined
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

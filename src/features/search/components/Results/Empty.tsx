import type { ReactElement } from 'react'
import type { SearchResultItem } from '@/features/search/types'
import styles from './Empty.module.css'

export function SearchResultsEmpty({
  query,
  results
}: {
  query: string
  results: SearchResultItem[] | undefined
}): ReactElement {
  return (
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
}

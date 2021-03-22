import React, { ReactElement } from 'react'
import {
  empty,
  emptyMessage,
  emptyMessageText
} from './SearchResultsEmpty.module.css'
import { Results } from './SearchResults'

const SearchResultsEmpty = ({
  searchQuery,
  results
}: {
  searchQuery: string
  results: Results[]
}): ReactElement => (
  <div className={empty}>
    <header className={emptyMessage}>
      <p className={emptyMessageText}>
        {searchQuery.length > 0 && results.length === 0
          ? 'No results found'
          : 'Awaiting your input'}
      </p>
    </header>
  </div>
)

export default SearchResultsEmpty

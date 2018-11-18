import React from 'react'
import PropTypes from 'prop-types'
import styles from './SearchResultsEmpty.module.scss'

const SearchResultsEmpty = ({ searchQuery, results }) => (
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

SearchResultsEmpty.propTypes = {
  results: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
}

export default SearchResultsEmpty

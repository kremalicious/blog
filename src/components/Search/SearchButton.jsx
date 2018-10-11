import React from 'react'
import { ReactComponent as SearchIcon } from '../../images/magnifying-glass.svg'
import styles from './SearchButton.module.scss'

const SearchButton = props => (
  <button
    type="button"
    title="Search"
    className={styles.searchButton}
    {...props}
  >
    <SearchIcon />
  </button>
)

export default SearchButton

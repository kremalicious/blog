import React from 'react'
import SearchIcon from '../svg/MagnifyingGlass'
import styles from './SearchButton.module.scss'

const SearchButton = props => (
  <button type="button" className={styles.searchButton} {...props}>
    <SearchIcon />
  </button>
)

export default SearchButton

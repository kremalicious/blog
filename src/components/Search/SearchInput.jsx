import React from 'react'
import Input from '../atoms/Input'
import styles from './SearchInput.module.scss'

const SearchInput = ({ onToggle, ...props }) => (
  <>
    <Input
      className={styles.searchInput}
      type="search"
      placeholder="Search everything"
      autoFocus // eslint-disable-line
      {...props}
    />
    <button
      className={styles.searchInputClose}
      onClick={onToggle}
      title="Close search"
    >
      &times;
    </button>
  </>
)

export default SearchInput

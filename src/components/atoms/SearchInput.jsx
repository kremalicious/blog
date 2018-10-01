import React, { Fragment } from 'react'
import Input from './Input'
import styles from './SearchInput.module.scss'

const SearchInput = props => (
  <Fragment>
    <Input type="search" placeholder="Search everything" {...props} />
    <button className={styles.searchInputClose} onClick={props.onToggle}>
      &times;
    </button>
  </Fragment>
)

export default SearchInput

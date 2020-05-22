import React, { ReactElement } from 'react'
import styles from './SearchButton.module.scss'
import Icon from '../../atoms/Icon'

const SearchButton = (props: any): ReactElement => (
  <button
    type="button"
    title="Search"
    className={styles.searchButton}
    {...props}
  >
    <Icon name="Search" />
  </button>
)

export default SearchButton

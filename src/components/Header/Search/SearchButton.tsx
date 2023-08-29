import React, { ReactElement } from 'react'
import Icon from '../../core/Icon'
import styles from './SearchButton.module.css'

const SearchButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <button
    type="button"
    title="Search"
    className={styles.searchButton}
    onClick={onClick}
  >
    <Icon name="Search" />
  </button>
)

export default SearchButton

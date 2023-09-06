import { type ReactElement } from 'react'
import styles from './SearchButton.module.css'
import { Search } from '@images/icons'

const SearchButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <button
    type="button"
    title="Search"
    className={styles.searchButton}
    onClick={onClick}
  >
    <Search />
  </button>
)

export default SearchButton

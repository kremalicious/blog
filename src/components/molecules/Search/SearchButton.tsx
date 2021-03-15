import React, { ReactElement } from 'react'
import { searchButton } from './SearchButton.module.css'
import Icon from '../../atoms/Icon'

const SearchButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <button
    type="button"
    title="Search"
    className={searchButton}
    onClick={onClick}
  >
    <Icon name="Search" />
  </button>
)

export default SearchButton

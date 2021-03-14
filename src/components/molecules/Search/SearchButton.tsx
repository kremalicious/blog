import React, { ReactElement } from 'react'
import { searchButton } from './SearchButton.module.css'
import Icon from '../../atoms/Icon'

const SearchButton = (props: any): ReactElement => (
  <button type="button" title="Search" className={searchButton} {...props}>
    <Icon name="Search" />
  </button>
)

export default SearchButton

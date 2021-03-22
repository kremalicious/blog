import React, { ReactElement } from 'react'
import Input from '../../atoms/Input'
import Icon from '../../atoms/Icon'
import { searchInput, searchInputClose } from './SearchInput.module.css'

export default function SearchInput({
  value,
  onToggle,
  onChange
}: {
  value: string
  onToggle(): void
  onChange(e: Event): void
}): ReactElement {
  return (
    <>
      <Input
        className={searchInput}
        type="search"
        placeholder="Search everything"
        autoFocus // eslint-disable-line
        value={value}
        onChange={onChange}
      />
      <button
        className={searchInputClose}
        onClick={onToggle}
        title="Close search"
      >
        <Icon name="X" />
      </button>
    </>
  )
}

import React, { ReactElement } from 'react'
import Input from '../../atoms/Input'
import Icon from '../../atoms/Icon'
import styles from './SearchInput.module.scss'

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
        className={styles.searchInput}
        type="search"
        placeholder="Search everything"
        autoFocus // eslint-disable-line
        value={value}
        onChange={onChange}
      />
      <button
        className={styles.searchInputClose}
        onClick={onToggle}
        title="Close search"
      >
        <Icon name="X" />
      </button>
    </>
  )
}

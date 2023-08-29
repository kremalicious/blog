import React, { ChangeEvent, ReactElement } from 'react'
import Icon from '../../core/Icon'
import Input from '../../core/Input'
import styles from './SearchInput.module.css'

export default function SearchInput({
  value,
  onToggle,
  onChange
}: {
  value: string
  onToggle(): void
  onChange(e: ChangeEvent<HTMLInputElement>): void
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

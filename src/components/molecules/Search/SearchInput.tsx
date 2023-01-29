import React, { ChangeEvent, ReactElement } from 'react'
import Icon from '../../atoms/Icon'
import Input from '../../atoms/Input'
import * as styles from './SearchInput.module.css'

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

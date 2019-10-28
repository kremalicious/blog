import React from 'react'
import Input from '../../atoms/Input'
import styles from './SearchInput.module.scss'

export default function SearchInput({
  value,
  onToggle,
  onChange
}: {
  value: string
  onToggle(): void
  onChange(e: Event): void
}) {
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
        &times;
      </button>
    </>
  )
}

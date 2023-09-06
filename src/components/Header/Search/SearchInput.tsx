import type { ChangeEvent, ReactElement } from 'react'
import Input from '@components/Input'
import styles from './SearchInput.module.css'
import { X } from '@images/icons'

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
        <X />
      </button>
    </>
  )
}

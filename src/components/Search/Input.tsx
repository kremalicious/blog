import type { ChangeEvent, ReactElement } from 'react'
import Input from '@components/Input'
import styles from './Input.module.css'

export default function SearchInput({
  query,
  onToggle,
  onChange
}: {
  query: string
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
        value={query}
        onChange={onChange}
      />
      <button
        className={styles.searchInputClose}
        onClick={onToggle}
        title="Close search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </>
  )
}

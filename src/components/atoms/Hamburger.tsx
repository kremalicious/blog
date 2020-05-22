import React, { ReactElement } from 'react'
import styles from './Hamburger.module.scss'

export default function Hamburger({
  onClick
}: {
  onClick(): void
}): ReactElement {
  return (
    <button
      type="button"
      title="Menu"
      className={styles.hamburgerButton}
      onClick={onClick}
    >
      <span className={styles.hamburger}>
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </span>
    </button>
  )
}

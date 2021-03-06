import React, { ReactElement } from 'react'
import * as styles from './Hamburger.module.css'

export default function Hamburger({
  onClick
}: {
  onClick(): void
}): ReactElement {
  return (
    <button
      type="button"
      title="Menu"
      className={styles.button}
      onClick={onClick}
    >
      <span className={styles.hamburger}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </span>
    </button>
  )
}

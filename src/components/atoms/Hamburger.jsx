import React from 'react'
import styles from './Hamburger.module.scss'

const Hamburger = props => (
  <button type="button" className={styles.hamburgerButton} {...props}>
    <span className={styles.hamburger}>
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
    </span>
  </button>
)

export default Hamburger

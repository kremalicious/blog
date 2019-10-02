import React, { ReactElement } from 'react'
import styles from './Container.module.scss'

export default function Container({
  children
}: {
  children: any
}): ReactElement {
  return <section className={styles.container}>{children}</section>
}

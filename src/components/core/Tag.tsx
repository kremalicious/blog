import React, { ReactElement } from 'react'
import styles from './Tag.module.css'

export default function Tag({
  name,
  url,
  count,
  style
}: {
  name: string
  url: string
  count?: number
  style?: any
}): ReactElement {
  return (
    <a className={styles.tag} href={url} style={style}>
      {name}
      {count && <span className={styles.count}>{count}</span>}
    </a>
  )
}

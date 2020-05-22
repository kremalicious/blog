import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import styles from './Tag.module.scss'

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
    <Link className={styles.tag} to={url} style={style}>
      {name}
      {count && <span className={styles.count}>{count}</span>}
    </Link>
  )
}

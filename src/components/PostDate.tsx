import React, { ReactElement } from 'react'
import Time from './core/Time'
import styles from './PostDate.module.css'

export default function PostDate({
  date,
  updated
}: {
  date: string
  updated?: string
}): ReactElement {
  return (
    <div className={styles.time}>
      <Time date={date} />
      {updated && ' • updated '}
      {updated && <Time date={updated} />}
    </div>
  )
}

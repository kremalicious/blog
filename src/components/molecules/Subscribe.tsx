import React from 'react'
import IconLinks from './IconLinks'
import styles from './Subscribe.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

export default function Subscribe() {
  const { rss, jsonfeed } = useSiteMetadata()
  const links = [rss, jsonfeed]

  return (
    <aside className={styles.subscribe}>
      <h1 className={styles.title}>Subscribe</h1>
      <IconLinks links={links} />
    </aside>
  )
}

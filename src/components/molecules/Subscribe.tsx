import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import IconLinks from './IconLinks'
import styles from './Subscribe.module.scss'

const query = graphql`
  query {
    site {
      siteMetadata {
        rss
        jsonfeed
      }
    }
  }
`

export default function Subscribe() {
  const data = useStaticQuery(query)
  const { rss, jsonfeed } = data.site.siteMetadata
  const links = [rss, jsonfeed]

  return (
    <aside className={styles.subscribe}>
      <h1 className={styles.title}>Subscribe</h1>
      <IconLinks links={links} />
    </aside>
  )
}

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import IconLinks from './IconLinks'
import styles from './Subscribe.module.scss'

const Subscribe = () => (
  <StaticQuery
    query={graphql`
      query {
        contentYaml {
          author {
            rss
            jsonfeed
          }
        }
      }
    `}
    render={data => {
      const { rss, jsonfeed } = data.contentYaml.author

      const links = [rss, jsonfeed]

      return (
        <aside className={styles.subscribe}>
          <h1 className={styles.title}>Subscribe</h1>
          <IconLinks links={links} />
        </aside>
      )
    }}
  />
)

export default Subscribe

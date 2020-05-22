import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import Page from '../components/templates/Page'
import styles from './404.module.scss'

const page = {
  frontmatter: {
    title: '404 - Not Found'
  }
}

const NotFound = ({ location }: { location: Location }): ReactElement => (
  <Page title={page.frontmatter.title} post={page} location={location}>
    <div className={styles.hal9000} />

    <div className={styles.wrapper}>
      {/* eslint-disable-next-line quotes */}
      <h1 className={styles.title}>{"I'm sorry Dave"}</h1>{' '}
      {/* eslint-disable-next-line quotes */}
      <p className={styles.text}>{"I'm afraid I can't do that"}</p>
      <Link to={'/'}>Back to homepage</Link>
    </div>
  </Page>
)

export default NotFound

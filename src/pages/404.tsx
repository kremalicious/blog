import React, { ReactElement } from 'react'
import { Link, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import styles from './404.module.css'

const page = {
  frontmatter: {
    title: '404 - Not Found'
  }
}

const NotFound = (props: PageProps): ReactElement => (
  <Page
    title={page.frontmatter.title}
    post={page}
    pathname={props.location.pathname}
  >
    <div className={styles.hal9000} />

    <div className={styles.wrapper}>
      <h1 className={styles.title}>{"I'm sorry Dave"}</h1>{' '}
      <p className={styles.text}>{"I'm afraid I can't do that"}</p>
      <Link to={'/'}>Back to homepage</Link>
    </div>
  </Page>
)

export default NotFound

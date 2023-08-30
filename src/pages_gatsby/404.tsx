import React, { ReactElement } from 'react'
import HeadMeta, { HeadMetaProps } from '../components/core/HeadMeta'
import Page from '../../components/layouts/Page'
import styles from './404.module.css'

const meta: Partial<HeadMetaProps> = {
  title: `I'm sorry Dave`,
  description: `I'm afraid I can't do that`
}

const NotFound = (): ReactElement => (
  <Page title={meta.title}>
    <div className={styles.hal9000} />

    <div className={styles.wrapper}>
      <h1 className={styles.title}>{meta.title}</h1>{' '}
      <p className={styles.text}>{meta.description}</p>
      <a href={'/'}>Back to homepage</a>
    </div>
  </Page>
)

export default NotFound

export function Head(props: PageProps) {
  return <HeadMeta {...meta} slug={props.location.pathname} />
}

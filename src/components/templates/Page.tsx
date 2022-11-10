import React, { ReactElement, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import SEO, { SeoPost } from '../atoms/SEO'
import * as styles from './Page.module.css'

export default function Page({
  title,
  section,
  children,
  pathname,
  post
}: {
  title: string
  children: ReactNode
  pathname: string
  section?: string
  post?: SeoPost
}): ReactElement {
  return (
    <>
      <Helmet title={title} />
      <SEO slug={pathname} post={post} />

      <h1 className={styles.pagetitle}>{title}</h1>
      {section ? <section className={section}>{children}</section> : children}
    </>
  )
}

import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { Post } from '../../@types/Post'
import SEO from '../atoms/SEO'
import styles from './Page.module.scss'

export default function Page({
  title,
  section,
  children,
  post
}: {
  title: string
  children: any
  section?: string
  post?: Post
}): ReactElement {
  const { pathname } = useLocation()

  return (
    <>
      <Helmet title={title} />
      <SEO slug={pathname} postSEO post={post} />

      <h1 className={styles.pageTitle}>{title}</h1>
      {section ? <section className={section}>{children}</section> : children}
    </>
  )
}

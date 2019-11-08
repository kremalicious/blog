import React from 'react'
import { Helmet } from 'react-helmet'
import SEO from '../components/atoms/SEO'
import Layout from '../components/Layout'
import styles from './Page.module.scss'
import { Post } from '../@types/Post'

export default function Page({
  title,
  location,
  section,
  children,
  post
}: {
  title: string
  children: any
  section?: string
  location: Location
  post?: Post
}) {
  return (
    <>
      <Helmet title={title} />
      <SEO slug={location.pathname} postSEO post={post} />

      <Layout location={location}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {section ? <section className={section}>{children}</section> : children}
      </Layout>
    </>
  )
}

import React, { ReactElement } from 'react'
import styles from './Title.module.scss'
import Icon from '../../atoms/Icon'
import PostDate from '../../molecules/PostDate'

export default function PostTitle({
  slug,
  linkurl,
  title,
  date,
  updated,
  className
}: {
  slug?: string
  linkurl?: string
  title: string
  date?: string
  updated?: string
  className?: string
}): ReactElement {
  const linkHostname = linkurl ? new URL(linkurl).hostname : null

  return linkurl ? (
    <>
      <h1
        className={`${styles.hentry__title} ${styles.hentry__title__link} ${
          className && className
        }`}
      >
        <a href={linkurl} title={`Go to source: ${linkurl}`}>
          {title} <Icon name="ExternalLink" />
        </a>
      </h1>
      <div className={styles.linkurl}>{linkHostname}</div>
    </>
  ) : slug ? (
    <h1 className={`${styles.hentry__title} ${className && className}`}>
      {title}
    </h1>
  ) : (
    <>
      <h1 className={`${styles.hentry__title} ${className && className}`}>
        {title}
      </h1>
      {date && <PostDate date={date} updated={updated} />}
    </>
  )
}
